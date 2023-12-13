mod character;
// mod webp;
use firestore::{struct_path::paths, *};
use image::EncodableLayout;
use regex::Regex;
use scraper::{Html, Selector};
use std::env::args;
use std::fs;
use std::fs::File;
use std::io::Write;
use webp::{Encoder, WebPMemory};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    let target = args().nth(1).expect("missing target: [dev, prod]");
    let save_imgs = if args().len() == 2 {
        args().nth(2).expect("missing save_imgs: [true, false]")
    } else {
        "false".to_owned()
    };
    if target != "dev" && target != "prod" {
        panic!("target must be either dev or prod");
    }
    let db = if target == "dev" {
        FirestoreDb::new("starrailteamtrackerdev").await?
    } else {
        FirestoreDb::new("starrailteamtracker").await?
    };
    const COLLECTION_NAME: &'static str = "Characters";

    let response = get_html("https://game8.co/games/Honkai-Star-Rail/archives/404256");
    let tbodies = get_tag(&response.await.as_ref().unwrap(), "tbody");
    let tbody_fragment = Html::parse_fragment(&tbodies[1]);
    let a_selector = Selector::parse("a").unwrap();

    fs::create_dir_all("assets").unwrap();

    // Saves Characters to Firestore
    for (count, element) in tbody_fragment.select(&a_selector).enumerate() {
        if count % 4 == 0 {
            let text: Vec<&str> = element.text().collect();
            let name = text[0].trim();
            println!("{}", name);
            let character_data = get_html(&element.value().attr("href").unwrap());
            let table = get_tag(
                &character_data.await.as_ref().unwrap(),
                "div.a-tabContainer",
            );
            let links = get_tag(&table.concat(), "a");
            let main_stats_html = get_tag(&table.concat(), "td");
            let light_cone = get_text(&links[0], "a").trim().to_owned();

            let mut relics: Vec<String> = Vec::new();
            let mut ornaments: Vec<String> = Vec::new();

            if links.len() == 8 {
                relics.push(get_text(&links[1], "a").trim().to_owned());
                ornaments.push(get_text(&links[2], "a").trim().to_owned());
            } else {
                relics.push(get_text(&links[1], "a").trim().to_owned());
                relics.push(get_text(&links[2], "a").trim().to_owned());
                ornaments.push(get_text(&links[2], "a").trim().to_owned());
            }
            let regex = Regex::new(r#"(<b class=\"a-bold\">)[A-Za-z]*(</b>):*"#).unwrap();
            let preped_main_stats_html = regex.replace_all(&main_stats_html[3], " ");
            let ruf_stats = get_text(&preped_main_stats_html, "html");
            let final_stats: Vec<&str> = ruf_stats.trim().split("  ").collect();
            let delims = Regex::new(r"/| or ").unwrap();
            let body_main_stat: Vec<String> =
                delims.split(final_stats[0]).map(str::to_string).collect();
            let body_main_stat: Vec<character::Checked> = add_stats(&body_main_stat);
            let feet_main_stat: Vec<String> =
                delims.split(final_stats[1]).map(str::to_string).collect();
            let feet_main_stat: Vec<character::Checked> = add_stats(&feet_main_stat);
            let sphere_main_stat: Vec<String> =
                delims.split(final_stats[2]).map(str::to_string).collect();
            let sphere_main_stat: Vec<character::Checked> = add_stats(&sphere_main_stat);
            let rope_main_stat: Vec<String> =
                delims.split(final_stats[3]).map(str::to_string).collect();
            let rope_main_stat: Vec<character::Checked> = add_stats(&rope_main_stat);
            let character = character::Character {
                Name: name.to_owned(),
                LightCone: character::LightCone {
                    data: light_cone,
                    checked: false,
                },
                Relics: character::Relics {
                    Set: relics,
                    Body: body_main_stat,
                    Feet: feet_main_stat,
                },
                Ornament: character::Ornament {
                    Set: ornaments,
                    Sphere: sphere_main_stat,
                    Rope: rope_main_stat,
                },
            };
            let _update_builder: character::Character = db
                .fluent()
                .update()
                .fields(paths!(character::Character::{Name, LightCone, Relics, Ornament}))
                .in_col(COLLECTION_NAME)
                .document_id(&character.Name)
                .object(&character)
                .execute()
                .await?;
            //Saves Images to assets folder
            let character_img_link_html = Html::parse_fragment(&element.inner_html());
            let img_selector = Selector::parse("img").unwrap();
            let character_img_link = character_img_link_html
                .select(&img_selector)
                .next()
                .unwrap()
                .value()
                .attr("data-src")
                .unwrap();
            if save_imgs == "true" {
                let img_response = reqwest::get(character_img_link).await?;
                let img_bytes = img_response.bytes().await?;
                let dynamic_image = image::load_from_memory(&img_bytes).unwrap();
                let img_name = format!("assets/{}.webp", name);
                let encoder: Encoder = Encoder::from_image(&dynamic_image).unwrap();
                let encoded_webp: WebPMemory = encoder.encode(65f32);
                let mut webp_image = File::create(img_name).unwrap();
                webp_image.write_all(encoded_webp.as_bytes()).unwrap();
            }
        }
    }
    Ok(())
}
fn add_stats(main_stats: &Vec<String>) -> Vec<character::Checked> {
    let mut result: Vec<character::Checked> = Vec::new();
    for stat in main_stats {
        result.push(character::Checked {
            checked: false,
            data: stat.to_owned(),
        });
    }
    result
}
fn get_text(text: &str, tag: &str) -> String {
    let light_cone_html = Html::parse_fragment(text);
    let selector = Selector::parse(tag).unwrap();
    let result = light_cone_html.select(&selector).next().unwrap();
    result.text().collect()
}
fn get_tag(text: &str, tag: &str) -> Vec<String> {
    let html = Html::parse_document(&text);
    let tag_selector = Selector::parse(tag).unwrap();
    let mut result: Vec<String> = vec![];
    for element in html.select(&tag_selector) {
        result.push(element.html());
    }
    result
}
async fn get_html(url: &str) -> Result<String, reqwest::Error> {
    let res = reqwest::get(url).await?.text().await?;
    Ok(res)
}

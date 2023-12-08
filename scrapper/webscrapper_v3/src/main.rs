use firestore::{struct_path::paths, *};
use regex::Regex;
use scraper::{Html, Selector};
use serde::{Deserialize, Serialize};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    let db = FirestoreDb::new("starrailteamtrackerdev").await?;
    const COLLECTION_NAME: &'static str = "test";

    let response = get_html("https://game8.co/games/Honkai-Star-Rail/archives/404256");
    let tbodies = get_tag(&response.await.as_ref().unwrap(), "tbody");

    let tbody_fragment = Html::parse_fragment(&tbodies[1]);
    let a_selector = Selector::parse("a").unwrap();

    println!("Writing to {:?}...", COLLECTION_NAME);
    for (count, element) in tbody_fragment.select(&a_selector).enumerate() {
        if count % 4 == 0 {
            let text: Vec<&str> = element.text().collect();
            let name = text[0].trim();
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
            let feet_main_stat: Vec<String> =
                delims.split(final_stats[1]).map(str::to_string).collect();
            let sphere_main_stat: Vec<String> =
                delims.split(final_stats[2]).map(str::to_string).collect();
            let rope_main_stat: Vec<String> =
                delims.split(final_stats[3]).map(str::to_string).collect();
            let character = Character {
                Name: name.to_owned(),
                LightCone: LightCone {
                    Data: light_cone,
                    Checked: false,
                },
                Relics: Relics {
                    Set: relics,
                    Body: body_main_stat,
                    Feet: feet_main_stat,
                },
                Ornament: Ornament {
                    Set: ornaments,
                    Sphere: sphere_main_stat,
                    Rope: rope_main_stat,
                },
            };
            let _update_builder: Character = db
                .fluent()
                .update()
                .fields(paths!(Character::{Name, LightCone, Relics, Ornament}))
                .in_col(COLLECTION_NAME)
                .document_id(&character.Name)
                .object(&character)
                .execute()
                .await?;
        }
    }
    Ok(())
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

#[derive(Debug, Clone, Deserialize, Serialize)]
struct Character {
    Name: String,
    LightCone: LightCone,
    Relics: Relics,
    Ornament: Ornament,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
struct LightCone {
    Data: String,
    Checked: bool,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
struct Relics {
    Set: Vec<String>,
    Body: Vec<String>,
    Feet: Vec<String>,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
struct Ornament {
    Set: Vec<String>,
    Sphere: Vec<String>,
    Rope: Vec<String>,
}

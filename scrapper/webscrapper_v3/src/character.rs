#![allow(non_snake_case)]

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Character {
    pub Name: String,
    pub LightCone: LightCone,
    pub Relics: Relics,
    pub Ornament: Ornament,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct LightCone {
    pub data: String,
    pub checked: bool,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Relics {
    pub Set: Vec<String>,
    pub Body: Vec<Checked>,
    pub Feet: Vec<Checked>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Ornament {
    pub Set: Vec<String>,
    pub Sphere: Vec<Checked>,
    pub Rope: Vec<Checked>,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Checked {
    pub checked: bool,
    pub data: String,
}

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
    pub Data: String,
    pub Checked: bool,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Relics {
    pub Set: Vec<String>,
    pub Body: Vec<String>,
    pub Feet: Vec<String>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Ornament {
    pub Set: Vec<String>,
    pub Sphere: Vec<String>,
    pub Rope: Vec<String>,
}

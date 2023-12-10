
export interface characterType{
    Name: string,
    Relics: relics,
    Ornament: ornament,
    LightCone: checkData
  }

  export interface relics {
    Set: string[],
    Body: checkData[],
    Feet: checkData[],
  }

  export interface ornament {
    Set: string[],
    Sphere: checkData[],
    Rope: checkData[]
  }

  export interface checkData{
    data: string,
    checked: boolean
  }
  

export interface dataType{
    CharacterName: string,
    EquipmentType: string,
    ArtifactName: string
  }
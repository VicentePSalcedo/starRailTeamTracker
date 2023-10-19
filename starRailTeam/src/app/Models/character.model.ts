
export interface characterType{
    Name: string,
    Relics: relics,
    Ornament: ornament,
    LightCone: checkData
  }

  interface relics {
    Set: string[],
    Body: checkData[],
    Feet: checkData[],
  }

  interface ornament {
    Set: string[],
    Sphere: checkData[],
    Rope: checkData[]
  }

  interface checkData{
    data: string,
    checked: boolean
  }
  

export interface dataType{
    CharacterName: string,
    EquipmentType: string,
    ArtifactName: string
  }
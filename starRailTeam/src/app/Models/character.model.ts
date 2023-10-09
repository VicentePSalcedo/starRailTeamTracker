
export interface characterType{
    Name: string,
    Relics: relics,
    Ornament: ornament,
    LightCone: string
  }

  interface relics {
    Set: string[],
    Body: string[],
    Feet: string[],
  }

  interface ornament {
    Set: string[],
    Sphere: string[],
    Rope: string[]
  }
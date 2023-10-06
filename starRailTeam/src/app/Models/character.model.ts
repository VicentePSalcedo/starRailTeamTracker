
export interface characterType{
    Name: string,
    Relics: relics,
    Ornament: ornament,
    LightCone: string
  }

  interface relics {
    Set: string[],
    BodyMainStat: string[],
    FeetMainStat: string[],
  }

  interface ornament {
    Set: string,
    SphereMainStat: string[],
    RopeMainStat: string[]
  }
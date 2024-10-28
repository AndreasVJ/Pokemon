export interface Pokemon {
    id: number
    name: string
    height: number
    weight: number
    sprites: {
        front_default: string
        other: {
            "official-artwork": {
                front_default: string
            }
        }
    }
    types: {
        slot: number
        type: {
          name: string
        }
    }[]
    stats: {
        base_stat: number
        effort: number
        stat: {
            name: "hp" | "attack" | "defense" | "special-attack" | "special-defense" | "speed"
            url: string
        }
    }[]
    moves: {
        move: {
            name: string
            url: string
        }
        version_group_details: {
            level_learned_at: number
        }[]
    }[]
}


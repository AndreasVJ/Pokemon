export interface Move {
    name: string
    url: string
}


export interface DetailedMove {
    effect_entries: {
        language: {
            name: string
        }
        short_effect: string
    }[]
    power: string
}


export interface MoveCardInfo {
    name: string
    power: string
    description: string
}


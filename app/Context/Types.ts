import { Dispatch, SetStateAction } from "react";
import type { Pokemon } from "../Types/pokemon";

export interface Application {
    pokemons: Pokemon[],
    setPokemons: Dispatch<SetStateAction<Pokemon[]>>
    activeIndex: number,
    setActiveIndex: Dispatch<SetStateAction<number>>
}

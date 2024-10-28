import { POKEMON_PAGE_SIZE } from "../constants"
import type { Pokemon } from "../Types/pokemon"

export async function readPokemonPage(page: number) : Promise<Pokemon[]> {
    const offset = page * POKEMON_PAGE_SIZE

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_PAGE_SIZE}&offset=${offset}`)
    if (!response.ok) {
        throw new Error('Failed to fetch Pokémon data')
    }
    const data = await response.json()

    const pokemons = await Promise.all(
        data.results.map(async (pokemon: { url: string }) => {
          const res = await fetch(pokemon.url)
          return res.json()
        })
    )

    return pokemons
}

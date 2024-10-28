import styles from "./PokemonCard.module.scss"
import { useApplicationContext } from "@/app/Context/ApplicationContext"
import { useState, useEffect } from "react"
import { readMove } from "@/app/actions/readMove"
import type { Pokemon } from "@/app/Types/pokemon"


interface Move {
    name: string
    power: number | null
    description: string
}


export default function PokemonCard() {
    const application = useApplicationContext()
    const [pokemon, setPokemon] = useState<Pokemon | null>(null)
    const [moves, setMoves] = useState<Move[]>([])

    useEffect(() => {
        setPokemon(application.pokemons[application.activeIndex])
        console.log(application.pokemons[application.activeIndex])
    }, [application.activeIndex])

    useEffect(() => {
        if (!pokemon) return

        const defaultMoves = pokemon.moves
        .filter(moveEntry =>
            moveEntry.version_group_details.some(
                detail => detail.level_learned_at === 0
            )
        )
        .slice(0, 4)

        console.log(defaultMoves)

        async function fetchMovesWithPower() {
            const movesWithPower = await Promise.all(
                defaultMoves.map(async move => {
                    const detailedMove = await readMove(move.move.url)

                    const effectEntry = detailedMove.effect_entries.find(
                        (entry: any) => entry.language.name === "en"
                    )
                    return {
                        name: move.move.name,
                        power: detailedMove.power,
                        description: effectEntry ? effectEntry.short_effect : ""
                    }
                }),
            )
            setMoves(movesWithPower)
        }

        fetchMovesWithPower()

    }, [pokemon])


    if (!pokemon) {
        return <p>No active Pokémon</p>
    }

    return (
        <div className={styles.carContainer}>
            <p>{pokemon.name}</p>
            <p>{pokemon.stats.find(stat => stat.stat.name === "hp")?.base_stat}</p>
            <p>{pokemon.stats.find(stat => stat.stat.name === "attack")?.base_stat}</p>
            <p>{pokemon.stats.find(stat => stat.stat.name === "defense")?.base_stat}</p>
            <p>{pokemon.stats.find(stat => stat.stat.name === "speed")?.base_stat}</p>
            <p>{pokemon.stats.find(stat => stat.stat.name === "special-attack")?.base_stat}</p>
            <img 
                src={pokemon.sprites.other["official-artwork"].front_default} 
                alt="pokemon"
            />
            <ul>
                {moves.map(move => (
                    <li key={move.name}>{move.name} {move.power} {move.description}</li>
                ))}
            </ul>
        </div>
    )
}

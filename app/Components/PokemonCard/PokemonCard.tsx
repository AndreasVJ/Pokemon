import styles from "./PokemonCard.module.scss"
import { useApplicationContext } from "@/app/Context/ApplicationContext"
import { useState, useEffect } from "react"
import { getMoveCardInfo } from "@/app/actions/readMove"
import type { Pokemon } from "@/app/Types/pokemon"
import type { MoveCardInfo } from "@/app/Types/move"


export default function PokemonCard() {
    const application = useApplicationContext()
    const [pokemon, setPokemon] = useState<Pokemon | null>(null)
    const [moves, setMoves] = useState<MoveCardInfo[]>([])

    // Change the pokemon displayed when activeIndex changes
    useEffect(() => {
        setPokemon(application.pokemons[application.activeIndex])
    }, [application.activeIndex])

    useEffect(() => {
        if (!pokemon) return

        // Get the first four moves learned at level 0 
        const defaultMoves = pokemon.moves.filter(moveEntry =>
            moveEntry.version_group_details.some(
                detail => detail.level_learned_at === 0
            )
        )
        .slice(0, 4)
 
        // Extract more detailed information about the moves
        getMoveCardInfo(defaultMoves.map(move => move.move)).then(moveCardInfo => {
            setMoves(moveCardInfo)
        })

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

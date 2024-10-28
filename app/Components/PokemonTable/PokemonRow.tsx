import styles from "./PokemonRow.module.scss" 
import { memo, useEffect, useRef } from "react"
import { useApplicationContext } from "@/app/Context/ApplicationContext"
import type { Pokemon } from "@/app/Types/pokemon"

interface PokemonRowProps {
    pokemon: Pokemon,
    index: number
}

function PokemonRow({ pokemon, index }: PokemonRowProps) {
    const application = useApplicationContext()
    const rowRef = useRef<HTMLTableRowElement | null>(null)

    useEffect(() => {
        if (application.activeIndex === index && rowRef.current) {
            rowRef.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            })
        }
    }, [application.activeIndex])

    return (
        <tr 
            ref={rowRef}
            className={`${styles.pokemonRow} ${index === application.activeIndex ? styles.active : ""}`} 
            key={pokemon.id} 
            data-index={index}
        >
            <td>{pokemon.id}</td>
            <td>{pokemon.name}</td>
            <td className={application.enablePicture ? "" : styles.hide}>
                <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    style={{ width: '50px', height: '50px' }}
                />
            </td>
            <td className={application.enableHeight ? "" : styles.hide}>{pokemon.height}</td>
            <td className={application.enableWeight ? "" : styles.hide}>{pokemon.weight}</td>
            <td className={application.enableTypes ? "" : styles.hide}>{pokemon.types.map(type => type.type.name).join(', ')}</td>
        </tr>       
    )
}

export default memo(PokemonRow, (prevProps, nextProps) => {
    return (
        prevProps.pokemon === nextProps.pokemon &&
        prevProps.index === nextProps.index
    )
})

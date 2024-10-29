'use client'
import styles from "./PokemonTable.module.scss"
import { useState, useEffect } from 'react'
import { useApplicationContext } from "@/app/Context/ApplicationContext"
import PokemonRow from "./PokemonRow"
import { readPokemonPage } from "@/app/actions/readPokemonPage"
import { POKEMON_PAGE_SIZE } from "@/app/constants"


export default function PokemonTable() {
    const application = useApplicationContext()

    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)


    async function fetchPokemons() {
        if (loading) return // Prevent multiple requests at the same time 
        setLoading(true) 
    
        try {
            const pokemons = await readPokemonPage(page)

            application.setPokemons(prev => [...prev, ...pokemons]) 

            // Set activeIndex to 0 when first page loads
            if (page === 0) {
                application.setActiveIndex(0)
            }

            // Check if there are more pokemons to fetch
            if (pokemons.length < POKEMON_PAGE_SIZE) {
                setHasMore(false)
            }
        } 
        catch (error) {
            console.error(error)
        }
        finally {
            setLoading(false)
        }
    }

    // Detect when user scrolls to the bottom of the pokémon table
    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    
        // Check if the user is within 500px of the bottom
        if (scrollHeight - scrollTop <= clientHeight + 500 && !loading && hasMore) {
            setPage(prev => prev + 1);
        }
    }


    // Detect when user click on a row
    const handleRowClick = (event: React.MouseEvent<HTMLTableSectionElement>) => {
        const target = event.target as HTMLElement
        const row = target.closest('tr')

        if (row && row.dataset.index) {
            const index = parseInt(row.dataset.index, 10)
            application.setActiveIndex(index)
        }
    }  

    // Fetch pokémon when page number changes
    useEffect(() => {
        fetchPokemons()
    }, [page]) 


    return (
        <div 
            className={styles.pokemonTableContainer} 
            onScroll={handleScroll} 
        >
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th className={application.enablePicture ? "" : styles.hide}>Picture</th>
                        <th className={application.enableHeight ? "" : styles.hide}>Height</th>
                        <th className={application.enableWeight ? "" : styles.hide}>Weight</th>
                        <th className={application.enableTypes ? "" : styles.hide}>Types</th>
                    </tr>
                </thead>
                <tbody onClick={handleRowClick}>
                    {application.pokemons.map((pokemon, index) => (
                        <PokemonRow key={pokemon.id} pokemon={pokemon} index={index} /> 
                    ))}
                </tbody>
            </table>
            {loading && <p>Loading more Pokémon...</p>}
            {!hasMore && <p>No more Pokémon to load.</p>}
        </div>
    )
}

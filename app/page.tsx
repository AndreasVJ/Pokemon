"use client"
import styles from "./page.module.scss"
import { useState, useRef, useEffect } from "react"
import { ApplicationContext } from "./Context/ApplicationContext"
import PokemonCard from "./Components/PokemonCard/PokemonCard"
import PokemonTable from './Components/PokemonTable/PokemonTable'
import type { Pokemon } from "./Types/pokemon"


export default function Home() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [activeIndex, setActiveIndex] = useState<number>(-1)

    const activeIndexRef = useRef(activeIndex)
    const pokemonsLengthRef = useRef(pokemons.length)

    const application = {
        pokemons,
        setPokemons,
        activeIndex,
        setActiveIndex
    }

    const handleWindowKeyDown = (event: KeyboardEvent) => {
        event.preventDefault()
        const prevRowKeys = ["ArrowUp", "ArrowLeft", "w", "a"]
        const nextRowKeys = ["ArrowDown", "ArrowRight", "s", "d"]

        if (prevRowKeys.includes(event.key)) {
            if (activeIndexRef.current > 0) {
                application.setActiveIndex(index => index - 1)
            }
        } else if (nextRowKeys.includes(event.key)) {
            if (activeIndexRef.current < pokemonsLengthRef.current - 1) {
                application.setActiveIndex(index => index + 1)
            }
        } 
    }


    // Update references on state changes
    useEffect(() => {
        activeIndexRef.current = application.activeIndex
        pokemonsLengthRef.current = application.pokemons.length
    }, [application.activeIndex, application.pokemons.length]) 


    useEffect(() => {
        window.addEventListener("keydown", handleWindowKeyDown)

        return () => {
            window.removeEventListener('keydown', handleWindowKeyDown)
        }
    }, [])

    return (
        <ApplicationContext.Provider value={application}>
            <div className={styles.homePageWrapper}>
                <PokemonCard />
                <PokemonTable />
            </div>
        </ApplicationContext.Provider>
    )
}

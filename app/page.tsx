"use client"
import styles from "./page.module.scss"
import { useState, useRef, useEffect } from "react"
import { ApplicationContext } from "./Context/ApplicationContext"
import PokemonCard from "./Components/PokemonCard/PokemonCard"
import PokemonTable from './Components/PokemonTable/PokemonTable'
import type { Pokemon } from "./Types/pokemon"
import PersistentCheckbox from "./Components/UI/PersistentCheckbox"


export default function Home() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [activeIndex, setActiveIndex] = useState<number>(-1)

    const [enablePicture, setEnablePicture] = useState<boolean>(true)
    const [enableHeight, setEnableHeight] = useState<boolean>(true)
    const [enableWeight, setEnableWeight] = useState<boolean>(true)
    const [enableTypes, setEnableTypes] = useState<boolean>(true)

    const activeIndexRef = useRef(activeIndex)
    const pokemonsLengthRef = useRef(pokemons.length)

    const application = {
        pokemons,
        setPokemons,
        activeIndex,
        setActiveIndex,
        enablePicture,
        enableHeight,
        enableWeight,
        enableTypes
    }

    const handleWindowKeyDown = (event: KeyboardEvent) => {
        event.preventDefault()
        const prevRowKeys = ["ArrowUp", "ArrowLeft", "w", "a"]
        const nextRowKeys = ["ArrowDown", "ArrowRight", "s", "d"]

        if (prevRowKeys.includes(event.key)) {
            if (activeIndexRef.current > 0) {
                application.setActiveIndex(index => index - 1)
            }
        } 
        else if (nextRowKeys.includes(event.key)) {
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
                <header>PokéTable</header>

                <main>
                    <PokemonCard />
                    <div className={styles.tableAndCheckboxesContainer}>
                        <div className={styles.checkboxRow}>
                            <PersistentCheckbox 
                                label="Picture" 
                                storageKey="enablePicture" 
                                state={enablePicture} 
                                setState={setEnablePicture}
                                initialState={true}
                            />
                            <PersistentCheckbox 
                                label="Height" 
                                storageKey="enableHeight" 
                                state={enableHeight} 
                                setState={setEnableHeight}
                                initialState={true}
                            />
                            <PersistentCheckbox 
                                label="Weight" 
                                storageKey="enableWeight" 
                                state={enableWeight} 
                                setState={setEnableWeight}
                                initialState={true}
                            />
                            <PersistentCheckbox 
                                label="Types" 
                                storageKey="enableTypes" 
                                state={enableTypes} 
                                setState={setEnableTypes}
                                initialState={true}
                            />
                        </div>

                        <PokemonTable />
                    </div>
                </main> 

                <footer>
                    <p>Pokémon data is fetched from <a href="https://pokeapi.co">https://pokeapi.co</a></p>
                </footer>
            </div>
        </ApplicationContext.Provider>
    )
}

'use client'
import styles from "./PersistentCheckbox.module.scss"
import { useEffect, Dispatch, SetStateAction } from 'react'

interface PersistentCheckboxProps {
    label: string
    storageKey: string
    state: boolean
    setState: Dispatch<SetStateAction<boolean>>
    initialState: boolean
}

export default function PersistentCheckbox({ label, storageKey, state, setState, initialState }: PersistentCheckboxProps) {
    function handleToggle() {
        setState(prev => !prev)
    }

    // Retrieve from localStorage on initial load
    // Important!!!
    // this function must be placed before the one writing to localStorage 
    // to prevent localStorage from being overwritten on initial load
    useEffect(() => {
        const storedValue = localStorage.getItem(storageKey)
        
        // Check if value existed in localStorage
        if (storedValue === null) {
            setState(initialState)
        }
        else {
            setState(JSON.parse(storedValue))
        }
    }, [storageKey, initialState, setState])

    // Persist the state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(state))
    }, [state, storageKey]) 

    return (
        <div className={styles.checkboxContainer} onClick={handleToggle}>
            <input
                type="checkbox"
                checked={state}
                onChange={event => event.stopPropagation()} // Prevent double toggle
            />
            <label>{label}</label>
        </div>
        
    )
}

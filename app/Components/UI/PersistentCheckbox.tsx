'use client'
import { useEffect, Dispatch, SetStateAction } from 'react'

interface PersistentCheckboxProps {
    label: string
    storageKey: string
    state: boolean
    setState: Dispatch<SetStateAction<boolean>>
}

export default function PersistentCheckbox({ label, storageKey, state, setState }: PersistentCheckboxProps) {
    function handleChange() {
        setState(prev => !prev)
    }

    // Retrieve from localStorage on initial load
    // Important!!!
    // this function must be placed before the one writing to localStorage 
    // to prevent localStorage to be overwritten on initial load
    useEffect(() => {
        const storedValue = localStorage.getItem(storageKey)
        
        // Check if value existed in localStorage
        if (storedValue === null) {
            console.log("null")
            setState(false)
        }
        else {
            console.log(storedValue)
            setState(JSON.parse(storedValue))
        }
    }, [])

    // Persist the state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(state))
        console.log(state)
    }, [state, storageKey]) 

    return (
        <label>
            <input
                type="checkbox"
                checked={state}
                onChange={handleChange}
            />
            {label}
        </label>
    )
}

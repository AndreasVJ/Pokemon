import { createContext, useContext } from "react"
import type { Application } from "./Types"

export const ApplicationContext = createContext<Application | null>(null)

export function useApplicationContext() {
    const application = useContext(ApplicationContext)

    if (application === null) {
        throw new Error("useApplication must be used within an ApplicationContext")
    }

    return application 
}

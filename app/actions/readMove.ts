export async function readMove(moveUrl: string) {
    try {
        const response = await fetch(moveUrl)
        if (!response.ok) {
            throw new Error("Failed to fetch move data")
        }
        const move = await response.json()
        return move
    } 
    catch (error) {
        console.error(error)
    }
}

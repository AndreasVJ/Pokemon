import type { Move, DetailedMove, MoveCardInfo } from "../Types/move.ts"

export async function readDetailedMove(moveUrl: string): Promise<DetailedMove | null> {
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
        return null
    }
}


export async function getMoveCardInfo(moves: Move[]) : Promise<MoveCardInfo[]> {
    const detailedProcessedMoves = await Promise.all(
        moves.map(async move => {
            const detailedMove = await readDetailedMove(move.url)

            if (detailedMove === null) return null

            const effectEntry = detailedMove.effect_entries.find(
                (entry: any) => entry.language.name === "en"
            )
            return {
                name: move.name,
                power: detailedMove.power ? detailedMove.power : "",
                description: effectEntry ? effectEntry.short_effect : ""
            }
        }),
    )
    return detailedProcessedMoves.filter(move => move !== null)
}

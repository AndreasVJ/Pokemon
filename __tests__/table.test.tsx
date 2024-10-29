import { render, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import PokemonTable from '@/app/Components/PokemonTable/PokemonTable'
import { ApplicationContext } from '@/app/Context/ApplicationContext'


jest.mock('../app/actions/readPokemonPage', () => ({
    readPokemonPage: jest.fn(() => Promise.resolve([
        { id: 1, name: 'Bulbasaur', height: 7, weight: 69, sprites: { front_default: 'url/to/image' }, types: [] },
        { id: 2, name: 'Ivysaur', height: 10, weight: 130, sprites: { front_default: 'url/to/image' }, types: [] },
    ]))
}))

window.HTMLElement.prototype.scrollIntoView = jest.fn()


describe('PokemonTable Component', () => {
    test('check if hide class gets attached', async () => {

        // Mock application context values
        const mockContextValue = {
            pokemons: [],
            setPokemons: jest.fn(),
            activeIndex: 0,
            setActiveIndex: jest.fn(),
            enablePicture: true,
            enableHeight: true,
            enableWeight: false,
            enableTypes: false,
        }

        render(
            <ApplicationContext.Provider value={mockContextValue}>
                <PokemonTable />
            </ApplicationContext.Provider>
        )
        
        const thPictureElement = screen.getByRole('columnheader', { name: "Picture" })
        const thHeightElement = screen.getByRole('columnheader', { name: "Height" })
        const thWeightElement = screen.getByRole('columnheader', { name: "Weight" })
        const thTypesElement = screen.getByRole('columnheader', { name: "Types" })


        await waitFor(() => {
            expect(screen.getByText('ID')).toBeInTheDocument()
            expect(screen.getByText('Name')).toBeInTheDocument()
            expect(thPictureElement).not.toHaveClass('hide')
            expect(thHeightElement).not.toHaveClass('hide')
            expect(thWeightElement).toHaveClass('hide')
            expect(thTypesElement).toHaveClass('hide')
        })
    })
})

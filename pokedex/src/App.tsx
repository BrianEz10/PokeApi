import { useEffect, useState } from 'react'
import type { PokemonListItem, PokemonListResponse } from './types/pokemon'
import PokemonList from './components/PokemonList'

function App() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20')

        if (!response.ok) {
          throw new Error(`Error al obtener los pokémon: ${response.status}`)
        }

        const data: PokemonListResponse = await response.json()
        setPokemons(data.results)

      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Ocurrió un error desconocido')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPokemons()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Cargando Pokédex...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>
      <PokemonList
        pokemons={pokemons}
        selected={selected}
        onSelect={setSelected}
      />
    </div>
  )
}

export default App
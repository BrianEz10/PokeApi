import { useEffect, useState } from 'react'
import type { PokemonDetail } from '../types/pokemon'

interface PokemonCardProps {
  name: string
  isSelected: boolean
  onSelect: (name: string) => void
}

const typeColors: Record<string, string> = {
  fire: 'bg-red-400',
  water: 'bg-blue-400',
  grass: 'bg-green-400',
  electric: 'bg-yellow-300',
  psychic: 'bg-pink-400',
  ice: 'bg-cyan-300',
  dragon: 'bg-indigo-500',
  dark: 'bg-gray-700',
  fairy: 'bg-pink-300',
  normal: 'bg-gray-400',
  fighting: 'bg-orange-600',
  flying: 'bg-sky-300',
  poison: 'bg-purple-400',
  ground: 'bg-yellow-600',
  rock: 'bg-yellow-800',
  bug: 'bg-lime-400',
  ghost: 'bg-purple-700',
  steel: 'bg-gray-400',
}

function PokemonCard({ name, isSelected, onSelect }: PokemonCardProps) {
  const [detail, setDetail] = useState<PokemonDetail | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true)
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const data: PokemonDetail = await response.json()
        setDetail(data)
      } catch (err) {
        console.error(`Error al cargar ${name}:`, err)
      } finally {
        setLoading(false)
      }
    }

    fetchDetail()
  }, [name])

  if (loading) {
    return (
      <div className="animate-pulse bg-gray-200 rounded-xl h-40" />
    )
  }

  if (!detail) {
    return (
      <div className="bg-red-100 rounded-xl p-4 text-center text-red-500 text-sm">
        Error al cargar {name}
      </div>
    )
  }

  return (
    <div
      onClick={() => onSelect(name)}
      className={`
        cursor-pointer rounded-xl p-4 flex flex-col items-center gap-2
        transition-all duration-200
        ${isSelected
          ? 'bg-yellow-100 border-2 border-yellow-400 scale-105 shadow-lg'
          : 'bg-white border-2 border-gray-200 hover:border-yellow-300 hover:shadow-md'
        }
      `}
    >
      {detail.sprites.front_default ? (
        <img
          src={detail.sprites.front_default}
          alt={detail.name}
          className="w-20 h-20"
        />
      ) : (
        <div className="w-20 h-20 bg-gray-200 rounded-full" />
      )}

      <p className="font-semibold capitalize text-gray-800">{detail.name}</p>

      <div className="flex gap-1 flex-wrap justify-center">
        {detail.types.map((t) => (
          <span
            key={t.slot}
            className={`text-xs text-white px-2 py-0.5 rounded-full capitalize ${typeColors[t.type.name] ?? 'bg-gray-400'}`}
          >
            {t.type.name}
          </span>
        ))}
      </div>

      {isSelected && (
        <div className="w-full mt-2 flex flex-col gap-1">
          {detail.stats.map((s) => (
            <div key={s.stat.name} className="flex justify-between text-xs text-gray-700">
              <span className="capitalize">{s.stat.name}</span>
              <span className="font-bold">{s.base_stat}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PokemonCard
import React from 'react'

interface Ceramic {
  id: number
  name: string
  color: string
  texture: string
}

interface CeramicSelectorProps {
  options: Ceramic[]
  selectedCeramic: Ceramic
  onSelect: (ceramic: Ceramic) => void
}

const CeramicSelector: React.FC<CeramicSelectorProps> = ({ options, selectedCeramic, onSelect }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select a Ceramic Tile</h2>
      <div className="space-y-4">
        {options.map((ceramic) => (
          <button
            key={ceramic.id}
            className={`flex items-center p-2 w-full rounded ${
              selectedCeramic.id === ceramic.id ? 'bg-blue-100 border-2 border-blue-500' : 'bg-white border border-gray-300'
            }`}
            onClick={() => onSelect(ceramic)}
          >
            <img src={ceramic.texture} alt={ceramic.name} className="w-12 h-12 object-cover rounded mr-4" />
            <span>{ceramic.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default CeramicSelector
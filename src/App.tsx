import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import Apartment from './components/Room'
import CeramicSelector from './components/CeramicSelector'

const ceramicOptions = [
  { id: 1, name: 'Classic White', color: '#FFFFFF', texture: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: 2, name: 'Rustic Brown', color: '#8B4513', texture: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: 3, name: 'Modern Gray', color: '#808080', texture: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: 4, name: 'Sleek Black', color: '#202020', texture: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: 5, name: 'Warm Beige', color: '#F5DEB3', texture: 'https://images.unsplash.com/photo-1516972810927-80185027ca84?auto=format&fit=crop&q=80&w=200&h=200' },
]

function App() {
  const [selectedCeramic, setSelectedCeramic] = useState(ceramicOptions[0])

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Visualizador 3D de Cerámica para Apartamentos</h1>
      </header>
      <div className="flex flex-1">
        <div className="w-1/4 p-4 bg-gray-100 overflow-y-auto">
          <CeramicSelector
            options={ceramicOptions}
            selectedCeramic={selectedCeramic}
            onSelect={setSelectedCeramic}
          />
        </div>
        <div className="w-3/4">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 10, 20]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Apartment ceramic={selectedCeramic} />
            <OrbitControls target={[0, 0, 0]} />
          </Canvas>
        </div>
      </div>
    </div>
  )
}

export default App
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Pickaxe(props: any) {
  const group = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!group.current) return
    
    // Mining animation (sine wave)
    const time = state.clock.getElapsedTime()
    const mineAnim = Math.sin(time * 5) * 0.5 - 0.5 // Mines downwards
    
    // Follow mouse
    const targetX = (state.mouse.x * Math.PI) / 4
    const targetY = (state.mouse.y * Math.PI) / 4
    
    // Smooth interpolation
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetX, 0.1)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetY + mineAnim, 0.1)
  })

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Handle */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 3, 16]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>
      
      {/* Pickaxe Head Base */}
      <mesh position={[0, 0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.3, 2.5, 0.3]} />
        <meshStandardMaterial color="#A9A9A9" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Left Point */}
      <mesh position={[-1.25, 0.2, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <coneGeometry args={[0.15, 0.8, 16]} />
        <meshStandardMaterial color="#D3D3D3" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Right Point */}
      <mesh position={[1.25, 0.2, 0]} rotation={[0, 0, Math.PI / 6]}>
        <coneGeometry args={[0.15, 0.8, 16]} />
        <meshStandardMaterial color="#D3D3D3" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}

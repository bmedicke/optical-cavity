import { useRef } from 'react'

const Ray = (props) => {
  const rayRef = useRef()
  const { rayThickness = 0.1, length = 8, color = 'red' } = props

  return (
    <mesh {...props} ref={rayRef}>
      <meshStandardMaterial attach="material" color={color} />
      <cylinderBufferGeometry
        attach="geometry"
        args={[rayThickness, rayThickness, length]} //rad top, bottom, height
      ></cylinderBufferGeometry>
    </mesh>
  )
}
export default Ray

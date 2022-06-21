import { useRef } from 'react'
import { CylinderBufferGeometry } from 'three'
import { deg2rad } from '../../utilities.js'

const Mirror = (props) => {
  const mesh = useRef()
  const cylinderBufferGeometry = new CylinderBufferGeometry()
  return (
    <mesh {...props} rotation={[0, 0, deg2rad(90)]} ref={mesh}>
      <cylinderBufferGeometry attach="geometry" args={[1, 1, 0.01, 50]} />
      <meshStandardMaterial attach="material" color={'#aaa'} />
    </mesh>
  )
}

export default Mirror

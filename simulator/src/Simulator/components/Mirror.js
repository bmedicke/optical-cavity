import { useRef } from 'react'
import { CylinderBufferGeometry } from 'three'
import { convertDegToRad } from '../helpers.js'

const Mirror = (props) => {
  const mesh = useRef()
  const cylinderBufferGeometry = new CylinderBufferGeometry()
  return (
    <mesh {...props} rotation={[0, 0, convertDegToRad(90)]} ref={mesh}>
      <cylinderBufferGeometry attach="geometry" args={[1, 1, 0.01, 50]} />
      <meshStandardMaterial attach="material" color={'#aaa'} />
    </mesh>
  )
}

export default Mirror

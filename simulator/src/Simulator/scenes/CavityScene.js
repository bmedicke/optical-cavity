//const [cavityLength, setCavityLength] = useState(length)
import { useContext, useState } from 'react'
import CameraController from '../components/CameraController'
import Mirror from '../components/Mirror'
import Ray from '../components/Ray'
import { CavityContext } from '../ctx/CavityContext'
import { convertDegToRad } from '../helpers'

const CavityScene = () => {
  const [isResonant, setIsResonant] = useState(true) //to be done
  const { caviLength } = useContext(CavityContext) // test out countext state

  let POS_ITM = 0
  let POS_ETM = caviLength / 20
  const rayThickness = 0.05
  return (
    <>
      <CameraController />
      <ambientLight />
      <pointLight position={[0, 50, 10]} intensity={1.5} />
    </>
  )
}
export default CavityScene

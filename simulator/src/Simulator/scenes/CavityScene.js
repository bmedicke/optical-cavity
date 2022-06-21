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
  return (
  )
}
export default CavityScene

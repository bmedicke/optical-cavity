//const [cavityLength, setCavityLength] = useState(length)
import { useContext, useState, useEffect } from 'react'
import { rgb2string } from '../../Visualizations.js'
import CameraController from '../components/CameraController'
import Mirror from '../components/Mirror'
import Ray from '../components/Ray'
import { CavityContext } from '../ctx/CavityContext'
import { convertDegToRad } from '../helpers'

// TO BE DONE : COLORING NOT YET FINISHED
const CavityScene = () => {
  const [isResonant, setIsResonant] = useState(true) //to be done
  const { caviLength, setCaviLength } = useContext(CavityContext) // test out countext state
  const { wavelengthColor, setWavelengthColor } = useContext(CavityContext) // test out countext state

  let POS_ITM = 0
  let POS_ETM = caviLength / 100
  const rayThickness = 0.05

  useEffect(() => {
    console.log(wavelengthColor)
  }, [wavelengthColor])

  return (
    <>
      <CameraController />
      <ambientLight />
      <pointLight position={[0, 50, 10]} intensity={1.5} />
      <Mirror position={[POS_ITM, 0, 0]} />
      <Mirror position={[POS_ETM, 0, 0]} />
      <Ray
        rayThickness={rayThickness}
        length={10}
        color={`${rgb2string(wavelengthColor, 0.1)}`}
        position={[-10 / 2, 0, 0]} //fixed
        rotation={[0, 0, convertDegToRad(90)]}
      />
      <Ray
        rayThickness={rayThickness}
        length={caviLength / 100}
        color={isResonant ? 'red' : `${rgb2string(wavelengthColor, 0.1)}`}
        position={[caviLength / 100 / 2, 0, 0]}
        rotation={[0, 0, convertDegToRad(90)]}
      />
      <Ray
        rayThickness={rayThickness}
        length={100 - caviLength / 100}
        color={`${rgb2string(wavelengthColor, 0.1)}`}
        position={[caviLength / 100 + (100 - caviLength / 100) / 2, 0, 0]}
        rotation={[0, 0, convertDegToRad(90)]}
      />
    </>
  )
}
export default CavityScene

import CameraController from '../components/CameraController'
import Mirror from '../components/Mirror'
import Ray from '../components/Ray'
import { CavityContext } from '../ctx/CavityContext'
import { deg2rad } from '../../utilities.js'
import { rgb2string } from '../../Visualizations.js'
import { useContext, useState, useEffect } from 'react'

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
        rotation={[0, 0, deg2rad(90)]}
      />
      <Ray
        rayThickness={rayThickness}
        length={caviLength / 100}
        color={isResonant ? 'red' : `${rgb2string(wavelengthColor, 0.1)}`}
        position={[caviLength / 100 / 2, 0, 0]}
        rotation={[0, 0, deg2rad(90)]}
      />
      <Ray
        rayThickness={rayThickness}
        length={100 - caviLength / 100}
        color={`${rgb2string(wavelengthColor, 0.1)}`}
        position={[caviLength / 100 + (100 - caviLength / 100) / 2, 0, 0]}
        rotation={[0, 0, deg2rad(90)]}
      />
    </>
  )
}
export default CavityScene

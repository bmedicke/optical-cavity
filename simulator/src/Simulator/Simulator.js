import CavityScene from './scenes/CavityScene'
import styles from './Simulator.module.scss'
import { Canvas } from '@react-three/fiber'
import { CavityContext } from './ctx/CavityContext'
import { useContextBridge } from '@react-three/drei'

const Simulator = () => {
  const ContextBridge = useContextBridge(CavityContext)

  return (
    <Canvas className={styles.simulator}>
      <ContextBridge>
        <CavityScene />
      </ContextBridge>
    </Canvas>
  )
}

export default Simulator

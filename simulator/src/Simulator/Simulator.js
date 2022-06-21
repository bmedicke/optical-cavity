import { useContextBridge } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import styles from './Simulator.module.scss'
import { CavityContext } from './ctx/CavityContext'
import CavityScene from './scenes/CavityScene'

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

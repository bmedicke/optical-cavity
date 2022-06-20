import styles from './Box.module.scss'
import { Sweep } from './Visualizations'
import { useInterval } from './utilities'
import { useState } from 'react'

const SweepBox = ({
  label = 'Sweep',
  setter = null,
  hideCanvas = false,
  showDetails = false,
  infoClick = () => {},
}) => {
  const [isActive, setIsActive] = useState(false)
  const [isMovingLeft, setIsMovingLeft] = useState(false)
  const [delay, setDelay] = useState(30)

  useInterval(() => {
    if (isActive) {
      if (setter) {
        setter((value) => {
          let newValue = parseInt(value) + (isMovingLeft ? -1 : 1)
          if (newValue < 1) {
            setIsMovingLeft((x) => !x)
            newValue = 1
          } else if (newValue > 1000) {
            setIsMovingLeft((x) => !x)
            newValue = 1000
          }
          return newValue
        })
      }
    }
  }, delay)

  return (
    <div
      className={styles.box}
      style={hideCanvas ? { minHeight: '100px' } : { minHeight: '300px' }}
    >
      <label>
        <h1>{label}</h1>
      </label>
      {!hideCanvas && <Sweep isMovingLeft={isMovingLeft} isActive={isActive} />}
      <div className={'button-container'}>
        <button onClick={() => setIsActive((x) => !x)}>
          {isActive ? 'turn off' : 'turn on'}
        </button>
        <button onClick={() => setIsMovingLeft((x) => !x)}>
          {isMovingLeft ? 'move right' : 'move left'}
        </button>
      </div>
      <input
        type="range"
        value={delay}
        min={1}
        max={100}
        step={1}
        onChange={(e) => setDelay(e.target.value)}
      />
      {showDetails && (
        <button onClick={() => infoClick(label)} className={styles.infoBtn}>
          i
        </button>
      )}
    </div>
  )
}

export default SweepBox

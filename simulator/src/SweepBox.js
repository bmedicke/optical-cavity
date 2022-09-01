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
  setIsActive,
  isActive,
}) => {
  const [isMovingLeft, setIsMovingLeft] = useState(false)
  const [minValue, setIsMinValue] = useState(1)
  const [maxValue, setIsMaxValue] = useState(1000)
  const [delay, setDelay] = useState(30)

  useInterval(() => {
    if (isActive) {
      if (setter) {
        setter((value) => {
          let newValue = parseInt(value) + (isMovingLeft ? -1 : 1)
          if (newValue < minValue) {
            setIsMovingLeft((x) => !x)
            newValue = minValue
          } else if (newValue > maxValue) {
            setIsMovingLeft((x) => !x)
            newValue = maxValue
          }
          return newValue
        })
      }
    }
  }, delay)

  return (
    <div
      className={styles.box}
      style={hideCanvas ? { minHeight: '140px' } : { minHeight: '350px' }}
    >
      <div className={styles.preCanvas}>
        <label>
          <h1>{label}</h1>
        </label>
      </div>
      {!hideCanvas && <Sweep isMovingLeft={isMovingLeft} isActive={isActive} />}
      <div className={styles.buttonContainer}>
        <button onClick={() => setIsActive((x) => !x)}>
          {isActive ? 'turn off' : 'turn on'}
        </button>
        <button onClick={() => setIsMovingLeft((x) => !x)}>
          {isMovingLeft ? 'move right' : 'move left'}
        </button>
      </div>
      <div className={styles.buttonContainer}>
        <input
          type="number"
          value={minValue}
          onChange={(e) => setIsMinValue(e.target.value)}
          // TODO style it:
          style={{ maxWidth: '35%' }}
        />
        <input
          type="number"
          value={maxValue}
          onChange={(e) => setIsMaxValue(e.target.value)}
          // TODO style it:
          style={{ maxWidth: '35%' }}
        />
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

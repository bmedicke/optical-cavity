import styles from './Box.module.scss'
import { Jitter } from './Visualizations'
import { useState } from 'react'
import { useInterval } from './utilities'

const JitterBox = ({
  label = 'Jitter',
  setter = null,
  hideCanvas = false,
  showDetails = false,
  infoClick = () => {},
  setIsActive,
  isActive,
}) => {
  const datapoints = 25
  const [graphData, setGraphData] = useState([])
  const [delta, setDelta] = useState(0)
  const [delay, setDelay] = useState(30)

  useInterval(() => {
    setIsActive((active) => {
      if (active) {
        setGraphData((graphdata) => {
          graphdata.push(Math.floor(Math.random() * 3) - 1)
          setDelta((x) => x + graphdata[graphdata.length - 1])
          if (graphdata.length > datapoints) {
            graphdata.shift()
          }
          return graphdata
        })
        if (setter) {
          setter((value) => parseInt(value) + graphData[graphData.length - 1])
        }
      }
      return active
    })
  }, delay)

  return (
    <div
      className={styles.box}
      style={hideCanvas ? { minHeight: '100px' } : { minHeight: '300px' }}
    >
      <label>
        <h1>{label}</h1>
      </label>
      {!hideCanvas && (
        <Jitter jitter={graphData} datapoints={datapoints} totaldelta={delta} />
      )}
      <div className={'button-container'}>
        <button onClick={() => setIsActive((x) => !x)}>
          {isActive ? 'turn off' : 'turn on'}
        </button>
        <button
          onClick={() => {
            setDelta(0)
          }}
        >
          reset delta
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

export default JitterBox

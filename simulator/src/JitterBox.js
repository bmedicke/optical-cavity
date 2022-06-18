import { Jitter } from './Visualizations'
import { useEffect, useState } from 'react'

const JitterBox = ({ label = 'Jitter', setter = null, hideCanvas = false }) => {
  const [isActive, setIsActive] = useState(false)
  const datapoints = 25
  const [graphData, setGraphData] = useState([])
  const [delta, setDelta] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
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
    }, 10)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const stylingBox = {
    background: '#fff',
    display: 'inline-flex',
    flexDirection: 'column',
    margin: '2.5px 2.5px',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '220px',
    minWidth: '220px',
  }

  return (
    <div className="box" style={stylingBox}>
      <label style={{ color: 'white', textAlign: 'center', width: '100%' }}>
        <h1 style={{ marginRight: '1rem' }}>{label}</h1>
      </label>
      {!hideCanvas && (
        <Jitter jitter={graphData} datapoints={datapoints} totaldelta={delta} />
      )}
      <button onClick={() => setIsActive((x) => !x)}>
        {isActive ? 'turn off' : 'turn on'}
      </button>
    </div>
  )
}

export default JitterBox

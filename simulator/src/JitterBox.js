import { useEffect, useState } from 'react'
import { rgb2string } from './Visualizations'

const JitterBox = ({
  label = 'defaultLabel',
  setter = null,
  hideCanvas = false,
  rgb = { r: 255, g: 255, b: 255 },
//   isActive,
//   setIsActive,
  canvasplot = (
    <canvas
      // TODO use style from Visualization.css
      style={{
        backgroundColor: rgb2string(rgb, 0.1),
        height: '200px',
        width: '200px',
        backgroundImage: 'url("/maniac.jpeg")',
        backgroundSize: 'cover',
        backgroundBlendMode: 'luminosity',
      }}
    ></canvas>
  )
}) => {

    const [isActive, setIsActive] = useState(false)

// Sets an interval every 0.5s
  useEffect(() => {
    
        const interval = setInterval(() => {
        setIsActive(x => {console.log(x); return x;})
        
        setIsActive(x => {
            if(x){
                setter && setter((y) => parseInt(y) + Math.floor(Math.random() * 3) - 1)
            }
            return x
        })
        
          },500)
    return () => {
      clearInterval(interval)
      console.log("clearing intervale in " + label)
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
      {!hideCanvas && canvasplot}
      <button onClick={() => setIsActive(x => !x)}>Jitter</button>
          </div>
  )
}

export default JitterBox

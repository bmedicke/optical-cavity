import './App.css'
import { useEffect, useState } from 'react'
import { i } from 'mathjs'

function App() {
  // configurable variables:
  const [cavitylength, setCavitylength] = useState(200)
  const [laserpower, setLaserpower] = useState(1) // in W.
  const [m1reflectivity, setM1reflectivity] = useState(0.9)
  const [m2reflectivity, setM2reflectivity] = useState(0.9)
  const [opticalgain, setOpticalgain] = useState(0)
  const [wavelength, setWavelength] = useState(200)

  // calculated variables:
  const [wavenumber, setWavenumber] = useState(undefined)
  const [phaseshift, setPhaseshift] = useState(undefined)
  const [m1transmittance, setM1transmittance] = useState(0)
  const [m2transmittance, setM2transmittance] = useState(0)

  useEffect(() => {
    setWavenumber((2 * Math.PI) / wavelength)
  }, [wavelength])

  useEffect(() => {
    setPhaseshift(((wavenumber * 10 * cavitylength) / 10) % (2 * Math.PI))
  }, [wavenumber, cavitylength])

  useEffect(() => {
    setM1reflectivity((x) => {
      setM1transmittance(Math.sqrt(1.0 - Math.pow(x, 2)))
      return x
    })
    setM2reflectivity((x) => {
      setM2transmittance(Math.sqrt(1.0 - Math.pow(x, 2)))
      return x
    })
  }, [m1reflectivity, m2reflectivity])

  // TODO correctly implement i
  useEffect(() => {
    console.log(
      `Optical Gain: ${
        m1transmittance /
        (1 -
          Math.pow(
            (m1reflectivity * m2reflectivity * Math.E,
            2 * i * wavenumber * cavitylength)
          ))
      }`
    )
    setOpticalgain(
      m1transmittance /
        (1 -
          Math.pow(
            (m1reflectivity * m2reflectivity * Math.E,
            2 * i * wavenumber * cavitylength)
          ))
    )
  }, [
    m1reflectivity,
    m2reflectivity,
    m1transmittance,
    wavenumber,
    cavitylength,
  ])

  return (
    <div className="App">
      <div className="controls">
        <label>
          Laser Power:
          <input
            type="number"
            min="0"
            max="5000"
            step="1"
            onChange={(e) => setLaserpower(e.target.value)}
            value={laserpower}
          />
          W
        </label>

        <label>
          Cavity Length:
          <input
            type="number"
            value={cavitylength}
            min="0"
            max="100000"
            onChange={(e) => setCavitylength(e.target.value)}
          />
          nm
        </label>

        <label>
          Lambda:
          <input
            type="number"
            min="0"
            max="1000"
            step="0.1"
            onChange={(e) => setWavelength(e.target.value)}
            value={wavelength}
          />
          nm
        </label>

        <label>
          Reflectivity Mirror 1:
          <input
            type="number"
            value={m1reflectivity}
            min="0"
            max="1"
            step="0.01"
            onChange={(e) => setM1reflectivity(e.target.value)}
          />
        </label>

        <label>
          Reflectivity Mirror 2:
          <input
            type="number"
            value={m2reflectivity}
            min="0"
            max="1"
            step="0.01"
            onChange={(e) => setM2reflectivity(e.target.value)}
          />
        </label>
      </div>
      <hr />
      <div className="results">
        <label>
          Wave Number:
          <input type="text" value={wavenumber} disabled />
        </label>

        <label>
          Phase Shift:
          <input type="text" value={phaseshift} disabled />
          rad
        </label>

        <label>
          Transmittance Mirror 1:
          <input type="text" value={m1transmittance} disabled />
        </label>

        <label>
          Transmittance Mirror 2:
          <input type="text" value={m2transmittance} disabled />
        </label>
      </div>
    </div>
  )
}

export default App

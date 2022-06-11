import './App.css'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import { Power, Phaseshift, Gain, Wavelength } from './Visualizations'
import { rad2deg } from './utilities'
import { useEffect, useState } from 'react'
import * as math from 'mathjs'
import Box from './Box.js'

function App() {
  // configurable variables:
  const [cavitylength, setCavitylength] = useState(200)
  const [laserpower, setLaserpower] = useState(40) // in W.
  const [m1reflectivity, setM1reflectivity] = useState(0.9)
  const [m2reflectivity, setM2reflectivity] = useState(0.9)
  const [wavelength, setWavelength] = useState(200)

  // calculated variables:
  const [wavenumber, setWavenumber] = useState(0)
  const [phaseshift, setPhaseshift] = useState(0)
  const [m1transmittance, setM1transmittance] = useState(0)
  const [m2transmittance, setM2transmittance] = useState(0)
  const [epow2ikl, setEpow2ikl] = useState(0) // e^(i*k*l).
  const [opticalgain, setOpticalgain] = useState(0)
  const [opticalgainRessonance, setOpticalgainRessonance] = useState(0)
  const [reflectedgain, setReflectedgain] = useState(0)
  const [transmittedgain, setTransmittedgain] = useState(0)

  const [isLocked, setIsLocked] = useState(false)
  const [isMaximallyOutOfPhase, setIsMaximallyOutOfPhase] = useState(false)

  // ui controls:
  const [showformulas, setShowformulas] = useState(false)
  const [showvisualizations, setShowvisualizations] = useState(true)

  useEffect(() => {
    const locked = rad2deg(phaseshift) % 180 === 0 && cavitylength > 0
    setIsLocked(locked)
    setIsMaximallyOutOfPhase(!locked && rad2deg(phaseshift) % 90 === 0)
  }, [phaseshift, cavitylength])

  useEffect(() => {
    setWavenumber((2 * Math.PI) / wavelength)
  }, [wavelength])

  useEffect(() => {
    setPhaseshift(((wavenumber * 10 * cavitylength) / 10) % (2 * Math.PI))

    const exponent = math.multiply(
      math.multiply(math.multiply(2, math.complex(0, 1)), wavenumber),
      cavitylength
    )
    const exponentiation = math.pow(math.e, exponent)
    setEpow2ikl(exponentiation)
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

  useEffect(() => {
    setOpticalgainRessonance(
      m1transmittance / (1.0 - m1reflectivity * m2reflectivity)
    )
  }, [m1reflectivity, m2reflectivity, m1transmittance])

  useEffect(() => {
    const reflectivitysum = math.multiply(m1reflectivity, m2reflectivity) //r1*r2
    const foo = math.multiply(epow2ikl, reflectivitysum)
    const divisor = math.subtract(1.0, foo)
    const result = math.divide(m1transmittance, divisor).re
    setOpticalgain(result)

    const numerator = math.add(
      -m1reflectivity,
      math.multiply(m2reflectivity, epow2ikl)
    )
    const denomerator = math.subtract(1, foo)

    setReflectedgain(Math.abs(math.divide(numerator, denomerator).re))
  }, [m1transmittance, m1reflectivity, m2reflectivity, epow2ikl])

  useEffect(() => {
    const exponent = math.multiply(
      math.multiply(wavenumber, cavitylength),
      math.i
    )
    const exponentiation = math.pow(math.e, exponent)
    const numerator = math.multiply(
      math.multiply(m1transmittance, m2transmittance),
      exponentiation
    )
    const denomerator = math.subtract(
      1,
      math.multiply(math.multiply(m1reflectivity, m2reflectivity), epow2ikl)
    )
    const result = math.divide(numerator, denomerator)
    setTransmittedgain(Math.abs(result.re))
  }, [
    m1transmittance,
    m2transmittance,
    cavitylength,
    wavenumber,
    m1reflectivity,
    m2reflectivity,
    epow2ikl,
  ])

  return (
    <MathJaxContext>
      <div className="App">
    <div style={{height: "50vh", display: 'flex', flexWrap: 'wrap', overflowX: 'auto'}} className='variable-wrapper'>
    <Box label='laser power' min="0" max="100" step="1" unit="nm" value={laserpower} canvasplot={<Power power={laserpower}/>} setF={e => setLaserpower(e.target.value)}/>
    <Box label="cavity length" min="0" max="1000" step="1" unit="nm" value={cavitylength} setF={e => setCavitylength(e.target.value)} />
    <Box label="wave length" min="0" max="1000" step="1" unit="nm" value={wavelength} canvasplot={<Wavelength wavelength={wavelength}/>} setF={e => setWavelength(e.target.value)} />
    <Box label="reflectivity mirror 1" min="0" max="1" step="0.01" unit="" value={m1reflectivity}  setF={e => setM1reflectivity(e.target.value)} />
    <Box label="reflectivity mirror 2" min="0" max="1" step="0.01" unit="" value={m2reflectivity}  setF={e => setM2reflectivity(e.target.value)} />
    <Box label="angular wavenumber" isResult unit="" value={wavenumber} />
    <Box label="phase shift (rad)" isResult unit="rad" value={phaseshift} />
    <Box label="phase shift (deg)" isResult unit="deg" value={rad2deg(phaseshift)} />
    <Box label="transmittance mirror 1" isResult unit="" value={m1transmittance} />
    <Box label="transmittance mirror 2" isResult unit="" value={m2transmittance} />
    <Box label="optical gain at ressonance" isResult unit="" value={opticalgainRessonance} />
    <Box label="current optical gain" isResult unit="" value={opticalgain} />
    <Box label="reflected gain" isResult unit="" value={reflectedgain} />
    <Box label="transmitted gain" isResult unit="" value={transmittedgain} />

    </div>
        <div className="controls">
          //TODO Visualizations controls
          <button onClick={() => setShowvisualizations((v) => !v)}>
            {showvisualizations ? 'Hide' : 'Show'} Visualizations
          </button>
          <button onClick={() => setShowformulas((v) => !v)}>
            {showformulas ? 'Hide' : 'Show'} Formulae & Unit Signs
          </button>
        </div>
        
        <div className={`cavitystatus ${isLocked && 'locked'}`}>
          Cavity {isLocked ? 'is locked' : 'is out of phase'}
          {isMaximallyOutOfPhase && ' (maximally)'}
        </div>
      </div>
    </MathJaxContext>
  )
}

export default App

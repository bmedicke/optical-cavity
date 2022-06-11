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
    <div className='variable-wrapper'>
    <Box label='laser power' min="0" max="100" step="1" unit="nm" value={laserpower} canvasplot={<Power power={laserpower}/>} setF={e => setLaserpower(e.target.value)}/>
    <Box label="cavity length" min="0" max="1000" step="1" unit="nm" value={cavitylength} setF={e => setCavitylength(e.target.value)} />
    <Box label="wave length" min="0" max="1000" step="1" unit="nm" value={wavelength} canvasplot={<Wavelength wavelength={wavelength}/>} setF={e => setWavelength(e.target.value)} />

    </div>

        
        <div className="controls">
          <button onClick={() => setShowvisualizations((v) => !v)}>
            {showvisualizations ? 'Hide' : 'Show'} Visualizations
          </button>
          <button onClick={() => setShowformulas((v) => !v)}>
            {showformulas ? 'Hide' : 'Show'} Formulae & Unit Signs
          </button>
        

          

          <label>
            <a href="https://en.wikipedia.org/wiki/Reflectance#Reflectivity">
              Reflectivity
            </a>
            {showformulas && <MathJax>{`\\(r_n\\)`}</MathJax>}
            Mirror 1 (fixed)
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
            Mirror 2 (piezo)
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
            <a href="https://en.wikipedia.org/wiki/Wavenumber">
              Angular Wave Number
            </a>
            {showformulas && (
              <MathJax>
                {`\\(
            k = \\frac{2\\pi}{\\lambda}
            \\)`}
              </MathJax>
            )}
            <input type="text" value={wavenumber} disabled />
          </label>

          <hr />

          <label>
            <a href="https://en.wikipedia.org/wiki/Phase_(waves)#Phase_shift">
              Phase Shift
            </a>
            {showformulas && (
              <MathJax>
                {`\\(
            \\phi = k L \\,\\, \\mathrm{mod}\\,\\, 2\\pi
            \\)`}
              </MathJax>
            )}
            <input type="text" value={phaseshift} disabled />
            rad
            <br />
            <input type="text" value={rad2deg(phaseshift)} disabled />
            deg
            {showvisualizations && <Phaseshift phaseshift={phaseshift} />}
          </label>

          <hr />

          <label>
            <a href="https://de.wikipedia.org/wiki/Transmission_(Physik)">
              Transmittance
            </a>
            {showformulas && (
              <MathJax>
                {`\\(
            t_n = \\sqrt{1 - r_n^2}
            \\)`}
              </MathJax>
            )}
            Mirror 1 (fixed)
            <input type="text" value={m1transmittance} disabled />
          </label>

          <label>
            Mirror 2 (piezo)
            <input type="text" value={m2transmittance} disabled />
          </label>


        <label>
          Optical Gain at resonance
          {showformulas && (
            <MathJax>
              {`\\(
              \\left|\\dfrac{E_\\mathrm{cavity}}{E_\\mathrm{laser}}\\right| = \\left|\\dfrac{t_1}{1 - r_1 r_2}\\right|
              \\)`}
            </MathJax>
          )}
          <input type="text" value={opticalgainRessonance} disabled />
          {showvisualizations && (
            <Gain power={laserpower} gain={opticalgainRessonance} />
          )}
        </label>

        <hr />

        <label>
          Current Optical Gain
          {showformulas && (
            <MathJax>
              {`\\(
              \\left|\\dfrac{E_\\mathrm{cavity}}{E_\\mathrm{laser}}\\right| = \\left|\\dfrac{t_1}{1 - r_1 r_2 e^{2ikL}}\\right|
              \\)`}
            </MathJax>
          )}
          <input type="text" value={opticalgain} disabled />
          {showvisualizations && <Gain power={laserpower} gain={opticalgain} />}
        </label>

        <hr />

        <label>
          Reflected Gain
          {showformulas && (
            <MathJax>
              {`\\(
              \\left|\\dfrac{E_\\mathrm{reflected}}{E_\\mathrm{laser}}\\right| = \\left|\\dfrac{-r_1 + r_2e^{2ikL}}{1 - r_1 r_2 e^{2ikL}}\\right|
              \\)`}
            </MathJax>
          )}
          <input type="text" value={reflectedgain} disabled />
          {showvisualizations && (
            <Gain power={laserpower} gain={reflectedgain} />
          )}
        </label>

        <hr />

        <label>
          Transmitted Gain
          {showformulas && (
            <MathJax>
              {`\\(
              \\left|\\dfrac{E_\\mathrm{transmitted}}{E_\\mathrm{laser}}\\right| = \\left|\\dfrac{t_1 t_2 e^{ikL}}{1 - r_1 r_2 e^{2ikL}}\\right|
              \\)`}
            </MathJax>
          )}
          <input type="text" value={transmittedgain} disabled />
          {showvisualizations && (
            <Gain power={laserpower} gain={transmittedgain} />
          )}
        </label>

        <hr />
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

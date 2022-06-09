import './App.css'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import { Power, Phaseshift } from './Visualizations'
import { rad2deg } from './utilities'
import { useEffect, useState } from 'react'
import * as math from 'mathjs'

function App() {
  // configurable variables:
  const [cavitylength, setCavitylength] = useState(200)
  const [laserpower, setLaserpower] = useState(50) // in W.
  const [m1reflectivity, setM1reflectivity] = useState(0.9)
  const [m2reflectivity, setM2reflectivity] = useState(0.9)
  const [opticalgain, setOpticalgain] = useState(0)
  const [opticalgainRessonance, setOpticalgainRessonance] = useState(0)
  const [wavelength, setWavelength] = useState(200)

  // calculated variables:
  const [wavenumber, setWavenumber] = useState(0)
  const [phaseshift, setPhaseshift] = useState(0)
  const [m1transmittance, setM1transmittance] = useState(0)
  const [m2transmittance, setM2transmittance] = useState(0)
  const [euler, setEuler] = useState(0) // TODO, think of a better name for this.

  const [showformulas, setShowformulas] = useState(false)
  const [isLocked, setIsLocked] = useState(false)

  useEffect(() => {
    setIsLocked(rad2deg(phaseshift) % 180 === 0 && cavitylength > 0)
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
    setEuler(exponentiation)
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
    const foo = math.multiply(euler, reflectivitysum)
    const divisor = math.subtract(1.0, foo)
    const result = math.divide(m1transmittance, divisor)
    setOpticalgain(result.re)
  }, [m1transmittance, m1reflectivity, m2reflectivity, euler])

  return (
    <MathJaxContext>
      <div className="App">
        <div className="controls">
          <label>
            Laser Power
            {showformulas && <MathJax>{`\\(P\\)`}</MathJax>}
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              onChange={(e) => setLaserpower(e.target.value)}
              value={laserpower}
            />
            W
          </label>
          <Power power={laserpower} />

          <label>
            Cavity Length
            {showformulas && <MathJax>{`\\(L\\)`}</MathJax>}
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
            <a href="https://en.wikipedia.org/wiki/Wavelength">Wavelength</a>
            {showformulas && <MathJax>{`\\(\\lambda\\)`}</MathJax>}
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
          </label>
          <Phaseshift phaseshift={phaseshift} />
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
        </div>
        <label>
          Optical Gain at resonance
          {showformulas && (
            <MathJax>
              {`\\(
              \\left|\\dfrac{E_\\mathrm{cav}}{E_\\mathrm{laser}}\\right| = \\left|\\dfrac{t_1}{1 - r_1 r_2}\\right|
              \\)`}
            </MathJax>
          )}
          <input type="text" value={opticalgainRessonance} disabled />
        </label>
        <br />
        {showformulas && (
          <MathJax>
            {`\\(
              \\left|\\dfrac{E_\\mathrm{cav}}{E_\\mathrm{laser}}\\right| = \\left|\\dfrac{t_1}{1 - r_1 r_2 e^{2ikL}}\\right|
              \\)`}
          </MathJax>
        )}
        <label>
          Optical Gain
          {showformulas && (
            <MathJax>
              {`\\(
              \\left|\\dfrac{E_\\mathrm{cav}}{E_\\mathrm{laser}}\\right| = \\left|\\dfrac{t_1}{1 - r_1 r_2}\\right|
              \\)`}
            </MathJax>
          )}
          <input type="text" value={opticalgain} disabled />
        </label>
        <br />
        {showformulas && (
          // TODO: fix formula
          <MathJax>
            {`\\(
              \\left|\\dfrac{E_\\mathrm{cav}}{E_\\mathrm{laser}}\\right| = \\left|\\dfrac{t_1}{1 - r_1 r_2 e^{2ikL}}\\right|
              \\)`}
          </MathJax>
        )}
        <div className={`cavitystatus ${isLocked && 'locked'}`}>
          Cavity {isLocked ? 'is locked' : 'is out of phase'}
        </div>
        <button onClick={() => setShowformulas((v) => !v)}>
          formulae & unit signs
        </button>
      </div>
    </MathJaxContext>
  )
}

export default App

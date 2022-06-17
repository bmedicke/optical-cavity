import './App.css'
import * as math from 'mathjs'
import Box from './Box.js'
import InfoOverlay from './InfoOverlay.js'
import JitterBox from './JitterBox.js'
import {
  CavityLength,
  Gain,
  Phaseshift,
  Power,
  Reflectivity,
  Transmittance,
  Wavelength,
  draw_sine,
  rgb2string,
  wavelength2rgb,
} from './Visualizations'
import { MathJaxContext } from 'better-react-mathjax'
import { rad2deg } from './utilities'
import { useEffect, useState } from 'react'

function changeFavicon(wavelength) {
  const canvas = document.createElement('canvas')
  canvas.height = 64
  canvas.width = 64
  const context = canvas.getContext('2d')

  context.lineWidth = 2
  context.strokeStyle = rgb2string(wavelength2rgb(wavelength))
  draw_sine(canvas, context, 90, 0)

  // remove old favicon:
  const icons = document.querySelectorAll('link[rel="shortcut icon"]')
  icons.forEach((e) => e.parentNode.removeChild(e))

  const link = document.createElement('link')
  link.id = 'dynamic-favicon'
  link.rel = 'shortcut icon'
  link.href = canvas.toDataURL()

  document.head.appendChild(link)
}

function App() {
  const c = 299792458 // speed of light in vacuum, m/s.

  // configurable variables:
  const [cavitylength, setCavitylength] = useState(150) // in nm.
  const [laserpower, setLaserpower] = useState(40) // in W.
  const [m1reflectivity, setM1reflectivity] = useState(0.9)
  const [m2reflectivity, setM2reflectivity] = useState(0.9)
  const [wavelength, setWavelength] = useState(200) // in nm.

  // calculated variables:
  const [epow2ikl, setEpow2ikl] = useState(0) // e^(i*k*l).
  const [finesse, setFinesse] = useState(0)
  const [frequency, setFrequency] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [isMaximallyOutOfPhase, setIsMaximallyOutOfPhase] = useState(false)
  const [m1transmittance, setM1transmittance] = useState(0)
  const [m2transmittance, setM2transmittance] = useState(0)
  const [opticalgain, setOpticalgain] = useState(0)
  const [opticalgainRessonance, setOpticalgainRessonance] = useState(0)
  const [phaseshift, setPhaseshift] = useState(0)
  const [reflectedgain, setReflectedgain] = useState(0)
  const [transmittedgain, setTransmittedgain] = useState(0)
  const [wavenumber, setWavenumber] = useState(0)

  // ui controls:
  const [isBottomCollapsed, setIsBottomCollapsed] = useState(true)
  const [isOverlayHidden, setIsOverlayHidden] = useState(true)
  const [infoObject, setInfoObject] = useState({})
  const [showdetails, setShowdetails] = useState(false)
  const [showvisualizations, setShowvisualizations] = useState(true)
  const [wavelengthColor, setWavelengthColor] = useState({})

  // logic controls:
  const [isLengthJittering, setIsLengthJittering] = useState(false)

  useEffect(() => {
    setWavelengthColor(wavelength2rgb(wavelength))
    changeFavicon(wavelength)
  }, [wavelength])

  useEffect(() => {
    const locked = rad2deg(phaseshift) % 180 === 0 && cavitylength > 0
    setIsLocked(locked)
    setIsMaximallyOutOfPhase(!locked && rad2deg(phaseshift) % 90 === 0)
  }, [phaseshift, cavitylength])

  useEffect(() => {
    setWavenumber((2 * Math.PI) / wavelength)
    setFrequency(Math.round((c / wavelength) * 1e9))
  }, [wavelength])

  useEffect(() => {
    setPhaseshift(((wavenumber * 10 * cavitylength) / 10) % (2 * Math.PI))

    const exponent = math.multiply(
      math.multiply(math.multiply(2, math.complex(0, 1)), wavenumber),
      cavitylength ? cavitylength : 1.0
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

    // calculate the cavity finesse:
    const reflectivityproduct = math.multiply(m1reflectivity, m2reflectivity)
    const numerator = math.subtract(1, reflectivityproduct)
    const denominator = math.multiply(2, math.sqrt(reflectivityproduct))

    const outerNumerator = math.pi
    const outerDenominator = math.multiply(
      2,
      math.asin(math.divide(numerator, denominator))
    )

    const result = math.divide(outerNumerator, outerDenominator)
    setFinesse(result)
  }, [m1reflectivity, m2reflectivity])

  useEffect(() => {
    setOpticalgainRessonance(
      m1transmittance / (1.0 - m1reflectivity * m2reflectivity)
    )
  }, [m1reflectivity, m2reflectivity, m1transmittance])

  useEffect(() => {
    const reflectivityproduct = math.multiply(m1reflectivity, m2reflectivity) //r1*r2
    const foo = math.multiply(epow2ikl, reflectivityproduct)
    const divisor = math.subtract(1.0, foo)
    const result = math.divide(m1transmittance, divisor).re
    setOpticalgain(result)

    const numerator = math.add(
      -m1reflectivity,
      math.multiply(m2reflectivity ? m2reflectivity : 0.0, epow2ikl)
    )
    const denomerator = math.subtract(1, foo)

    setReflectedgain(Math.abs(math.divide(numerator, denomerator).re || ''))
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

  const containerStyle = {
    height: '100vh',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 220px)',
    gap: '16px',
    overflowX: 'hidden',
    justifyContent: 'center',
    padding: '0.3rem',
    position: 'relative',
    background: `linear-gradient(90deg, black 30%, ${rgb2string(
      wavelengthColor,
      0.4
    )} 50%, black 70%)`,
    alignContent: 'start',
    alignItmes: 'start',
  }

  const btnStyle = {
    background: 'black',
    padding: '1rem',
    color: 'white',
    width: `${100 / 3}%`,
  }
  const statusStyle = {
    padding: '1rem 0',
    border: `1px solid ${rgb2string(wavelengthColor)}`,
    textAlign: 'center',
    color: isLocked ? `1px solid ${rgb2string(wavelengthColor)}` : 'white',
  }
  const bottomStyle = {
    backgroundImage: `linear-gradient( 0deg, black 25%, ${rgb2string(
      wavelengthColor,
      (laserpower / 100) * (opticalgain / opticalgainRessonance)
    )} 50%, black 75%)`,
    height: isBottomCollapsed ? '0%' : '80%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundBlendMode: isLocked ? 'luminosity' : 'multiply',
    backgroundPosition: 'center',
    position: 'relative',
  }

  const collapsBtnStyle = {
    position: 'absolute',
    top: isBottomCollapsed ? '-52px' : 0,
    right: 0,
    padding: '1rem',
    border: '1px solid white',
    borderRadius: '12%',
    background: isBottomCollapsed ? 'white' : 'transparent',
    color: isBottomCollapsed ? 'black' : 'white',
  }

  const infoObjects = {
    'laser power': {
      label: 'laser power',
      text: `amplitude of the laser beam wave`,
    },
    'length jitter': {
      label: 'length jitter',
      text: `variation in distance between
      the mirrors based on incoherent noise`,
    },
    'cavity length': {
      label: 'cavity length',
      text: `distance between the mirrors`,
    },
  }

  const infoClickHandler = (label) => {
    setInfoObject(infoObjects[label])
    setIsOverlayHidden(false)
  }

  return (
    <MathJaxContext>
      <div className="App">
        {!isOverlayHidden && (
          <InfoOverlay
            rgb={wavelengthColor}
            hideOverlay={() => {
              setIsOverlayHidden(true)
            }}
            info={infoObject}
          />
        )}
        <div style={containerStyle} className="variable-wrapper">
          <Box
            label="laser power"
            rgb={wavelengthColor}
            hideCanvas={!showvisualizations}
            formula={`\\(P\\)`}
            min="0"
            max="100"
            step="1"
            unit="W"
            infoClick={infoClickHandler}
            value={laserpower}
            canvasplot={<Power power={laserpower} />}
            setF={(e) => setLaserpower(e.target.value)}
            showDetails={showdetails}
          />
          <Box
            label="cavity length"
            rgb={wavelengthColor}
            hideCanvas={!showvisualizations}
            min="1"
            max="1000"
            formula={`\\(L\\)`}
            step="1"
            unit="nm"
            value={cavitylength}
            canvasplot={<CavityLength cavitylength={cavitylength} />}
            setF={(e) => setCavitylength(e.target.value)}
            showDetails={showdetails}
            infoClick={infoClickHandler}
          />
          <JitterBox
            label="length jitter"
            isActive={isLengthJittering}
            setIsActive={setIsLengthJittering}
            setter={setCavitylength}
            hideCanvas={!showvisualizations}
            showDetails={showdetails}
            infoClick={infoClickHandler}
          />
          <Box
            label="wave length"
            rgb={wavelengthColor}
            hideCanvas={!showvisualizations}
            min="1"
            formula={`\\(\\lambda\\)`}
            max="1000"
            step="1"
            unit="nm"
            value={wavelength}
            canvasplot={<Wavelength wavelength={wavelength} />}
            setF={(e) => setWavelength(e.target.value)}
            showDetails={showdetails}
          />
          <Box
            label="frequency"
            rgb={wavelengthColor}
            hideCanvas={!showvisualizations}
            isResult
            formula={`\\(f = \\dfrac{c}{\\lambda}\\)`}
            unit="THz"
            value={Math.round((frequency / 1e12) * 100) / 100}
            canvasplot={<Wavelength wavelength={wavelength} />}
            showDetails={showdetails}
          />
          <Box
            label="reflectivity mirror 1"
            rgb={wavelengthColor}
            hideCanvas={!showvisualizations}
            formula={`\\(r_n\\)`}
            min="0.01"
            max="0.99"
            step="0.01"
            unit=""
            showDetails={showdetails}
            value={m1reflectivity}
            canvasplot={<Reflectivity reflectivity={m1reflectivity} />}
            setF={(e) => setM1reflectivity(e.target.value)}
          />
          <Box
            label="transmittance mirror 1"
            rgb={wavelengthColor}
            hideCanvas={!showvisualizations}
            isResult
            formula={`\\(t_n = \\sqrt{1 - r_n^2}\\)`}
            unit=""
            canvasplot={<Transmittance transmittance={m1transmittance} />}
            value={m1transmittance}
            showDetails={showdetails}
          />
          <Box
            label="reflectivity mirror 2"
            rgb={wavelengthColor}
            hideCanvas={!showvisualizations}
            min="0.01"
            max="0.99"
            step="0.01"
            formula={`\\(r_n\\)`}
            unit=""
            value={m2reflectivity}
            canvasplot={<Reflectivity reflectivity={m2reflectivity} />}
            setF={(e) => setM2reflectivity(e.target.value)}
            showDetails={showdetails}
          />
          <Box
            label="transmittance mirror 2"
            rgb={wavelengthColor}
            hideCanvas={!showvisualizations}
            isResult
            formula={`\\(t_n = \\sqrt{1 - r_n^2}\\)`}
            unit=""
            canvasplot={<Transmittance transmittance={m2transmittance} />}
            value={m2transmittance}
            showDetails={showdetails}
          />
          <Box
            label="angular wavenumber"
            rgb={wavelengthColor}
            hideCanvas={!showvisualizations}
            isResult
            formula={`\\(k = \\frac{2\\pi}{\\lambda}\\)`}
            unit=""
            value={wavenumber}
            showDetails={showdetails}
          />
          <Box
            label="phase shift (rad)"
            rgb={wavelengthColor}
            hideCanvas={!showvisualizations}
            isResult
            formula={`\\(\\phi = k L \\,\\, \\mathrm{mod}\\,\\, 2\\pi\\)`}
            unit="rad"
            value={phaseshift}
            canvasplot={<Phaseshift phaseshift={phaseshift} />}
            showDetails={showdetails}
          />
          <Box
            label="phase shift (deg)"
            rgb={wavelengthColor}
            hideCanvas={!showvisualizations}
            isResult
            formula={`\\(\\phi = k L \\,\\, \\mathrm{mod}\\,\\, 2\\pi\\)`}
            unit="deg"
            value={rad2deg(phaseshift)}
            canvasplot={<Phaseshift phaseshift={phaseshift} />}
            showDetails={showdetails}
          />
          <Box
            label="optical gain at ressonance"
            rgb={wavelengthColor}
            hideCanvas={!showvisualizations}
            formula={`\\(\\left|\\dfrac{E_\\mathrm{cavity}}{E_\\mathrm{laser}}\\right| = \\left|\\dfrac{t_1}{1 - r_1 r_2}\\right|\\)`}
            isResult
            canvasplot={
              <Gain power={laserpower} gain={opticalgainRessonance} />
            }
            unit=""
            value={opticalgainRessonance}
            showDetails={showdetails}
          />
          <Box
            label="current optical gain"
            rgb={wavelengthColor}
            hideCanvas={!showvisualizations}
            isResult
            unit=""
            formula={`\\(
              \\left|\\dfrac{E_\\mathrm{cavity}}{E_\\mathrm{laser}}\\right| = \\left|\\dfrac{t_1}{1 - r_1 r_2 e^{2ikL}}\\right|
              \\)`}
            canvasplot={<Gain power={laserpower} gain={opticalgain} />}
            value={opticalgain}
            showDetails={showdetails}
          />
          <Box
            label="reflected gain"
            rgb={wavelengthColor}
            hideCanvas={!showvisualizations}
            isResult
            unit=""
            formula={`\\(
              \\left|\\dfrac{E_\\mathrm{reflected}}{E_\\mathrm{laser}}\\right| = \\left|\\dfrac{-r_1 + r_2e^{2ikL}}{1 - r_1 r_2 e^{2ikL}}\\right|
              \\)`}
            canvasplot={<Gain power={laserpower} gain={reflectedgain} />}
            value={reflectedgain}
            showDetails={showdetails}
          />
          <Box
            label="transmitted gain"
            rgb={wavelengthColor}
            formula={`\\(
              \\left|\\dfrac{E_\\mathrm{transmitted}}{E_\\mathrm{laser}}\\right| = \\left|\\dfrac{t_1 t_2 e^{ikL}}{1 - r_1 r_2 e^{2ikL}}\\right|
              \\)`}
            hideCanvas={!showvisualizations}
            isResult
            unit=""
            canvasplot={<Gain power={laserpower} gain={transmittedgain} />}
            value={transmittedgain}
            showDetails={showdetails}
          />
          <Box
            label="cavity finesse"
            rgb={wavelengthColor}
            formula={`\\(
              \\mathcal{F} = \\dfrac{\\pi}{2 \\arcsin{\\left( \\dfrac{1 - r_1 r_2}{2 \\sqrt{r_1 r_2}}\\right)}}
              \\)`}
            hideCanvas={!showvisualizations}
            isResult
            unit=""
            value={finesse}
            showDetails={showdetails}
          />
        </div>
        <div
          style={{ display: 'flex', flexFlow: 'row wrap' }}
          className="controls"
        >
          <button
            style={btnStyle}
            onClick={() => setShowvisualizations((v) => !v)}
          >
            {showvisualizations ? 'Hide' : 'Show'} Visualizations
          </button>
          <button
            style={btnStyle}
            onClick={() => {
              setCavitylength(wavelength)
            }}
          >
            LOCK CAVITY
          </button>
          <button style={btnStyle} onClick={() => setShowdetails((v) => !v)}>
            {showdetails ? 'Hide' : 'Show'} Formulae, Unit Signs & Infos
          </button>
        </div>

        <div style={statusStyle} className={`${isLocked && 'locked'}`}>
          Cavity {isLocked ? 'is locked' : 'is out of phase'}
          {isMaximallyOutOfPhase && ' (maximally)'}
        </div>
        <div style={bottomStyle}>
          <button
            style={collapsBtnStyle}
            onClick={() => setIsBottomCollapsed((x) => !x)}
            className="collapse-button"
          >
            {isBottomCollapsed ? 'Show' : 'Hide'}
          </button>
        </div>
      </div>
    </MathJaxContext>
  )
}

export default App

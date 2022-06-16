import { MathJax } from 'better-react-mathjax'
import Formula from './Formula.js'
import { rgb2string } from './Visualizations'

const Box = ({
  min = '0',
  max = '200',
  step = '0.1',
  label = 'defaultLabel',
  setF = { function() {} },
  unit = 'AU',
  value = '0',
  hideCanvas = false,
  formula = null,
  isResult = false,
  showFormula = false,
  rgb = { r: 255, g: 255, b: 255 },
  children,
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
  ),
}) => {
  //TODO Box with Canvas for same layout

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

  const formulaStyle = {
    fontSize: '85%',
  }

  return (
    <div className="box" style={stylingBox}>
      <label style={{ color: 'white', textAlign: 'center', width: '100%' }}>
        <h1 style={{ marginRight: '1rem' }}>{label}</h1>
        <span className="formula" style={formulaStyle}>
          {formula && showFormula && <Formula formula={formula}/>}
        </span>
        <span>
          {isResult ? (
            <input type="number" disabled value={value} />
          ) : (
            <input
              id="bla"
              type="number"
              min={min}
              max={max}
              step={step}
              onChange={setF}
              value={value}
            />
          )}

          {unit}
        </span>
      </label>
      {!hideCanvas && canvasplot}
      {!isResult && (
        <input
          type="range"
          value={value}
          step={step}
          min={min}
          max={max}
          onChange={setF}
        />
      )}
      {children}
    </div>
  )
}

export default Box

/**
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
W{showvisualizations && <Power power={laserpower} />}
</label>
 */

/* 
label>
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
          */

/*
          <label>
            <a href="https://en.wikipedia.org/wiki/Wavelength">Wavelength</a>
            {showformulas && <MathJax>{`\\(\\lambda\\)`}</MathJax>}
            <input
              type="number"
              min="0"
              max="1000"
              step="1"
              onChange={(e) => setWavelength(e.target.value)}
              value={wavelength}
            />
            nm
            {showvisualizations && <Wavelength wavelength={wavelength} />}
          </label>
          */
/*
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
          */
/*
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
          </label>*/

/*

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

        <hr />*/

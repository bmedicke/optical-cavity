import Formula from './Formula.js'
import styles from './Box.module.scss'
import { rgb2string } from './Visualizations.js'

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

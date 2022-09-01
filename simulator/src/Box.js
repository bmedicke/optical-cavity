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
  showDetails = false,
  rgb = { r: 255, g: 255, b: 255 },
  infoClick = () => console.log('no info text provided'),
  canvasplot = (
    <canvas
      className={styles.visualization}
      style={{ backgroundColor: `${rgb2string(rgb, 0.2)}` }}
    ></canvas>
  ),
}) => {
  return (
    <div
      className={styles.box}
      style={hideCanvas ? { minHeight: '140px' } : { minHeight: '350px' }}
    >
      <div className={styles.preCanvas}>
        <label htmlFor={'infoTODO'}>
          <h1>{label}</h1>
        </label>
        <span className={styles.formula}>
          {formula && showDetails && <Formula formula={formula} />}
        </span>
        <span>
          {isResult ? (
            <input type="number" disabled value={value} />
          ) : (
            <input
              id="infoTODO"
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
      </div>
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
      {showDetails && (
        <button onClick={() => infoClick(label)} className={styles.infoBtn}>
          i
        </button>
      )}
    </div>
  )
}

export default Box

import Formula from './Formula.js'
import style from './InfoOverlay.module.scss'
import { rgb2string } from './Visualizations.js'

const InfoOverlay = ({
  children,
  info = '',
  label = 'info overlay',
  rgb = { r: 255, g: 255, b: 255 },
  closeHandler = () => {},
}) => {
  const stylingInfoOverlay = { border: `1px solid ${rgb2string(rgb, 0.5)}` }
  const closeButton = { border: `1px solid ${rgb2string(rgb, 0.2)}` }

  return (
    <div className={style.infoOverlay} style={stylingInfoOverlay}>
      <button
        className={style.closeButton}
        style={closeButton}
        onClick={closeHandler}
      >
        x
      </button>
      <h1>{label}</h1>
      <span className="details">
        <Formula formula={info} />
      </span>
      {children}
    </div>
  )
}

export default InfoOverlay

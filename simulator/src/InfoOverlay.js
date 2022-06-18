import { MathJax } from 'better-react-mathjax'

const InfoOverlay = ({
  children,
  info = 'lorem',
  label = 'info overlay',
  rgb = { r: 255, g: 255, b: 255 },
}) => {
  const stylingInfoOverlay = {
    background: 'red',
    justifyContent: 'space-evenly',
    position: 'absolute',
    zIndex: '1',
    left: '10%',
    top: '10%',
    width: '80%',
    height: '80%',
  }

  return (
    <div className="infoOverlay" style={stylingInfoOverlay}>
      <h1 style={{ marginRight: '1rem' }}>{label}</h1>
      <span className="details">
        <MathJax>{info}</MathJax>
      </span>
      {children}
    </div>
  )
}

export default InfoOverlay

import styles from './Visualizations.module.scss'
import { useEffect, useRef } from 'react'

const wavelength2rgb = (wl) => {
  var color
  const s = wl < 420 ? 0.3 + (0.7 * (wl - 380.0)) / (420.0 - 380.0) : 1.0
  if (wl >= 380 && wl < 440) {
    color = [(s * -1 * (wl - 440)) / (440 - 380), 0, s]
  } else if (wl >= 440 && wl < 490) {
    color = [0, (wl - 440) / (490 - 440), 1]
  } else if (wl >= 490 && wl < 510) {
    color = [0, 1, (-1 * (wl - 510)) / (510 - 490)]
  } else if (wl >= 510 && wl < 580) {
    color = [(wl - 510) / (580 - 510), 1.0, 0.0]
  } else if (wl >= 580 && wl < 645) {
    color = [1, (-1 * (wl - 645)) / (645 - 580), 0]
  } else if (wl >= 645 && wl < 750) {
    color = [0.3 + (0.7 * (750 - wl)) / (750 - 700), 0, 0]
  } else {
    color = [1, 1, 1]
  }
  const gamma = 1
  const [r, g, b] = [color[0] * gamma, color[1] * gamma, color[2] * gamma]
  return {
    r: Math.pow(r, gamma) * 255,
    g: Math.pow(g, gamma) * 255,
    b: Math.pow(b, gamma) * 255,
  }
}

const rgb2string = (rgb, alpha = 1.0) => {
  return `rgba(${rgb.r},${rgb.g},${rgb.b}, ${alpha})`
}

function draw_sine(canvas, context, scale, phaseshift = 0) {
  context.beginPath()

  var x = 0
  for (var i = 0; i < canvas.width; i++) {
    const y =
      ((Math.sin((x / canvas.width) * 2 * Math.PI + phaseshift) *
        (canvas.height / 2)) /
        (100 + context.lineWidth * 4)) *
        scale +
      canvas.height / 2
    x = i
    context.lineTo(x, y)
  }

  context.stroke()
}

const Jitter = (props) => {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const context = canvas.getContext('2d')
    const [w, h] = [canvas.width, canvas.height]
    const heightscale = canvas.height / 5
    const widthscale = props.datapoints - 1

    context.clearRect(0, 0, canvas.width, canvas.height)

    context.beginPath()
    context.lineWidth = 2
    context.strokeStyle = 'green'
    context.moveTo(0, h / 2)
    props.jitter.forEach((jitter, i) => {
      context.lineTo((w / widthscale) * i, h / 2 + jitter * heightscale)
    })
    context.stroke()

    context.fillStyle = 'white'
    context.font = `${Math.round(canvas.width / 13)}px Lato`
    context.fillText(' 0', w / 2, h / 2 + 5)
    context.fillText('+1', w / 2, h / 4)
    context.fillText('-1', w / 2, (h / 4) * 3 + 10)
  }, [JSON.stringify(props.jitter)])
  // TODO write custom deep compare function?

  return (
    <div>
      <canvas
        width={200}
        height={200}
        ref={ref}
        className={styles.small_visualization}
      ></canvas>
    </div>
  )
}

const Reflectivity = (props) => {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const context = canvas.getContext('2d')
    const [w, h] = [canvas.width, canvas.height]

    context.clearRect(0, 0, canvas.width, canvas.height)

    // inbound ray:
    context.beginPath()
    context.lineWidth = 10
    context.strokeStyle = 'green'
    context.moveTo(w / 10, h / 3)
    context.lineTo(w / 2, h / 2)
    context.stroke()

    // outbound ray:
    context.beginPath()
    context.lineWidth = 10 * props.reflectivity
    context.strokeStyle = 'red'
    context.moveTo(w / 2, h / 2)
    context.lineTo(w / 9, (h / 3) * 2)
    context.stroke()

    // surface:
    context.beginPath()
    context.lineWidth = 4
    context.strokeStyle = 'white'
    context.moveTo(w / 2, h / 10)
    context.lineTo(w / 2, (h / 10) * 9)
    context.stroke()
  }, [props.reflectivity])
  return (
    <div>
      <canvas
        width={200}
        height={200}
        ref={ref}
        className={styles.small_visualization}
      ></canvas>
    </div>
  )
}

const Transmittance = (props) => {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const context = canvas.getContext('2d')
    const [w, h] = [canvas.width, canvas.height]

    context.clearRect(0, 0, canvas.width, canvas.height)

    // inbound ray:
    context.beginPath()
    context.lineWidth = 10
    context.strokeStyle = 'green'
    context.moveTo(w / 10, h / 3)
    context.lineTo(w / 2, h / 2)
    context.stroke()

    // outbound ray:
    context.beginPath()
    context.lineWidth = 10 * props.transmittance
    context.strokeStyle = 'red'
    context.moveTo(w / 2, h / 2)
    context.lineTo((w / 10) * 9, (h / 3) * 2)
    context.stroke()

    // surface:
    context.beginPath()
    context.lineWidth = 4
    context.strokeStyle = 'white'
    context.moveTo(w / 2, h / 10)
    context.lineTo(w / 2, (h / 10) * 9)
    context.stroke()
  }, [props.transmittance])

  return (
    <div>
      <canvas
        width={200}
        height={200}
        ref={ref}
        className={styles.small_visualization}
      ></canvas>
    </div>
  )
}

const CavityLength = (props) => {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const context = canvas.getContext('2d')
    const [w, h] = [canvas.width, canvas.height]

    context.clearRect(0, 0, canvas.width, canvas.height)

    // left mirror surface:
    context.beginPath()
    context.lineWidth = 4
    context.strokeStyle = 'white'
    context.moveTo(w / 10, h / 10)
    context.lineTo(w / 10, (h / 10) * 9)

    // right mirror surface:
    const offset = (props.cavitylength / 1000) * ((w / 10) * 8)
    context.moveTo(w / 10 + offset, h / 10)
    context.lineTo(w / 10 + offset, (h / 10) * 9)
    context.stroke()
  }, [props.cavitylength])

  return (
    <div>
      <canvas
        width={200}
        height={200}
        ref={ref}
        className={styles.small_visualization}
      ></canvas>
    </div>
  )
}

const Power = (props) => {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)

    context.lineWidth = 2
    context.strokeStyle = 'green'
    draw_sine(canvas, context, props.power)
  }, [props.power])

  return (
    <div>
      <canvas
        width={200}
        height={200}
        ref={ref}
        className={styles.small_visualization}
      ></canvas>
    </div>
  )
}

const Wavelength = (props) => {
  const ref = useRef(null)

  useEffect(() => {
    var canvas = ref.current
    var context = canvas.getContext('2d')
    const scaleWavelength = 632
    context.clearRect(0, 0, canvas.width, canvas.height)

    context.fillStyle = 'white'
    context.font = `${Math.round(canvas.width / 13)}px Lato`
    var text = ''

    if (props.wavelength < 2) {
      text = 'x-ray'
    } else if (props.wavelength < 380) {
      text = 'ultraviolet'
    } else if (props.wavelength < 750) {
      text = 'visible'
    } else {
      text = 'infrared'
    }

    context.fillText(text, (canvas.width / 5) * 3, (canvas.height / 13) * 12)

    context.lineWidth = 2
    context.strokeStyle = rgb2string(wavelength2rgb(props.wavelength))

    var frequency = (1 / props.wavelength) * scaleWavelength
    context.beginPath()

    var x = 0
    for (var i = 0; i < canvas.width; i++) {
      const y =
        ((Math.sin((x / canvas.width) * frequency * 2 * Math.PI) *
          (canvas.height / 2)) /
          (100 + context.lineWidth * 4)) *
          50 +
        canvas.height / 2
      x = i
      context.lineTo(x, y)
    }

    context.stroke()
  }, [props.wavelength])

  return (
    <div>
      <canvas
        width={200}
        height={200}
        ref={ref}
        className={styles.small_visualization}
      ></canvas>
    </div>
  )
}

const Gain = (props) => {
  const ref = useRef(null)

  useEffect(() => {
    var canvas = ref.current
    var context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)

    context.lineWidth = 2

    context.strokeStyle = 'green'
    draw_sine(canvas, context, props.power)
    context.strokeStyle = 'red'
    draw_sine(canvas, context, props.gain * props.power)
  }, [props.gain, props.power])
  return (
    <div>
      <canvas
        width={200}
        height={200}
        ref={ref}
        className={styles.small_visualization}
      ></canvas>
    </div>
  )
}

const Phaseshift = (props) => {
  const ref = useRef(null)

  useEffect(() => {
    var canvas = ref.current
    var context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)

    context.lineWidth = 2

    context.strokeStyle = 'green'
    draw_sine(canvas, context, 50, 0)

    context.strokeStyle = 'red'
    draw_sine(canvas, context, 50, props.phaseshift)
  }, [props.phaseshift])

  return (
    <div>
      <canvas
        width={200}
        height={200}
        ref={ref}
        className={styles.small_visualization}
      ></canvas>
    </div>
  )
}

export {
  CavityLength,
  Gain,
  Jitter,
  Phaseshift,
  Power,
  Reflectivity,
  Transmittance,
  Wavelength,
  draw_sine,
  rgb2string,
  wavelength2rgb,
}

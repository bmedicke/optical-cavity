import styles from './Visualizations.module.scss'
import { useEffect, useRef } from 'react'

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
    context.moveTo(x, y)
    x = i
    context.lineTo(x, y)
  }

  context.stroke()
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
        ref={ref}
        id="power"
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
        ref={ref}
        id="gain"
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
        ref={ref}
        id="phaseshift"
        className={styles.small_visualization}
      ></canvas>
    </div>
  )
}
export { Power, Phaseshift, Gain }

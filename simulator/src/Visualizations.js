import styles from './Visualizations.module.scss'
import { useEffect } from 'react'

// TODO: use ref() instead of getelementbyid.

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
  useEffect(() => {
    var canvas = document.getElementById('power')
    var context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)

    context.lineWidth = 2
    context.strokeStyle = 'green'
    draw_sine(canvas, context, props.power)
  }, [props.power])

  return (
    <div>
      <canvas id="power" className={styles.small_visualization}></canvas>
    </div>
  )
}

const Gain = (props) => {
  useEffect(() => {
    var canvas = document.getElementById('gain')
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
      <canvas id="gain" className={styles.small_visualization}></canvas>
    </div>
  )
}

const Phaseshift = (props) => {
  useEffect(() => {
    var canvas = document.getElementById('phaseshift')
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
      <canvas id="phaseshift" className={styles.small_visualization}></canvas>
    </div>
  )
}
export { Power, Phaseshift, Gain }

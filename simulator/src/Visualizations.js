import styles from './Visualizations.module.scss'
import { useEffect } from 'react'

const Power = (props) => {
  useEffect(() => {
    var canvas = document.getElementById('power')
    var context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)

    context.lineWidth = 2
    context.strokeStyle = 'green'

    var scale = props.watts
    var x = 0
    var y = canvas.height / 2

    context.beginPath()
    for (var i = 0; i < canvas.width; i++) {
      context.moveTo(x, y)
      x = i
      y =
        ((Math.sin((x / canvas.width) * 2 * Math.PI) * (canvas.height / 2)) /
          (100 + context.lineWidth * 4)) *
          scale +
        canvas.height / 2
      context.lineTo(x, y)
    }
    context.stroke()
  }, [props.watts])

  return (
    <div>
      <canvas
        id="power"
        className={styles.power}
      ></canvas>
    </div>
  )
}

export { Power }

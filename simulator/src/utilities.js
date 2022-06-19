import { useEffect, useRef } from 'react'

const deg2rad = (degrees) => {
  return degrees * (Math.PI / 180)
}
const rad2deg = (rad) => {
  return rad * (180 / Math.PI)
}

function useInterval(callback, delay) {
  // https://overreacted.io/making-setinterval-declarative-with-react-hooks/
  const savedCallback = useRef()
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export { deg2rad, rad2deg, useInterval }

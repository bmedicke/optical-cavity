import { min } from 'mathjs'
import React, { memo, useEffect, useState } from 'react'

//props: minimum, maximum, setter, delay, step}
export const withSweep = (BaseComponent) => (props) => {
  const [isIncreasing, setIsIncreasing] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      if (props.isActive) {
        props.setter((x) => parseInt(x) + 1)
      }
    }, 500)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <BaseComponent {...props} isResult isIncreasing={isIncreasing}>
        <button onMouseUp={() => props.setIsActive((x) => !x)}>
          {props.isActive ? 'Stop Sweep' : 'Start Sweep'}
        </button>
    </BaseComponent>
  )
}

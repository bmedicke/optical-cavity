import React, { useEffect, useState } from 'react'

const withSweep = (BaseComponent) => (props) => {
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

export { withSweep }

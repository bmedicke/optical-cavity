import React, { useEffect } from 'react'

export const withJitter = (BaseComponent) => (props) => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (props.isActive) {
        props.setter((x) => parseInt(x) + Math.floor(Math.random() * 3) - 1)
      }
    }, 500)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <BaseComponent {...props} isResult>
      <button onMouseUp={() => props.setIsActive((x) => !x)}>
        {props.isActive ? 'Stop Jitter' : 'Start Jitter'}
      </button>
    </BaseComponent>
  )
}

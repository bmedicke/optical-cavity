import { MathJax } from 'better-react-mathjax'
import React, { memo} from 'react'

const Formula = ({formula}) => {

    console.log("Formula rendered...")
  return (
    <MathJax>{formula ? formula : ""}</MathJax>
  )
}

export default memo(Formula)

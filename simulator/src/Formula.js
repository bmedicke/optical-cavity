import { MathJax } from 'better-react-mathjax'
import React, { useState, memo} from 'react'

const Formula = ({formula}) => {

    console.log("Formula rendered...")
  return (
    <MathJax>{formula ? formula : ""}</MathJax>
  )
}

export default memo(Formula)
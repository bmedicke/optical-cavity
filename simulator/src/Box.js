import { useState } from "react";
import { Power } from './Visualizations.js'

const Box = ({
  min = "0",
  max = "200",
  step = "0.1",
  label = "defaultLabel",
  setF,
  unit="AU",
  value
}) => {

  let size = "500px";
  const stylingBox = {
    background: "#222",
    display: "inline-flex",
    flexDirection: "column",
    margin: "0 2.5px",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: size,
    minWidth: "300px",
    height: "400px"
  };

  return (
    <div className="box" style={stylingBox}>
      <label style={{ color: "white" }}>
        <span style={{ marginRight: "1rem" }}>{label}</span>
        <span>
        <input
          id="bla"
          type="number"
          min={min}
          max={max}
          step={step}
          onChange={setF}
          value={value}
        />
       {unit}</span>
       
      </label>
     <Power power={value}/>
      <input
        type="range"
        value={value}
        step={step}
        min={min}
        max={max}
        onChange={setF}
      />      

    </div>
  );
};

export default Box;

/**
<label>
Laser Power
{showformulas && <MathJax>{`\\(P\\)`}</MathJax>}
<input
  type="number"
  min="0"
  max="100"
  step="1"
  onChange={(e) => setLaserpower(e.target.value)}
  value={laserpower}
/>
W{showvisualizations && <Power power={laserpower} />}
</label>
 */

/* 
label>
            Cavity Length
            {showformulas && <MathJax>{`\\(L\\)`}</MathJax>}
            <input
              type="number"
              value={cavitylength}
              min="0"
              max="100000"
              onChange={(e) => setCavitylength(e.target.value)}
            />
            nm
          </label>
          */
import { useEffect, useState } from "react";
import { Power } from './Visualizations.js'

const Box = ({
  min = "0",
  max = "200",
  step = "0.1",
  label = "defaultLabel",
  setF={function(){}},
  unit="AU",
  value,
  isResult=false,
  canvasplot=<canvas style={{backgroundColor: "red", height: "200px", width: "200px"}}></canvas>
}) => {

  let size = "500px";
  //TODO Box with Canvas for same layout
  const stylingBox = {
    background: "#222",
    display: "inline-flex",
    flexDirection: "column",
    margin: "0 2.5px",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: size,
    minWidth: "300px",
    alignItems: "center"
    //height: "400px"
  };

  useEffect(() => {console.log(isResult)},[isResult])
  return (
    <div className="box" style={stylingBox}>
      <label style={{ color: "white", textAlign: "center", width: "100%"}}>
        <h1 style={{ marginRight: "1rem" }}>{label}</h1>
        <span>
       {isResult ? <input type="number" disabled value={value} />  : <input
          id="bla"
          type="number"
          min={min}
          max={max}
          step={step}
          onChange={setF}
          value={value}
        />}

       {unit}</span>
       
      </label>
    {canvasplot}
      {!isResult && <input
        type="range"
        value={value}
        step={step}
        min={min}
        max={max}
        onChange={setF}
      />  }    

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

          /*
          <label>
            <a href="https://en.wikipedia.org/wiki/Wavelength">Wavelength</a>
            {showformulas && <MathJax>{`\\(\\lambda\\)`}</MathJax>}
            <input
              type="number"
              min="0"
              max="1000"
              step="1"
              onChange={(e) => setWavelength(e.target.value)}
              value={wavelength}
            />
            nm
            {showvisualizations && <Wavelength wavelength={wavelength} />}
          </label>
          */
         /*
          <label>
            <a href="https://en.wikipedia.org/wiki/Reflectance#Reflectivity">
              Reflectivity
            </a>
            {showformulas && <MathJax>{`\\(r_n\\)`}</MathJax>}
            Mirror 1 (fixed)
            <input
              type="number"
              value={m1reflectivity}
              min="0"
              max="1"
              step="0.01"
              onChange={(e) => setM1reflectivity(e.target.value)}
            />
          </label>

          <label>
            Mirror 2 (piezo)
            <input
              type="number"
              value={m2reflectivity}
              min="0"
              max="1"
              step="0.01"
              onChange={(e) => setM2reflectivity(e.target.value)}
            />
          </label>
          */
         /*
         <label>
            <a href="https://en.wikipedia.org/wiki/Wavenumber">
              Angular Wave Number
            </a>
            {showformulas && (
              <MathJax>
                {`\\(
            k = \\frac{2\\pi}{\\lambda}
            \\)`}
              </MathJax>
            )}
            <input type="text" value={wavenumber} disabled />
          </label>*/
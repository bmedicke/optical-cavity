import { createContext, useMemo, useState } from 'react'

export const CavityContext = createContext({})

export const CavityProvider = (props) => {
  // configurable cavity parameters:
  const [laserpower, setLaserpower] = useState(40) // in W.
  const [m1reflectivity, setM1reflectivity] = useState(0.9)
  const [m2reflectivity, setM2reflectivity] = useState(0.9)
  const [wavelength, setWavelength] = useState(200) // in nm.
  const [wavelengthColor, setWavelengthColor] = useState({})

  // calculated variables:
  const [caviLength, setCaviLength] = useState(150.0) // rename.
  const [epow2ikl, setEpow2ikl] = useState(0) // e^(i*k*l).
  const [finesse, setFinesse] = useState(0)
  const [frequency, setFrequency] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [isMaximallyOutOfPhase, setIsMaximallyOutOfPhase] = useState(false)
  const [m1transmittance, setM1transmittance] = useState(0)
  const [m2transmittance, setM2transmittance] = useState(0)
  const [opticalgain, setOpticalgain] = useState(0)
  const [opticalgainRessonance, setOpticalgainRessonance] = useState(0)
  const [phaseshift, setPhaseshift] = useState(0)
  const [reflectedgain, setReflectedgain] = useState(0)
  const [transmittedgain, setTransmittedgain] = useState(0)
  const [wavenumber, setWavenumber] = useState(0)

  // ui controls:
  const [is3D, setIs3D] = useState(true)
  const [isBottomCollapsed, setIsBottomCollapsed] = useState(true)
  const [isOverlayHidden, setIsOverlayHidden] = useState(true)
  const [infoObject, setInfoObject] = useState({})
  const [showdetails, setShowdetails] = useState(false)
  const [showvisualizations, setShowvisualizations] = useState(true)

  const value = useMemo(
    () => ({
      caviLength,
      setCaviLength,
      is3D,
      setIs3D,
      wavelengthColor,
      setWavelengthColor,
      laserpower,
      setLaserpower,
      m1reflectivity,
      setM1reflectivity,
      m2reflectivity,
      setM2reflectivity,
      wavelength,
      setWavelength,
      epow2ikl,
      setEpow2ikl,
      finesse,
      setFinesse,
      frequency,
      setFrequency,
      isLocked,
      setIsLocked,
      isMaximallyOutOfPhase,
      setIsMaximallyOutOfPhase,
      m1transmittance,
      setM1transmittance,
      m2transmittance,
      setM2transmittance,
      opticalgain,
      setOpticalgain,
      opticalgainRessonance,
      setOpticalgainRessonance,
      phaseshift,
      setPhaseshift,
      reflectedgain,
      setReflectedgain,
      transmittedgain,
      setTransmittedgain,
      wavenumber,
      setWavenumber,
      isBottomCollapsed,
      setIsBottomCollapsed,
      isOverlayHidden,
      setIsOverlayHidden,
      infoObject,
      setInfoObject,
      showdetails,
      setShowdetails,
      showvisualizations,
      setShowvisualizations,
    }),
    [
      caviLength,
      is3D,
      wavelengthColor,
      laserpower,
      m1reflectivity,
      m2reflectivity,
      wavelength,
      epow2ikl,
      finesse,
      frequency,
      isLocked,
      isMaximallyOutOfPhase,
      m1transmittance,
      m2transmittance,
      opticalgain,
      opticalgainRessonance,
      phaseshift,
      reflectedgain,
      transmittedgain,
      wavenumber,
      isBottomCollapsed,
      isOverlayHidden,
      infoObject,
      showdetails,
      showvisualizations,
    ]
  )
  return <CavityContext.Provider value={value} {...props} />
}

export default CavityProvider

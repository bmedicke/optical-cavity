import { createContext, useMemo, useState } from 'react'

export const CavityContext = createContext({})

export const CavityProvider = (props) => {
  const [caviLength, setCaviLength] = useState(150.0)
  const [is3D, setIs3D] = useState(false)

  const value = useMemo(
    () => ({
      caviLength,
      setCaviLength,
      is3D,
      setIs3D,
    }),
    [caviLength]
  )
  return <CavityContext.Provider value={value} {...props} />
}

export default CavityProvider

import { createContext, useMemo, useState } from 'react'

export const CavityContext = createContext({})

export const CavityProvider = (props) => {
  const [caviLength, setCaviLength] = useState(150.0)

  const value = useMemo(
    () => ({
      caviLength,
      setCaviLength,
    }),
    [caviLength]
  )
  return <CavityContext.Provider value={value} {...props} />
}

export default CavityProvider

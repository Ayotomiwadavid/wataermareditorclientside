import React, { createContext, useContext, useState } from 'react'

const appContext = createContext();

export const useAppContext = () => {
    return useContext(appContext);
}

const Controller = ({children}) => {
    const [editorLocation, setEditorLocation] = useState(null);

    const handleEditorLocation = () => {};

    const contextValues = {
        editorLocation,
        setEditorLocation
    }

  return (
    <appContext.Provider value={contextValues}>
      {children}
    </appContext.Provider>
  )
}

export default Controller
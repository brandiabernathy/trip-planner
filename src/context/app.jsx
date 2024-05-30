import { createContext, useContext, useState } from "react";

const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
    const [authed, setAuthed] = useState(null);

    return (
        <AppContext.Provider value={{ authed, setAuthed }}>
            {children}
        </AppContext.Provider>
    )
};

export const useAppContext = () => useContext(AppContext);
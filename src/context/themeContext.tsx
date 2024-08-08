import React, { createContext, ReactNode , useContext, useState, useEffect} from "react";
import { themes,Theme,ThemeProperties } from "../types/theme";

interface ThemeContextProps {
    theme: Theme;
    setTheme:(theme:Theme)=>void;
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const today = (new Date()).getMonth() + 1;
let themeDate:Theme;

if (1<=today && today<3 || today ===12){
    themeDate = 'winter';
}
else if(3<=today && today<6) {
    themeDate = 'spring';
}
else if(6<=today && today<9) {
    themeDate = 'summer';
}
else {
    themeDate = 'autumn';
};

export const ThemeProvider: React.FC<{ children:ReactNode }> = ({children}) => {
    
    const [theme,setTheme] = useState<Theme>(themeDate);

    useEffect(() => {
        const themeProperties = themes[theme];
        Object.keys(themeProperties).forEach((key) => {
            const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
            document.documentElement.style.setProperty(cssVar, themeProperties[key as keyof ThemeProperties]);
        });
    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme,setTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
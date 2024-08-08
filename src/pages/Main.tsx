import { Dashboard } from "../components/dashboard";
import { useTheme } from "../context/themeContext";
import { themes } from "../types/theme";

export function Main() {
    const {theme,setTheme} = useTheme();
    const currTheme = themes[theme];    

    return(
        <main style={{backgroundColor:''}}>
            <Dashboard></Dashboard>
        </main>
    );
}
import { Main } from './pages/Main';
import './App.css';
import { ThemeProvider } from './context/themeContext';

function App() {
  return (
    <ThemeProvider>
      <div className='background'>
        <Main></Main>
      </div>
    </ThemeProvider>
  );
}

export default App;

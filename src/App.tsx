import { Main } from './pages/Main';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Locations } from './pages/Locations';
import { Map } from './pages/Map';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>}></Route>
          <Route path='/mapa' element={<Map/>}></Route>
          <Route path='/mista' element={<Locations/>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

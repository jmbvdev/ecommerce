import { useSelector } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoadingScreen from './components/LoadingScreen';
import NavBar from './components/NavBar';

import Home from './pages/Home';
import ProductsDetail from './pages/ProductsDetail';
import Purchases from './pages/Purchases';



function App() {

const isLoading= useSelector(state=>state.isLoading)
  return (
    <HashRouter>
      {isLoading&& <LoadingScreen/>}
      <NavBar/>
     
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products/:id' element={<ProductsDetail/>}/>
        <Route path='/purchases' element={<Purchases/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;

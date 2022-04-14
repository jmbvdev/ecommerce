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
      <footer>
        <div className='copyright'>© Juan Manuel Blanco 2022</div>
        <div className='social-network'>
          <a href="https://www.linkedin.com/in/juan-manuel-blanco-vargas-646a46226/">
             <i className="fa-brands fa-linkedin-in"></i>
          </a>
          <a href="https://twitter.com/juamnvb">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="https://github.com/jmbvdev">
          <i className="fa-brands fa-github"></i>
          </a>
        </div>
      </footer>
    </HashRouter>
  );
}

export default App;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCartThunk, loginThunk } from '../redux/actions';
import "../styles/nav.css"
import Cart from './Cart';

const NavBar = () => {

    const [isLoginOpen, setIsLoginOpen]= useState(false)
    const[email,setEmail]= useState("")
    const[password, setPassword]=useState("")
    const[loginError, setLoginError]= useState("")
    const [isCartOpen, setIsCartOpen]= useState(false)
    const dispatch= useDispatch()
    const navigate= useNavigate()

  

    const login=e=>{
        e.preventDefault()
        const credentials={email,password}
        dispatch(loginThunk(credentials))
        .then(res=>{
            localStorage.setItem("token",res.data.data.token)
            setLoginError("")
            setIsLoginOpen(false)
        })
        .catch(error=>{
            setLoginError(error.response.data.message)
        })
    }

    const openCart =()=>{
        setIsCartOpen(!isCartOpen)
        dispatch(getCartThunk())
    }


    return (
        <div >
            <nav className='navbar'>
                <div className='nav-title'>
                    <strong onClick={()=>navigate("/")}> e-commerse</strong>
                </div>

                <div className='nav-buttons'>
                    <button onClick={()=>setIsLoginOpen(!isLoginOpen)}><i className="fa-solid fa-user"></i></button>
                    <button onClick={()=>navigate("/purchases")}><i className="fa-solid fa-basket-shopping"></i></button>
                    <button onClick={openCart}><i className="fa-solid fa-cart-shopping"></i></button>
                </div>
            </nav>

            <form onSubmit={login} className={`login ${isLoginOpen? "open": ""}`} >
                <div className='test-data'>
                    <strong>test data</strong>
                    <div className='field'>
                       <i class="fa-solid fa-envelope"></i>
                       <p>john@gmail.com</p>
                    </div>
                    <div className='field'>
                    <i class="fa-solid fa-lock"></i>
                    <p>john1234</p>

                    </div>

                </div>

                {
                    localStorage.getItem("token")? (
                    <button onClick={()=>localStorage.setItem("token", "")} type="button">
                        Log out
                    </button>
                    ):(
                        <>
                        <div className='input-login'>
                            <label htmlFor="email">Email</label>
                            <input
                            type="email"
                            onChange={e=>setEmail(e.target.value)}
                            value={email}
                            />

                        </div>
                        <div className='input-login'>
                            <label htmlFor="password">Password</label>
                            <input
                            type="password"
                            onChange={e=>setPassword(e.target.value)}
                            value={password}
                            />

                        </div>
        
                        <p>{loginError}</p>
                
                        <button className='login-submit'>Submit</button>
                        </>

                    )
                }
            </form>

            <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}/>

        </div>
    );
};

export default NavBar;
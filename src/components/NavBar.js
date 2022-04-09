import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
        <div className='navbar'>
            <nav>
                <strong>Products App</strong>
                <button onClick={()=>setIsLoginOpen(!isLoginOpen)}>Login</button>
                <button onClick={openCart}>Cart</button>
            </nav>

            <form onSubmit={login} className={`login ${isLoginOpen? "open": ""}`} >

                {
                    localStorage.getItem("token")? (
                    <button onClick={()=>localStorage.setItem("token", "")} type="button">
                        Log out
                    </button>
                    ):(
                        <>
                        <input
                        type="email"
                        placeholder='email'
                        onChange={e=>setEmail(e.target.value)}
                        value={email}
                        />
        
                        <input
                        type="password"
                        placeholder='password'
                        onChange={e=>setPassword(e.target.value)}
                        value={password}
                        />
                        <p>{loginError}</p>
                
                        <button>Submit</button>
                        </>

                    )
                }
            </form>

            <Cart isCartOpen={isCartOpen}/>

        </div>
    );
};

export default NavBar;
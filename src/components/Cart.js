import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkProductThunk, deleteProductThunk } from '../redux/actions';
import "../styles/cart.css"

const Cart = ({isCartOpen, setIsCartOpen}) => {
    const products = useSelector(state=>state.productsCart)
    const navigate= useNavigate()
    const dispatch= useDispatch()
    const checkProduct=()=>{
        dispatch(checkProductThunk())
        navigate("/purchases")
    }



   
 
    return (
        <div className={`cart-modal ${isCartOpen ? "open": ""}`}>
    
            <button onClick={()=>setIsCartOpen(false)} className='close-cart'><i className="fa-solid fa-x"></i></button>
            <div className='cart'>
                <ul className='cart-products-list'>
                <h4>My purchases</h4>
             
                {
                    products.map(product=>(
                        
                        <li key={product.id} onClick={()=>navigate(`./products/${product.id}`)} className="products-list">
                            <div className='cart-info'>
                                <div className='cart-details'>
                                    <span>{product.brand}</span>
                                    <p>{product.title}</p>
                                    <div className='cart-quantity'>{product?.productsInCart?.quantity}</div>
                                </div>
                                <div className='delete-btn'> <button onClick={()=>dispatch(deleteProductThunk(product.productsInCart.productId))}><i className="fa-solid fa-trash-can"></i></button></div>
                            
                            </div>
                            <div className='total'>
                                <span>Total: </span>
                                <b>{product.price}$</b>
                            </div>
                         
                            <hr />
                        </li>
                    ))
                }

                <button className='buy-btn' onClick={checkProduct}>Checkout</button>
                </ul>

            </div>
        </div>
    );
};

export default Cart;
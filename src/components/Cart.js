import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkProductThunk, deleteProductThunk } from '../redux/actions';
import "../styles/cart.css"

const Cart = ({isCartOpen}) => {
    const products = useSelector(state=>state.productsCart)
    const navigate= useNavigate()
    const dispatch= useDispatch()
    const checkProduct=()=>{
        dispatch(checkProductThunk())
        navigate("/purchases")
    }



   
 
    return (
        <div className={`cart-modal ${isCartOpen ? "open": ""}`}>
            My purchases
            <ul className='cart-list'>
            {
                products.map(product=>(
                    <li key={product.id} onClick={()=>navigate(`./products/${product.id}`)}>
                        <h4>{product.brand}</h4>
                        <p>{product.title}</p>
                        <p>{product.price}</p>
                        <hr />
                        <button onClick={()=>dispatch(deleteProductThunk(product.productsInCart.productId))}>Delete</button>
                    </li>
                ))
            }

            </ul>
            <button onClick={checkProduct}>Checkout</button>
        </div>
    );
};

export default Cart;
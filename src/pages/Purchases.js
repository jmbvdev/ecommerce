import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/purchases.css"

const Purchases = () => {

    const [purchases, setPurchases]= useState([])
    const navigate= useNavigate()

    const getConfig = () => ({
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    
    useEffect(()=>{
         axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", getConfig())
        .then(res=>setPurchases(res.data?.data?.purchases))
    },[])

 console.log(purchases)

    return (
        <main className='purchases'>
            <div className='history'>
                <a href="#/" onClick={()=>navigate("/")}><i className="fa-solid fa-house"></i></a>
                <div className='separator'></div>
                <b>purchases</b>
            </div>
            <h1>My purchases</h1>
            
          {
             purchases.map(purchase=>(
                 <>
            <div className='purchase-item'>
                <div className='header'>
                    <b>{purchase.createdAt.slice(0,10)}</b>
                </div>
                <ul className='purchase-list'>
                    <li className='purchase-products'>
                        
                        <div className='name-purchase'>
                        {purchase.cart?.products?.[0]?.title}
                        </div>
                        <div className='quantity-purchase'>
                        {purchase.cart?.products?.[0]?.productsInCart?.quantity}
                        </div>
                        <div className='price-purchase'>
                        {purchase.cart?.products?.[0]?.price}$
                        </div>
                    </li>

                </ul>
            </div>
                 </>
             ))
         } 
         
        </main>
    );
};

export default Purchases;
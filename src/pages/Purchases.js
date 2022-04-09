import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../redux/actions';
import "../styles/purchases.css"

const Purchases = () => {
    const dispatch= useDispatch()
    const [purchases, setPurchases]= useState("")

    const getConfig = () => ({
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    
    useEffect(()=>{
         axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", getConfig())
        .then(res=>setPurchases(res.data.data.purchases[0].cart.products[0]))
    },[])
 console.log(purchases)
 

    return (
        <div>
         
         <h1>{purchases.title}</h1>
         <p>nimodo usar estos
        
         </p>
           
        </div>
    );
};

export default Purchases;
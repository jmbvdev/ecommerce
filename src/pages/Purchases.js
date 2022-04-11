import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../styles/purchases.css"

const Purchases = () => {

    const [purchases, setPurchases]= useState("")

    const getConfig = () => ({
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    
    useEffect(()=>{
         axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", getConfig())
        .then(res=>setPurchases(res.data.data.purchases[0].cart.products[0]))
    },[])

 

    return (
        <div>
         
         <h1>{purchases.title}</h1>
       
           <h2>añado esto para solucionar</h2>
        </div>
    );
};

export default Purchases;
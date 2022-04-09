import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProductsThunk } from '../redux/actions';
import "../styles/products.css"

const ProductsDetail = () => {
   const {id} = useParams()
   const dispatch= useDispatch()
   const products=useSelector(state=>state.products)
   const productFound= products.find(product=>product.id===Number(id))
   const[productsFiltered, setProductsFiltered]= useState([])
 

   useEffect(()=>{
       dispatch(getProductsThunk())
   },[dispatch])

   useEffect(()=>{
       if (productFound) {
           axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${productFound?.category.id}`)
           .then(res=>setProductsFiltered(res.data.data.products)) 
       }

   },[productFound])


    return (
        <section>
            <h1>{productFound?.title}</h1>
            <img src={productFound?.productImgs[0]} alt="" />
            <p>{productFound?.description}</p>
            <strong>{productFound?.price}</strong>

            <ul className='products'>
                {
                    productsFiltered.map(product=>(
                        <li key={product.id}>
                            <Link to={`/products/${product.id}`}>
                                <img src={product.productImgs[0]} alt="" />
                                <p>{product.title}</p>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </section>
    );
};

export default ProductsDetail;
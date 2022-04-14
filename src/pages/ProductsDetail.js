import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addCartThunk, getCartThunk, getProductsThunk } from '../redux/actions';
import "../styles/products.css"

const ProductsDetail = () => {
   const {id} = useParams()
   const dispatch= useDispatch()
   const products=useSelector(state=>state.products)
   const productFound= products.find(product=>product.id===Number(id))
   const[productsFiltered, setProductsFiltered]= useState([])
   const [quantity, setQuantity]= useState("")
   const navigate= useNavigate()
 

   useEffect(()=>{
       dispatch(getProductsThunk())
   },[dispatch])

   useEffect(()=>{
       if (productFound) {
           axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${productFound?.category.id}`)
           .then(res=>setProductsFiltered(res.data?.data?.products)) 
       }

   },[productFound])

   const addCart=e=>{
       e.preventDefault()

      const items=({
           id,
           quantity
       })
       dispatch(addCartThunk(items))
       dispatch(getCartThunk())

      
   }



    return (
        <section className='product-details'>
            <div className='history'>
                <a href="#/" onClick={()=>navigate("/")}><i className="fa-solid fa-house"></i></a>
                <div className='separator'></div>
                <b>{productFound?.title}</b>

            </div>

            <div className='product-info-flex'>
               <div className='product-img'> 
                    <img src={productFound?.productImgs[0]} alt="" />
               </div>
               <div className='product-info'>
                    <h2>{productFound?.title}</h2>
                    <div className='product-data'>
                        <div className='product-options'>
                            <div className='price'>
                                <span className='label'>Price</span>
                                <span className='amount'>{productFound?.price} $</span>
                            </div>
                            <div className='quantity'>
                                <span className='label'>Quatity</span>
                                <div className="input-container">
                                    <label htmlFor="amount"></label>
                                    <input
                                        type="number"
                                        id='amount'
                                        onChange={e=>setQuantity(e.target.value)}
                                        value={quantity}
                                        /> 
                                </div>
                            </div>

                        </div>
                      <button onClick={addCart}>Add to chart <i class="fa-solid fa-cart-shopping"></i></button>
                      <p>{productFound?.description}</p>

                    </div>


                 </div>

            </div>
            <div className='suggestions'>
                <strong>Discover similar items</strong>

            </div>
            <ul className='similar-items'>
                {
                    productsFiltered.map(product=>(
                        <li key={product.id}>
                            <div className='products-card'>
                                <Link to={`/products/${product.id}`}>
                                    <div className='similar-img'>
                                      <img src={product.productImgs[0]} alt="" />
                                    </div>
                                    <div className='similar-info'>
                                    <strong>{product.title}</strong>
                                    <span className='label'>Price</span>
                                    <span className='amount'>{productFound?.price}$</span>
                                    </div>
                                </Link>
                                <button><i class="fa-solid fa-cart-shopping"></i></button>

                            </div>
                        </li>
                    ))
                }
            </ul>
        </section>
    );
};

export default ProductsDetail;
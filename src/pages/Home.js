import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { filterCategoryThunk, filterProductThunk, getCategoriesThunk, getProductsThunk } from '../redux/actions';
import "../styles/home.css"

const Home = () => {
    const dispatch= useDispatch()
    const products = useSelector(state=>state.products)
    const categories= useSelector(state=>state.categories)
   const[searchedItem,setSearchedItem]= useState("")
   const navigate= useNavigate()

    useEffect(()=>{
        dispatch(getProductsThunk())
        dispatch(getCategoriesThunk())
    },[dispatch])

    const searchProduct=e=>{
        e.preventDefault()
        dispatch(filterProductThunk(searchedItem))

    }



    return (
        <section className='main-container'> 
            <div className='search-box'>
            <form onSubmit={searchProduct}>
                <div className='input-container'>
                    <input 
                    type="text"
                     placeholder='What are you looking for?'
                     onChange={e=>setSearchedItem(e.target.value)}
                     value={searchedItem}
                      />
                    <button><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </form>
            </div>

            <div className='category-buttons'>

            {
                categories.map(category=>(
                    <button onClick={()=>dispatch(filterCategoryThunk(category.id))} key={category.id}>{category.name}</button>
                ))
            }
            </div>
        
            <ul className='products'>
            {
                   products.map(product=>(
                       <li key={product.id}>
                           <div className='product-card'>
                            <Link to={`/products/${product.id}`}>
                                <div className='image-container'>
                                  <img src={product.productImgs[0]} alt="" />
                                </div> 
                                <div className='products-info'>
                                    <strong>{product.title}</strong>
                                    <span>price</span>
                                    <strong>{product.price}$</strong>
                                    <button onClick={()=>navigate(`/products/${product.id}`)}><i className="fa-solid fa-cart-shopping"></i></button>
                                    
                                </div>
                            </Link>
                           </div>
                       </li>
                   ))
               }
            </ul>
        </section>
    );
};

export default Home;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterCategoryThunk, filterProductThunk, getCategoriesThunk, getProductsThunk } from '../redux/actions';
import "../styles/home.css"

const Home = () => {
    const dispatch= useDispatch()
    const products = useSelector(state=>state.products)
    const categories= useSelector(state=>state.categories)
   const[searchedItem,setSearchedItem]= useState("")

    useEffect(()=>{
        dispatch(getProductsThunk())
        dispatch(getCategoriesThunk())
    },[dispatch])

    const searchProduct=e=>{
        e.preventDefault()
        dispatch(filterProductThunk(searchedItem))

    }



    return (
        <div> 
            <h1>Home</h1>
            <form onSubmit={searchProduct}>
                <div className='input-container'>
                    <input 
                    type="text"
                     placeholder='search product'
                     onChange={e=>setSearchedItem(e.target.value)}
                     value={searchedItem}
                      />
                    <button>Search</button>
                </div>
            </form>
            {
                categories.map(category=>(
                    <button onClick={()=>dispatch(filterCategoryThunk(category.id))} key={category.id}>{category.name}</button>
                ))
            }
            <ul className='products'>
               {
                   products.map(product=>(
                       <li key={product.id}>
                           <Link to={`/products/${product.id}`}>
                           <img src={product.productImgs[0]} alt="" />
                           <p>{product.title}</p>
                           <p>price</p>
                           <strong>{product.price}$</strong>
                           </Link>


                       </li>
                   ))
               }
            </ul>
        </div>
    );
};

export default Home;
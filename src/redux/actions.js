import axios from "axios"

export const actions ={
    setProducts: "SET_PRODUCTS",
    setIsLoading: "SET_IS_LOADING",
    setCategories: "SET_CATEGORIES",
    setProductsCart: "SET_PRODUCTS_CART",
    setPurchases: "SET_PURCHASES"
}

const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

export const setProducts=products=>({
    type: actions.setProducts,
    payload: products
})
export const setIsLoading=isLoading=>({
    type: actions.setIsLoading,
    payload: isLoading, 
})
export const setCategories=categories=>({
    type: actions.setCategories,
    payload: categories,
    
})

export const setProductsCart=productsCart=>({
    type: actions.setProductsCart,
    payload: productsCart,
    
})

export const setPurchases=purchases=>({
    type: actions.setPurchases,
    payload: purchases,
    
})

export const getProductsThunk=()=>{
    return dispatch=>{
        dispatch(setIsLoading(true))
        return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products")
        .then(res=> dispatch(setProducts(res.data.data.products)))
        .finally(()=>dispatch(setIsLoading(false)))
    }
}

export const getCategoriesThunk=()=>{
    return dispatch=>{
        dispatch(setIsLoading(true))
        return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
        .then(res=> dispatch(setCategories(res.data.data.categories)))
        .finally(()=>dispatch(setIsLoading(false)))
    }
}

export const filterCategoryThunk=id=>{
    return dispatch=>{
        dispatch(setIsLoading(true))
        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${id}`)
        .then(res=> dispatch(setProducts(res.data.data.products)))
        .finally(()=>dispatch(setIsLoading(false)))
    }
}

export const filterProductThunk=product=>{
    return dispatch=>{
        dispatch(setIsLoading(true))
        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${product}`)
        .then(res=> dispatch(setProducts(res.data.data.products)))
        .finally(()=>dispatch(setIsLoading(false)))
    }
}

export const loginThunk=credentials=>{
    return dispatch=>{
        dispatch(setIsLoading(true))
        return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/users/login", credentials)
        .finally(()=>dispatch(setIsLoading(false)))
    }
}

export const addCartThunk=items=>{
    return dispatch=>{
        dispatch(setIsLoading(true))
        return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/cart", items, getConfig())
        .then(()=> dispatch(getCartThunk()))
        .finally(()=>dispatch(setIsLoading(false)))
    }
}

export const getCartThunk=()=>{
    return dispatch=>{
        dispatch(setIsLoading(true))
        return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
        .then(res=>dispatch(setProductsCart(res.data.data.cart.products)))
        .finally(()=>dispatch(setIsLoading(false)))
    }
}

export const deleteProductThunk=id=>{
    return dispatch=>{
        dispatch(setIsLoading(true))
        return axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`, getConfig())
        .then(()=> dispatch(getCartThunk()))
        .finally(()=>dispatch(setIsLoading(false)))
    }
}

export const checkProductThunk=()=>{
    return dispatch=>{
        dispatch(setIsLoading(true))
        return axios.post(`https://ecommerce-api-react.herokuapp.com/api/v1/purchases`, {}, getConfig())
        .finally(()=>dispatch(setIsLoading(false)))
    }
}

export const getPurchasesThunk=()=>{
    return dispatch=>{
        dispatch(setIsLoading(true))
        return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", getConfig())
        .then(res=>dispatch(setPurchases(res.data.data.purchases)))
        .finally(()=>dispatch(setIsLoading(false)))
    }
}
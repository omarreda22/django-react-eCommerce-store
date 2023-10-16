import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING } from "../constants/cartConstants";


export const addToCart = (slug, qty) => async (dispatch, getState) =>{
    const {data} = await axios.get(`/api/products/${slug}`)
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            slug: data.slug,
            name: data.name,
            image: data.image,
            price: data.price,
            countinStock: data.countinStock,
            qty
        }
    })

    localStorage.setItem('cartItemsStorage', JSON.stringify(getState().cartReducerKey.cartItems))
}


export const removeFromCart = (slug) => (dispatch, getState) => {
    dispatch({
        type:CART_REMOVE_ITEM,
        payload: slug
    })

    
    localStorage.setItem('cartItemsStorage', JSON.stringify(getState().cartReducerKey.cartItems))
}


export const saveShippingData = (data) => (dispatch) =>{
    dispatch({
        type: CART_SAVE_SHIPPING,
        payload: data
    })

    localStorage.setItem('shippingData', JSON.stringify(data))
}
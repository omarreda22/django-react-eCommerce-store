import axios from "axios";
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from "../constants/ordersConstants";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";


export const createOrderAction = (order) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })
        
        const {
            userLoginReducer: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // const {data} = axios.post('/api/orders/add/', order, config)
        const {data} = await axios.post('/api/orders/add/', order, config)
        dispatch ({
            type: ORDER_CREATE_SUCCESS,
            payload: data 
        })

        dispatch ({
            type: CART_CLEAR_ITEMS,
            payload: data 
        })

        localStorage.removeItem('cartItemsStorage')

    }catch(error){
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.details 
                ? error.response.data.details
                : error.message,
        })
    }
}
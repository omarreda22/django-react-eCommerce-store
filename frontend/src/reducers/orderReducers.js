import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_RESET } from "../constants/ordersConstants";


export const orderCreateReducer = (state={}, action) => {
    switch(action.type){
        case ORDER_CREATE_REQUEST:
            return{
                loading_request: true
            }
        
        case ORDER_CREATE_SUCCESS:
            return {
                loading_request: false,
                success: true,
                order: action.payload
            }
        
        case ORDER_CREATE_FAIL:
            return {
                loading_request: false,
                error: action.payload
            }
            
        case ORDER_CREATE_RESET:
            return {}


        default: return state
    }
}
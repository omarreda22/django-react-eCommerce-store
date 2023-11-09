import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_CLEAR_ITEMS } from "../constants/cartConstants";


export const cartReducer = (state = {cartItems: [], shippingData: {} }, action) => {
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload
            const exitItem = state.cartItems.find(x => x.slug === item.slug)
            if(exitItem){
                return{
                    ...state,
                    cartItems: state.cartItems.map(x=>
                        x.slug === exitItem.slug ? item : x
                        )
                }
            }else{
                return{
                    ...state,
                    cartItems:[...state.cartItems, item]
                }
            }
        
        case CART_REMOVE_ITEM:
            return{
                ...state,
                cartItems:state.cartItems.filter(x=> x.slug !== action.payload)
            }

        case CART_SAVE_SHIPPING:
            return {
                ...state,
                shippingData: action.payload
            }

        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems:[]
            }

        

        default:
            return state
    }
}
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";


export const cartReducer = (state = {cartItems: [] }, action) => {
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
        default:
            return state
    }
}
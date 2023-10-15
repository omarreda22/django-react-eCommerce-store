import { 
    PROFILE_DETAILS_REQUEST,
    PROFILE_DETAILS_SUCCESS,
    PROFILE_DETAILS_FAIL,
    PROFILE_DETAILS_REST,

    PROFILE_UPDATE_DETAILS_FAIL,
    PROFILE_UPDATE_DETAILS_REQUEST,
    PROFILE_UPDATE_DETAILS_SUCCESS,
    PROFILE_UPDATE_DETAILS_RESET,

    USER_CHANGE_PASSWORD_REQUEST,
    USER_CHANGE_PASSWORD_SUCCESS,
    USER_CHANGE_PASSWORD_FAIL,
    USER_CHANGE_PASSWORD_REST,


} from "../constants/profileContants";


export const profileDetails = (state = {userProfileDetails: {}}, action) =>{
    switch(action.type){
        case PROFILE_DETAILS_REQUEST:
            return ({
                ...state,
                loading: true
            })

        case PROFILE_DETAILS_SUCCESS:
            return ({
                loading: false,
                userProfileDetails: action.payload
            })
            

        case PROFILE_DETAILS_FAIL:
            return ({
                loading: false,
                error: action.payload
            })

        case PROFILE_DETAILS_REST:
            return ({
                userProfileDetails: {}
            })

        default:
            return state
    }

}

export const profileUpdateDetails = (state = {}, action)=>{
    switch(action.type){
        case PROFILE_UPDATE_DETAILS_REQUEST:
            return {
                loading: true
            }

        case PROFILE_UPDATE_DETAILS_SUCCESS:
            return {
                loading: false,
                success: true,
                userInfo: action.payload
            }
        
        case PROFILE_UPDATE_DETAILS_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        case PROFILE_UPDATE_DETAILS_RESET:
            return {}

        default:
            return state
    }

}

export const userUpdatePassword = ( state ={}, action) =>{
    switch(action.type){
        case USER_CHANGE_PASSWORD_REQUEST:
            return{
                loading: true
            }

        case USER_CHANGE_PASSWORD_SUCCESS:
            return {
                loading: false,
                done: true,
                new_password: action.payload
            }

        case USER_CHANGE_PASSWORD_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        
        case USER_CHANGE_PASSWORD_REST: 
            return {}
        

        default:
            return state
    }
}
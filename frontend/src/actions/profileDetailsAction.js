import axios from "axios";

import { 
    PROFILE_DETAILS_REQUEST,
    PROFILE_DETAILS_SUCCESS,
    PROFILE_DETAILS_FAIL,

    PROFILE_UPDATE_DETAILS_REQUEST,
    PROFILE_UPDATE_DETAILS_SUCCESS,
    PROFILE_UPDATE_DETAILS_FAIL,

    USER_CHANGE_PASSWORD_REQUEST,
    USER_CHANGE_PASSWORD_SUCCESS,
    USER_CHANGE_PASSWORD_FAIL,
    USER_CHANGE_PASSWORD_REST,
} from "../constants/profileContants";

import { USER_LOGIN_SUCCESS, USER_LOGOUT } from "../constants/userContent";

export const getProfileDetails = () => async(dispatch, getState) =>{
    try{
        dispatch ({
            type: PROFILE_DETAILS_REQUEST
        })

        const {
            userLoginReducer: {userInfo}
        } = getState()
        
        
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(
            `/api/user/profile/update/${userInfo.username}`,
            config
        )

        dispatch ({
            type: PROFILE_DETAILS_SUCCESS,
            payload: data
        })


    }catch(error){
        dispatch({
            type: PROFILE_DETAILS_FAIL,
            payload: error.response && error.response.data
                ? error.response.data
                : error.message, 
        })
    }
}


export const profileUpdateDetailsAction = (email, username, first_name, last_name, phone_number, address) => async(dispatch, getState)=>{
    try{
        dispatch({
            type: PROFILE_UPDATE_DETAILS_REQUEST
        })
        
        const {
            userLoginReducer: {userInfo}
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const moreData= {
            'first_name': first_name,
            'last_name': last_name,
            'phone_number': phone_number,
            'address': address
        }

        if(userInfo.email !== email) { moreData.email = email }
        if(userInfo.username !== username) { moreData.username = username }

        const {data} = await axios.put(
            `/api/user/profile/update/${userInfo.username}`,
            moreData,
            config
            )

        dispatch({
            type: PROFILE_UPDATE_DETAILS_SUCCESS,
            payload: data
        })


        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfoStorage', JSON.stringify(data))


    }catch(error){
        dispatch({
            type: PROFILE_UPDATE_DETAILS_FAIL,
            payload: error.response && error.response.data
                ? error.response.data
                : error.message, 
        })
    }
}


export const userUpdatePasswordAction = (oldPassword, password, password2) => async (dispatch, getState) =>{
    try{
        dispatch({
            type: USER_CHANGE_PASSWORD_REQUEST
        })
        
        const {
            userLoginReducer: {userInfo}
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(
            '/api/user/update_password/',
            {
                "old_password": oldPassword,
                "password": password,
                "password2": password2
            },
            config

        )

        dispatch ({
            type: USER_CHANGE_PASSWORD_SUCCESS,
            payload: data
        })

        
        localStorage.removeItem('userInfoStorage')
        dispatch({
            type: USER_LOGOUT
        })

    }catch(error){
        dispatch({
            type: USER_CHANGE_PASSWORD_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message, 
        })
    }

}
import axios from "axios";

import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    
    USER_LOGOUT,
    
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
} from "../constants/userContent";



axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const loginAction = (email, password) => async (dispatch) => {
    try{    
        dispatch ({ type: USER_LOGIN_REQUEST })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const {data} = await axios.post(
            '/api/user/login/',
            {'email':email, 'password':password},
            config
            )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfoStorage', JSON.stringify(data))
        
    } catch(error){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const userLogoutAction = () => async(dispatch) => {
    localStorage.removeItem('userInfoStorage')
    dispatch({
        type: USER_LOGOUT
    })
}

export const registerAction = (email, username, first_name, last_name, password, password2) => async (dispatch) =>{
    try{
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        
        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }


        const {data} = await axios.post(
            '/api/user/register/',
            {
                'email':email,
                'username':username,
                'first_name':first_name,
                'last_name':last_name,
                'password':password,
                'password2':password2
            },
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        
    }catch(error){
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message, 
        })
    }

}
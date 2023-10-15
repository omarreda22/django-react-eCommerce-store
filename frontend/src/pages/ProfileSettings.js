import { TextInput } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import DashboardSlider from "../components/DashboardSlider"
import { getProfileDetails, profileUpdateDetailsAction } from '../actions/profileDetailsAction';
import {PROFILE_UPDATE_DETAILS_RESET} from '../constants/profileContants'
import AlertMessage from '../components/Alert';
import Loader from '../components/Loader';


function ProfileSettings() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAdress] = useState('')
    
    const history = useNavigate()
    const dispatch = useDispatch()

    const getUser = useSelector(state =>state.userLoginReducer)
    const {userInfo} = getUser

    const updateDetails = useSelector( state => state.profileUpdateDetailsReducer)
    const {error, loading, success} = updateDetails
    useEffect(()=>{
        if(!userInfo){
            history('/login')
        }else if(success){
            dispatch({type: PROFILE_UPDATE_DETAILS_RESET})
            dispatch(getProfileDetails())
        }else{
            setEmail(userInfo.email)
            setUsername(userInfo.username)
            setFirstName(userInfo.first_name)
            setLastName(userInfo.last_name)
            setPhoneNumber(userInfo.phone_number)
            setAdress(userInfo.address)
        }
    }, [dispatch, userInfo, success])

    // console.log(phoneNumber)
    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(profileUpdateDetailsAction(
            email,
            username,
            firstName,
            lastName,
            phoneNumber,
            address
        ))
    }

    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-cyan-800">Overview :</h2>
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 lg:grid-cols-12">
            <div className="lg:mt-0 lg:col-span-3 lg:flex">
            <DashboardSlider />
            </div>                
                <div className="lg:col-span-9 bg-gray-50">
                <section className="bg-white dark:bg-gray-900">
                        <div className="">
                            {error && <AlertMessage message={error} color={'failure'} />}
                            {loading && <Loader />}
                            <form onSubmit={handleSubmit} className='mt-5'>
                                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                    <div className="sm:col-span-2">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <TextInput
                                        type="text"
                                        value={email}
                                        placeholder="Email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                        <TextInput 
                                            type='text'
                                            value={username}
                                            placeholder='Username'
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    <div className="sm:col-span-">
                                        <label  className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                        <TextInput 
                                            type='text'
                                            value={firstName}
                                            placeholder='First Name'
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label  className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                        <TextInput 
                                            type='text'
                                            value={lastName}
                                            placeholder='Last Name'
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label  className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                        <TextInput 
                                            type='text'
                                            value={phoneNumber}
                                            placeholder='Phone Number'
                                            onChange={e => setPhoneNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label  className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                        <TextInput 
                                            type='text'
                                            value={address}
                                            placeholder='Address'
                                            onChange={(e) => setAdress(e.target.value)}
                                        />
                                    </div>
                                    
                                </div>
                                </div>
                                <button type="submit" className="float-right inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-orange-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                    Update
                                </button>
                            </form>
                            
                        </div>
                        </section>
</div>
</div>
</div>
    )
}

export default ProfileSettings

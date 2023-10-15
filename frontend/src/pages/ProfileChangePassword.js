import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextInput } from 'flowbite-react';
import { useNavigate } from "react-router-dom";

import { userUpdatePasswordAction } from "../actions/profileDetailsAction";
import DashboardSlider from "../components/DashboardSlider"
import AlertMessage from '../components/Alert'
import Loader from '../components/Loader'

import {  USER_CHANGE_PASSWORD_REST } from "../constants/profileContants";


function ProfileChangePassword() {
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const history = useNavigate()
  const dispatch = useDispatch()
  const updatePassword = useSelector(state=> state.userUpdatePassword)
  const {error, loading, done} = updatePassword

  useEffect(()=>{
    if(done){
      history('/login')
      dispatch({type: USER_CHANGE_PASSWORD_REST})
    }
  }, [done])
  
  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(userUpdatePasswordAction(oldPassword, password, password2))
    console.log(done)
  }
  

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
    <h2 className="text-3xl font-bold tracking-tight text-cyan-800">Overview :</h2>
    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 lg:grid-cols-12">
        <div className="lg:mt-0 lg:col-span-3 lg:flex">
        <DashboardSlider />
        </div>                
            <div className="lg:col-span-9 bg-gray-50">
            <section className="p-3 dark:bg-gray-900">
                    <div className="">
                    {error && <AlertMessage message={error} color={'failure'} />}
                    {loading && <Loader />}
                    <form onSubmit={handleSubmit} className='mt-5'>
                      <div className="grid ">
                        <div>
                            <div className="mb-2 block text-left ">
                            <label  className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">Old Password</label>
                            <TextInput
                            type="password"
                            placeholder="Old Password"
                            value={oldPassword}
                            required
                            onChange={(e) => setOldPassword(e.target.value)}
                            />
                            </div>
                        </div>
                      
                        <div>
                            <div className="mb-2 block text-left ">
                            <label  className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                            <TextInput
                            type="password"
                            placeholder="New Password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            />
                            </div>
                        </div>
                      
                        <div>
                            <div className="mb-2 block text-left ">
                            <label  className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">Confirm New Password</label>
                            <TextInput
                            type="password"
                            placeholder="Confirm Password"
                            value={password2}
                            required
                            onChange={(e) => setPassword2(e.target.value)}
                            />
                            </div>
                        </div>
                      </div>
                        <button type="submit" className="float-right inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-orange-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            Update Password
                        </button>
                      </form>
                    </div>
                      
                    </section>
    </div>
    </div>
    </div>
)
}

export default ProfileChangePassword

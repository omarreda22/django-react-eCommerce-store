import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProfileDetails } from "../actions/profileDetailsAction"
import { useNavigate } from "react-router-dom"

import DashboardSlider from "../components/DashboardSlider"
import Loader from "../components/Loader"
import AlertMessage from "../components/Alert"

function Profile() {
    const history = useNavigate()
    const dispatch = useDispatch()
    
    const getProfile = useSelector(state => state.profileDetailsReducer)
    const {error, loading, userProfileDetails} = getProfile

    const getUser = useSelector(state =>state.userLoginReducer)
    const {userInfo} = getUser
    
    useEffect(()=>{
        if(!userInfo){
            history('/login')
        }else{
            dispatch(getProfileDetails())
        }
    }, [dispatch, history, getUser])


    // lllooooping ?!!!!
    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-cyan-800">Overview :</h2>
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 lg:grid-cols-12">
            <div className="lg:mt-0 lg:col-span-3 lg:flex">
            <DashboardSlider />
            </div>                
                <div className="lg:col-span-9 bg-gray-50">
                {loading ? <Loader /> : error ? <AlertMessage message={error.detail} color="failure" /> : 
                // userProfileDetails.map(profile => (
                //     profile.username
                // ))
                    <div className="grid lg:grid-cols-12">
                    <div className=" lg:col-span-7 border-r ">
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xl text-gray-700 bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        First Name
                                    </th>
                                    <td className="px-6 py-3">
                                        {userProfileDetails.first_name}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Last Name
                                    </th>
                                    <td className="px-6 py-3">
                                        {userProfileDetails.last_name}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Username
                                    </th>
                                    <td className="px-6 py-3">
                                        {userProfileDetails.username}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <td className="px-6 py-3">
                                        {userProfileDetails.email}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Phone Number
                                    </th>
                                    <td className="px-6 py-3">
                                    {!userProfileDetails.phone_number ? "Not Set Yet!"  : userProfileDetails.phone_number}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Adress
                                    </th>
                                    <td className="px-6 py-3">
                                        {!userProfileDetails.address ? "Not Set Yet!" : userProfileDetails.address}
                                    </td>
                                </tr>
                            </thead>
                            
                        </table>
                    </div>

                    </div>
                    <div className="lg:mt-0 lg:col-span-5 lg:flex ">
                        <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6 ">
                        <div className="grid max-w-screen-md gap-8 mx-auto text-gray-900 ">
                            <div className="flex flex-col items-center justify-center">
                                <dt className="mb-2 text-3xl md:text-5xl font-extrabold text-cyan-700">9</dt>
                                <dd className="font-light text-black text-xl">Total Orders</dd>
                            </div>
                        </div>
                        </div>
                    </div>                
                </div>
                }
                </div>
            </div>
        </div>

    )
}

export default Profile
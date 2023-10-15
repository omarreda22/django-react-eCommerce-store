import { Label, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { registerAction } from '../actions/userLoginAction';
import AlertMessage from '../components/Alert';
import Loader from '../components/Loader';


function Register() {
    const history = useNavigate()

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const dispatch = useDispatch()

    const userRegister = useSelector(state=>state.userRegisterReducer)
    const {error, loading, userInfoRegister} = userRegister

    const userExist = useSelector(state=>state.userLoginReducer)
    const {userInfo} = userExist

    useEffect(()=>{
        if(userInfoRegister || userInfo){
            history('/login')
        }
    }, [userInfoRegister, userInfo])

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(registerAction(email, username, firstName, lastName, password, password2))
    }

    return (
    <section className="bg-white  dark:bg-gray-900">
    <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-14 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
            
            <div className="w-full bg-gray-100 rounded-lg shadow xl:p-0 p-5">
                <div className=" md:space-y-6 sm:p-8">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-cyan-700 dark:text-white mb-5">Register 
                    <span className='text-orange-500'> New Account</span>
                    </h2>
                    {error && <AlertMessage message={error} color={'failure'}/>}
                    {loading && <Loader />}
                    <form onSubmit={submitHandler} className="space-y-4 md:space-y-6">
                    <div>
                        <div className="mb-2 block text-left">
                        <Label
                            value="First Name"
                        />
                        </div>
                        <TextInput
                        type="text"
                        value={firstName}
                        placeholder="First Name"
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block text-left">
                        <Label
                            value="Last Name"
                        />
                        </div>
                        <TextInput
                        type="text"
                        value={lastName}
                        placeholder="Last Name"
                        required
                        onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block text-left">
                        <Label
                            value="Email Address"
                        />
                        </div>
                        <TextInput
                        type="email"
                        value={email}
                        placeholder="Enter Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block text-left">
                        <Label
                            value="Username"
                        />
                        </div>
                        <TextInput
                        type="text"
                        value={username}
                        placeholder="Username"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block text-left ">
                        <Label
                            value="Password"
                            />
                        </div>
                        <TextInput
                        type="password"
                        placeholder="Password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block text-left ">
                        <Label
                            value="Confirm Password"
                            />
                        </div>
                        <TextInput
                        type="password"
                        placeholder="Confirm Password"
                        value={password2}
                        required
                        onChange={(e) => setPassword2(e.target.value)}
                        />
                    </div>

                    <button type='submit' className="w-2/4 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Register</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Do you have an account? <Link to='/login' className="font-medium text-orange-600 hover:underline dark:text-cyan-500">Login</Link>
                    </p>
                    </form>
                </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Register
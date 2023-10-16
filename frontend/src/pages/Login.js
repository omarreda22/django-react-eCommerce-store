import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Label, TextInput } from 'flowbite-react';


import { loginAction } from '../actions/userLoginAction';
import Loader from '../components/Loader';
import AlertMessage from '../components/Alert';



function Login() {
    const history = useNavigate()
    const location = useLocation()
    
    const [email, setEmail] = useState()
    const [password, setPassword] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const dispatch = useDispatch()

    const userLogin = useSelector(state=>state.userLoginReducer)
    const {error, loading, userInfo} = userLogin
    
    useEffect(()=>{
        if(userInfo){
            history(redirect)
        }
    },[history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(loginAction(email, password))
    }

  return (
    <section className="bg-white  dark:bg-gray-900">
    <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-14 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
            
            <div className="w-full bg-gray-100 rounded-lg shadow xl:p-0 p-5">
                <div className=" md:space-y-6 sm:p-8">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-cyan-700 dark:text-white mb-5">Sign In To 
                    <span className='text-orange-500'> Your Account</span>
                    </h2>
                    {error && <AlertMessage message={'Email or Password is Wrond.'} color={'failure'}/>}
                    {loading && <Loader />}
                    <form onSubmit={submitHandler} className="space-y-4 md:space-y-6">
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

                    <button type='submit' className="w-2/4 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="font-medium text-orange-600 hover:underline dark:text-cyan-500">Sign up</Link>
                    </p>
                    </form>
                </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Login
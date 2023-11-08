import { useState } from 'react';
import { Button, TextInput, Textarea, Avatar, Label, Radio } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { saveShippingData } from '../actions/cartAction';
import AlertMessage from '../components/Alert';
import Loader from '../components/Loader';
import CheckoutSteps from '../components/CheckoutSteps';

function Shipping() {
    const getShippingData = useSelector(state => state.cartReducerKey)
    const {error, loading, shippingData, cartItems} = getShippingData

    
  const history = useNavigate()

    const [address, setAddress] = useState(shippingData.address)
    const [city, setCity] = useState(shippingData.city)
    const [country, setCountry] = useState(shippingData.country)
    const [postalCode, setPostalCode] = useState(shippingData.postalCode)
    const [paymentMethod, setPaymentMethod] = useState('')

    const dispatch = useDispatch()

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(saveShippingData({
            'address': address,
            'city': city,
            'country': country,
            'postalCode': postalCode,
            'payment': paymentMethod
        }))

        history('/checkout')
    }


    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl">
        <CheckoutSteps step1 step2 active2/>
        <div className="sm:grid max-w-screen-xl  mx-auto lg:gap-8 xl:gap-0 lg:py-8 lg:grid-cols-12">
            <div className="md:col-span-7">
            <div className="mr-auto place-self-center">
            <div className="relative overflow-x-auto sm:rounded-lg mr-10">
            {loading ? <Loader /> 
            : 
            error ?
            <AlertMessage message={error} color={'failure'} />
            :
            
            <form >
                        <div className="grid ">
                        <div>
                            <div className="mb-2 block text-left ">
                            <label  className="block mb-2  text-sm font-medium text-gray-900">Adress</label>
                            <Textarea
                            type="text"
                            placeholder="Adress"
                            value={address ? address : ''}
                            required
                            onChange={(e) => setAddress(e.target.value)}
                            />
                            </div>
                        </div>
                        
                        <div>
                            <div className="mb-2 block text-left ">
                            <label  className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                            <TextInput
                            type="text"
                            placeholder="City"
                            value={city ? city : ''}
                            required
                            onChange={(e) => setCity(e.target.value)}
                            />
                            </div>
                        </div>

                        <div>
                            <div className="mb-2 block text-left ">
                            <label  className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                            <TextInput
                            type="text"
                            placeholder="Country"
                            value={country ? country : ''}
                            required
                            onChange={(e) => setCountry(e.target.value)}
                            />
                            </div>
                        </div>
                        
                        <div>
                            <div className="mb-2 block text-left ">
                            <label  className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">Postal Code</label>
                            <TextInput
                            type="text"
                            placeholder="Postal Code"
                            value={postalCode ? postalCode : ''}
                            required
                            onChange={(e) => setPostalCode(e.target.value)}
                            />
                            </div>
                        </div>

                        <div className=' mt-7'>
                            <label  className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">Payment Method</label>
                            <div className="mb-2 block text-left border p-5 mt-5 ">
                            <fieldset
                                className="flex max-w-md flex-col gap-4 "
                                id="radio"
                                >                                
                                <div className="flex items-center gap-2">
                                    <Radio
                                    name="payment_method"
                                    value="Paypal"
                                    onChange={(e)=>setPaymentMethod(e.target.value) }
                                    />
                                    <Label>
                                    Paypal or Crdit Card
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Radio
                                    name="payment_method"
                                    value="Google Pay"
                                    onChange={(e)=>setPaymentMethod(e.target.value) }
                                    />
                                    <Label>
                                    Google Pay
                                    </Label>
                                </div>
                                
                                </fieldset>
                            </div>
                        </div>
                        </div>
                        </form>
                        }
            </div>
            </div>
            
            </div>
            <div className="mt-10 lg:mt-0 md:col-span-5 lg:flex ">
                
                
            <div className="relative overflow-x-auto">
            {loading ? <Loader /> 
            : 
            error ?
            <AlertMessage message={error} color={'failure'} />
            :
                    
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-lg " >
                            <th scope="row" className="px-6 py-4 text-gray-900">
                                Subtotal
                            </th>
                            <th scope="row" className="px-6 py-4 text-gray-900">
                                Quantity
                            </th>
                            <th scope="row" className="px-6 py-4 text-gray-900">
                                Price
                            </th>
                            
                        </tr>
                        {cartItems.map((product) =>(

                            <tr key={product.slug} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <Link to={`/product/${product.slug}`}>
                                    <Avatar
                                        img={product.image}
                                        size="md"
                                        // className='float-left'
                                    />
                                    </Link>
                                </th>
                                
                                <td className="px-6 py-4 text-black text-center">
                                    {product.qty}
                                </td>
                            
                                <td className="px-6 py-4 text-black">
                                    ${(product.price * product.qty).toFixed(2)}
                                </td>
                            
                            </tr>
                        ))}
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-lg" >
                            <th scope="row" className="px-6 py-4 text-gray-900 ">
                                Total Price
                            </th>
                            <td></td>
                            <td className="px-6 py-4 text-gray-700">
                                ${cartItems.reduce((acc, item)=> acc + item.price * item.qty, 0).toFixed(2)}
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
                }
                <Button
                color='orange'
                disabled={
                    address === undefined || 
                    city === undefined || 
                    postalCode === undefined || 
                    country === undefined ||
                    country === '' ||
                    address === '' ||
                    city === '' ||
                    postalCode === '' ||
                    paymentMethod === ''
                
                }
                className="mt-7 w-full text-center bg-orange-700 hover:bg-orange-800 text-white ml-auto"
                onClick={submitHandler}
                >
                Continue
                </Button>
            </div>
            </div>
        </div>
        </div> 
        
    )
}

export default Shipping

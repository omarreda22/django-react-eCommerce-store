'use client';

import React, {useEffect} from 'react'
import { Button } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../actions/cartAction'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import AlertMessage from '../components/Alert';
import TableRow from '../components/TableRow';


function Cart() {
  const {slug} = useParams()
  const history = useNavigate()
  const location = useLocation()
  
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cartReducerKey)
  const {cartItems} = cart
  
  const subtotal = cartItems.reduce((acc, item)=> acc + item.qty, 0)
  
  
  useEffect(()=>{
    if (slug){
      dispatch(addToCart(slug, qty))
    }
  }, [dispatch, slug, qty])


  const checkoutHandler = ()=>{
    // history("/login/redirect=shipping")
    history("/shipping")
  }
  
  
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl">
      <h2 className="text-2xl font-bold tracking-tight text-cyan-800 mb-10 lg:mb-0">Shopping Cart</h2>
      <div className="sm:grid max-w-screen-xl  mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="md:col-span-9">
          {cartItems.length === 0 ? 
          <div className="mr-10">
            <AlertMessage color={"info"} message={'Your Cart is Empty'} link={'/'} linkMessage={"Go Back"}/>
          </div>
          : 
          <div className="mr-auto place-self-center">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mr-10">
              <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" className="px-4 py-3">
                              Product Image
                          </th>
                          <th scope="col" className="px-4 py-3">
                              name
                          </th>
                          <th scope="col" className="px-4 py-3">
                              Price
                          </th>
                          <th scope="col" className="px-4 py-3">
                              quantity
                          </th>
                          <th scope="col" className="px-4 py-3">
                              total price
                          </th>
                          <th scope="col" className="px-4 py-3">
                              
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      {cartItems.map(product => (
                        <TableRow key={product.slug} product={product} />
                      ))} 
                  </tbody>
              </table>
          </div>
          </div>
          }
        </div>
        <div className="mt-10 lg:mt-0 md:col-span-3 lg:flex ">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-lg " >
                      <th scope="row" className="px-6 py-4 text-gray-900">
                          Subtotal
                      </th>
                      <td className="px-6 py-4 text-gray-700">
                          {subtotal} Item{subtotal>1 ? 's' : ''}
                      </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-lg" >
                      <th scope="row" className="px-6 py-4 text-gray-900 ">
                          Total Price
                      </th>
                      <td className="px-6 py-4 text-gray-700">
                          ${cartItems.reduce((acc, item)=> acc + item.price * item.qty, 0).toFixed(2)}
                      </td>
                  </tr>
                  
                </tbody>
            </table>
            
            <Button 
              disabled={cartItems.length === 0}
              className="mt-7 w-full bg-cyan-700"
              onClick={checkoutHandler}
              >
              Proceed To Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Cart

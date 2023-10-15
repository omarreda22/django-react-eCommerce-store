'use client';

import React, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button, Alert, Rating, Label, Select} from 'flowbite-react'

import { useDispatch, useSelector } from 'react-redux';
import { productDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import AlertMessage from '../components/Alert';
import {useNavigate} from "react-router-dom"


function ProductDetails() {
  const history = useNavigate()
  const {slug} = useParams()
  const dispatch = useDispatch()
  const _productDetailsReducer = useSelector(state => state.productDetailsReducer)
  const {error, loading, product} = _productDetailsReducer

  const [qty, setQty] = useState(1)

  // useEffect(()=>{}, [])
  useEffect(()=>{
      dispatch(productDetails(slug))
    }, [dispatch, slug])


    const addToCart = ()=>{   
      // console.log(qty)
      history(`/cart/${slug}?qty=${qty}`)
    }
    return (
    <div>
      <div className="bg-white">
          <div className='mt-3 md:ml-10'>
              <Link to="/" >
                <button className='rounded-md border border-transparent bg-cyan-800 px-5 py-2 text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'><i className="fa-solid fa-arrow-left mr-1"></i> Back</button>
              </Link>
          </div>
        {
        loading 
        ? <Loader />
        : error 
        ? <AlertMessage message={error} color="warning" />
        :
        <div className="pt-6 ">
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3  overflow-hidden rounded-lg lg:block">
              <img src={product.image} alt="Two each of gray, white, and black shirts laying flat." className="h-full w-full object-cover object-center" />
            </div>
            <div className="lg:grid lg:grid-cols-1 lg:gap-y-8 py-3">
              <div>
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
                </div>
                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                  <div>
                    <div className="space-y-6">
                      <p className="text-base text-gray-900">{product.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-cyan-800">${product.price}</p>
                <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="ml-1 mr-1 text-sm font-bold text-gray-900 dark:text-white py-5">
                  <span className="mr-2  rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800 ">
                      {product.brand}
                  </span>
                  
                  <span className="mr-2  rounded bg-cyan-500 px-2.5 py-0.5 text-xs font-semibold text-white dark:bg-cyan-200 dark:text-cyan-800 ">
                      {product.category_name}
                  </span>
                  </div>
                  <div className="flex items-center">
                    
                    
                    <Rating className='float-right'>
                        <Rating.Star  />
                        
                        <p className="ml-1 mr-1 text-sm font-bold text-gray-900 dark:text-white">
                            {product.rating}
                        </p>
                        <p>
                        ({product.numReviews} reviews)
                        </p>    
                        
                    </Rating>
                  </div>
                </div>
                <form className="mt-10">
                  { product.countinStock > 0 
                  ?  
                  <div>
                    
                      <div className="mb-2 block">
                        <Label
                          htmlFor="qty"
                          value="QTY"
                        />
                      </div>
                      <Select
                        id="qty"
                        required
                        onChange={(e)=> setQty(e.target.value)}
                      >
                        
                        {
                          [...Array(product.countinStock).keys()].map((x) =>(
                          <option key={x + 1}>
                            {x + 1}
                          </option>
                          ))
                        }
                      </Select>
                    
                    <div>
                      <Button 
                        onClick={addToCart}
                        className="mt-7 w-full bg-cyan-700">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                  :
                  <Alert
                    color="warning"
                    rounded
                  >
                   <span className='text-center'>
                    <p className='text-center'>
                      Out of Stock
                    </p>
                  </span>
                  </Alert>
                  }
                </form>
              </div>
            </div>
          </div>

        </div>
        }
      </div>
    </div>
  )
}

export default ProductDetails

'use client';

import React from 'react'
import { Link } from 'react-router-dom';
import { Card, Rating  } from 'flowbite-react';



function ProductList({product}) {
  return (
    <Card
      imgAlt={product.name}
      imgSrc={product.image}
    >
      <Link to={`/product/${product.slug}`}>
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          <p>
            {product.name}
          </p>
        </h5>
      </Link>
      <div className="py-2">
        <span className="mr-2  rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800 ">
            {product.brand}
        </span>
        
        <Rating className='float-right'>
            <Rating.Star  />
            
            <p className="ml-1 mr-1 text-sm font-bold text-gray-900 dark:text-white">
                {product.rating}
            </p>
            <p>
            ({product.numReviews})
            </p>    
        </Rating>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-gray-900 dark:text-white">
          ${product.price}
        </span>
        <Link
          className="rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          to={`/product/${product.slug}`}
        >
          <p>
            More Details
          </p>
        </Link>
      </div>
    </Card>
  )
}

export default ProductList

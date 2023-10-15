import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Select, Button } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartAction';

function TableRow(props) {
    const product = props.product
    const dispatch = useDispatch()

    const removeProductFromCart = (slug) =>{
        dispatch(removeFromCart(slug))
    }

    return (
        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <Avatar
                    img={product.image}
                    size="lg"
                    // className='float-left'
                />
            </th>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <Link className='text-cyan-800 underline' to={`/product/${product.slug}`}>{product.name}</Link>
            </th>
            <td className="px-6 py-4 text-black">
                ${product.price}
            </td>
            <td className="px-6 py-4">
                        <Select
                            id={`qty-${product.slug}`}
                            onChange={(e)=> dispatch(addToCart(product.slug, Number(e.target.value)))}
                        >
                            
                            <option>{product.qty}</option>
                            {
                            [...Array(product.countinStock).keys()].filter((x)=> x+1 !== product.qty).map((x) =>(
                            <option key={x + 1}>
                                {x + 1}
                            </option>
                            ))
                            }
                      </Select>
            </td>
            <td className="px-6 py-4 text-black">
                ${(product.price * product.qty).toFixed(2)}
            </td>
            <td className="px-6 py-4">
            <Button color="light" onClick={()=>removeProductFromCart(product.slug)}>
                <i className="fa-solid fa-trash"></i>
            </Button>
            </td>
        </tr>
  )
}

export default TableRow

import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Dropdown } from 'flowbite-react';

import { userLogoutAction } from '../actions/userLoginAction';
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';


function Header() {
    const userLogin = useSelector(state=>state.userLoginReducer)
    const {userInfo} = userLogin

    const dispatch = useDispatch()
    const history = useNavigate()

    const userCart = useSelector(state => state.cartReducerKey)
    const {cartItems} = userCart
    const [sumItmes, setSumItmes] = useState(0)

    useEffect(()=>{
      setSumItmes(cartItems.reduce((acc, item)=> acc + item.qty, 0))
    }, [userCart, cartItems])
    
    
    const handleLogout = () => {
      dispatch(userLogoutAction())
      dispatch({type: 'PROFILE_DETAILS_REST'})
      history('/login')
    }

  return (    
    <Navbar
      fluid
      rounded
      className="text-xl"
    > 
      <Navbar className="container">
            <NavLink to="/">
              <span className="text-cyan-700 self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Shop <span className='text-orange-500'>Shop</span>
              </span>
            </NavLink>
            <div className="flex md:order-3 text-cyan-700">
              <p className='mt-1 mr-3'>
              <i className="fa-solid fa-cart-shopping mr-1 text-cyan-700"></i>
                <Link to="/cart">Cart ({sumItmes})</Link>
              </p>
              
              <Navbar.Toggle />
            </div>
            <Navbar.Collapse >
                <NavLink to="/">
                  <p>
                    Home
                  </p>
                </NavLink>

                {!userInfo && 
                <NavLink to="/register">
                    Register
                </NavLink>
                }

                {userInfo ? 

                <Dropdown inline label={userInfo.username}>
                    <NavLink to="/profile">
                      <Dropdown.Item>
                        Profile
                      </Dropdown.Item>
                    </NavLink>
                  
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    <NavLink className={"text-red-600"} >
                      logout
                    </NavLink>
                  </Dropdown.Item>
                </Dropdown>

                :  
                <NavLink to="/login">
                  <i className="fa-solid fa-person-running mr-1"></i>
                  Login
                </NavLink>

                
              }
             

            </Navbar.Collapse>
      </Navbar>
    </Navbar>
  )
}

export default Header
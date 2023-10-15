import { useLocation, Link } from 'react-router-dom';

import { Sidebar } from 'flowbite-react';
import { HiUser, HiCreditCard, HiLogout} from 'react-icons/hi';
import { MdPassword } from 'react-icons/md';
import { BiSolidDashboard } from 'react-icons/bi';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { userLogoutAction } from '../actions/userLoginAction';

function DashboardSlider() {

  const location = useLocation()
  const activeIcon = location.pathname.split('/')[1]

  const dispatch = useDispatch()
  const history = useNavigate()
  const logout = ()=>{
    dispatch(userLogoutAction())
    history('/login')
  }

  return (
    <Sidebar aria-label="Default sidebar example">
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Link to="/profile">
                  <Sidebar.Item
                    active = {'profile' === activeIcon && 'true' }
                    icon={ BiSolidDashboard }
                    >
                    <span>
                      Dashboard
                    </span>
                  </Sidebar.Item>
                  </Link>
                <Sidebar.Item
                
                  icon={HiCreditCard}
                  label="6"
                >
                  <p>
                    Orders
                  </p>
                </Sidebar.Item>
                <Link to="/settings">
                <Sidebar.Item
                    active = {'settings' === activeIcon && 'true'}
                    icon={HiUser }
                    >
                    <span>
                      Settings
                    </span>
                  </Sidebar.Item>
                  </Link>
                  <Link to="/change_password">
                <Sidebar.Item
                  active = {'change_password' === activeIcon && 'true'}
                  icon={MdPassword}
                >
                  <p>
                    Change Password
                  </p>
                </Sidebar.Item>
                </Link>
                <Sidebar.Item
                  onClick={logout}
                  icon={HiLogout}
                >
                  <p >
                    Logout
                  </p>
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
  )
}

export default DashboardSlider

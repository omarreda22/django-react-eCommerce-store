
import { Tabs } from 'flowbite-react';
import { HiClipboardList } from 'react-icons/hi';
import { FaShippingFast} from 'react-icons/fa';
import { BsFillCartCheckFill} from 'react-icons/bs';


function CheckoutSteps({step2, active2, step3, active3}) {
    
  return (
        <Tabs.Group
        aria-label="Full width tabs"
        style="fullWidth"
        className='center text-center auto'
        >   
            
            <Tabs.Item
            icon={BsFillCartCheckFill}
            title="Cart"
            >
            </Tabs.Item>
            
            
            { step2 && active2 ? 
            <Tabs.Item
            active
            icon={FaShippingFast}
            title="Shipping"
            >
            </Tabs.Item>
            :
            step2 ? 
            <Tabs.Item
            icon={FaShippingFast}
            title="Shipping"
            >
            </Tabs.Item>
            :
            <Tabs.Item
            disabled
            icon={FaShippingFast}
            title="Shipping"
            >
            </Tabs.Item>
            }

            {
            
            step3 && active3 ? 
            
            <Tabs.Item
            active
            icon={HiClipboardList}
            title="Payment"
            >
            </Tabs.Item>
            :
            step3 ? 
            
            <Tabs.Item
            disabled
            icon={HiClipboardList}
            title="Payment"
            >
            </Tabs.Item>
            :
            <Tabs.Item
            disabled
            icon={HiClipboardList}
            title="Payment"
            >
            </Tabs.Item>
            }
            
        </Tabs.Group>
  )
}

export default CheckoutSteps

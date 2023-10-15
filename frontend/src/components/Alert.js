'use client';

import { Alert } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function AlertMessage({message, color, link, linkMessage}) {
    return (
        <div className="text-center mt-10">
            <Alert color={color}>
            <span className='text-center'>
                <p>
                {message}  <span className="font-medium"><Link to={link}>{linkMessage}</Link></span>
                </p>
            </span>
            </Alert>
        </div>
    )
}



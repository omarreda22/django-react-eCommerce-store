'use client';

import { Spinner } from 'flowbite-react';

export default function Loader() {
  return (
    <>
      
      <div className="text-center mt-14">
        <Spinner 
        aria-label="Extra large spinner example"
        size="xl"
        />
      </div>
     
    </>
  )
}



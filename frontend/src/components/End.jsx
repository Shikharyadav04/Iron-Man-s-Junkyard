import React from 'react'
import { assets } from '../assets/assets'

const End = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <div className="flex flex-col justify-between sm:flex-row sm:justify-between grid-cols-[3fr_1fr_1fr] gap-8 my-10 mt-40 text-sm">

            <div >
                <img src={assets.logo} className='mb-5 w-32' alt=''/>
                <p className='w-full md:w-2/3 text-white'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam rerum dolore quo cum consequuntur! Quibusdam aperiam, sunt officiis ipsum dolor suscipit quam tenetur labore odit, ad enim quae assumenda error.
                </p>
            </div>

            <div>
                <p className='text-xl font-medium  text-white mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-white'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium  text-white mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-white'>
                    <li>+1-212-456-7890</li>
                    <li>contact@ScrapMan.com</li>

                </ul>
            </div>



        </div>

        <div >
            <hr/>
            <p className='py-5 text-sm  text-white text-center'>Copyright 2024@ ScrapMan.com - All Right Reserved</p>

        </div>
    </div>
  )
}

export default End;
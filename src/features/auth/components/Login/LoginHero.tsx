'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faShield, faClock } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import loginCart from '../../../../assets/images/login-image.png';

export default function LoginHero() {
  return (
    <div className='w-full'>
        <div className='relative mb-8 flex justify-center'>
          <div className='w-100 h-100 max-w-sm relative flex items-center justify-center gradient-to-br from-green-50 to-white rounded-2xl lg:rounded-3xl shadow-lg lg:shadow-xl p-8 lg:p-12 transform transition-all hover:shadow-2xl duration-450'>
            <Image 
              src={loginCart} 
              alt='Fresh Groceries in Shopping Cart' 
              width={500}
              height={380}
              className='object-contain rounded-2xllg:rounded-3xl shadow-md'
              priority
            />
          </div>
        </div>
        <div className='text-center mb-8'>
          <h2 className='text-2xl lg:text-3xl font-bold text-gray-900 mb-3'>Fresh Groceries Delivered</h2>
          <p className='text-gray-600 text-sm lg:text-base leading-relaxed max-w-sm mx-auto'>
            Join thousands of happy customers who trust FreshCart for their daily grocery needs
          </p>
        </div>
        <div className='flex flex-wrap sm:flex-nowrap items-center justify-center gap-4 sm:gap-6 pt-4 border-t border-gray-200'>
          <div className='flex flex-col items-center gap-1'>
            <FontAwesomeIcon icon={faTruck} className='text-xl sm:text-2xl text-green-600' />
            <span className='text-xs sm:text-sm font-semibold text-gray-700'>Free Delivery</span>
          </div>
          <div className='hidden sm:block w-px h-8 bg-gray-300'></div>
          <div className='flex flex-col items-center gap-1'>
            <FontAwesomeIcon icon={faShield} className='text-xl sm:text-2xl text-green-600' />
            <span className='text-xs sm:text-sm font-semibold text-gray-700'>Secure Payment</span>
          </div>
          <div className='hidden sm:block w-px h-8 bg-gray-300'></div>
          <div className='flex flex-col items-center gap-1'>
            <FontAwesomeIcon icon={faClock} className='text-xl sm:text-2xl text-green-600' />
            <span className='text-xs sm:text-sm font-semibold text-gray-700'>24/7 Support</span>
          </div>
        </div>
      </div>
  );
}
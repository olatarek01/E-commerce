'use client';

import LoginForm from "../components/Login/LoginForm";
import LoginHero from "../components/Login/LoginHero";

export default function LoginScreen() {
  return (
    <>
      <div className='min-h-screen gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-8 sm:px-6 md:px-8'>
        <div className='w-full max-w-6xl'>
          {/* Main Container */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center'>
            
            {/* Left Section - Marketing Side */}
            <LoginHero />

            {/* Right Section - Login Form */}
            <div className='flex justify-center lg:justify-end'>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
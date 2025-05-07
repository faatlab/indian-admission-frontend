import React from 'react'
import pnfimg from "../../assets/pnf-page.svg"

function PageNotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-6">
      <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl w-full">
        {/* Left Side - Orange Oval Background with Text */}
        <div className="md:w-1/2 w-full relative flex items-center justify-center mb-10 md:mb-0 h-[500px] md:h-auto">
          <div className="absolute w-[100%] h-[150%]  blur-3xl  bg-orange-100 rounded-full z-0"></div>
          <div className="relative z-10 text-center md:text-left px-6 py-10">
            <h1 className="text-[100px] font-bold text-orange-500">404</h1>
            <h2 className="text-3xl font-medium text-gray-800 mb-4">OOOps! Page Not Found</h2>
            <p className="text-gray-600 mb-6">This page doesn’t exist or was removed!<br />We suggest you back to home</p>
            <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-full shadow-md">
              Back to homepage
            </button>
          </div>
        </div>

        {/* Right Side - Full Height Illustration */}
        <div className="md:w-1/2 w-full flex justify-center items-center">
          <img
            src={pnfimg}
            alt="Sad girl illustration"
            className="w-full h-[400px] md:h-screen object-contain"
          />
        </div>
      </div>
    </div>
  )
}

export default PageNotFound

import React from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaTwitter, FaInstagram, FaDiscord } from "react-icons/fa";


function Contactus() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 relative overflow-hidden">
    <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-2xl overflow-hidden shadow-xl relative z-10 p-3 ">
      {/* Left Section */}
      <div className="bg-orange-500 text-white p-8 md:w-1/2 flex flex-col justify-between relative overflow-hidden rounded-md ">
        {/* Orange background round design inside orange card */}
        <div className="absolute bottom-[-40px] right-[-40px] w-[160px] h-[160px] bg-orange-300 opacity-40 rounded-full z-0"></div>
        <div className="absolute bottom-10 right-10 w-[100px] h-[100px] bg-orange-200 opacity-30 rounded-full z-0"></div>

        <div className="relative z-10 p-5">
          <h2 className="text-4xl  mb-4">Contact Us</h2>
          <p className="mb-6">Any question or remarks? Just write us a message!</p>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <FaPhone />
              <span>+1012 3456 789</span>
            </div>
            <div className="flex items-center space-x-4">
              <FaEnvelope />
              <span>demo@gmail.com</span>
            </div>
            <div className="flex items-start space-x-4">
              <FaMapMarkerAlt />
              <span>132 Dartmouth Street Boston, Massachusetts 02156 United States</span>
            </div>
          </div>
        </div>
        <div className="mt-6 flex space-x-4 relative z-10 p-5">
          <FaTwitter />
          <FaInstagram />
          <FaDiscord />
        </div>
      </div>

      {/* Right Section */}
      <div className="bg-white p-8 md:w-1/2">
        <form className="space-y-4 flex flex-col h-full justify-between">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium ">First Name</label>
                <input type="text" placeholder='Enter First Name'  className="w-full border-b  text-slate-700 border-gray-300 outline-none py-1" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium">Last Name</label>
                <input type="text" defaultValue="Doe"  placeholder='Enter Last Name' className="w-full border-b text-slate-700 border-gray-300 outline-none py-1" />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium">Email</label>
                <input type="email" placeholder='Enter email' className="w-full border-b border-gray-300 text-slate-700 outline-none py-1" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium">Phone Number</label>
                <input type="text" placeholder='Enter Phone Number' defaultValue="+1 012 3456 789" className="w-full border-b text-slate-700 border-gray-300 outline-none py-1" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Message</label>
              <textarea rows="4" className="w-full border-b text-slate-700 border-gray-300 outline-none py-1" placeholder="Write your message.."></textarea>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white  py-2 px-6 rounded shadow"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Contactus

import React from 'react';
import forgotimg from '../../assets/forgotimg.svg';

function ForgotPassword() {
  return (
    <div>
      <div>
        <div
          className="w-full h-dvh bg-cover overflow-hidden min-h-screen flex flex-col md:flex-row justify-evenly"
          style={{
            backgroundImage: `url(${forgotimg})`,
          }}
        >
          {/* Left side - hidden on mobile */}
          <div className="hidden md:flex w-1/2 max-w-md flex-col justify-center h-full text-white">
            <h1 className="text-5xl font-bold mb-4">Building the Future...</h1>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Right side - Forgot Password Form */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-full md:w-3/5 md:ms-24 md:mt-24 mt-10 bg-white flex flex-col justify-center p-6 md:p-8 rounded-t-3xl md:rounded-ss-4xl md:rounded-se-4xl">
              <h2 className="text-2xl font-semibold mb-2">Forgot Password?</h2>
              <p className="pb-2 mb-4 text-gray-600 text-sm">
                Enter the email address associated with your account and we’ll
                send you a link to reset your password.
              </p>

              <form className="space-y-4 mt-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="you@example.com"
                    className="w-full border border-gray-300 text-sm rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-slate-500"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-900 text-white py-2 rounded-xl text-sm transition duration-200 cursor-pointer"
                >
                  Send Reset OTP
                </button>
              </form>

              {/* Back to login */}
              <div className="text-center text-sm mt-10">
                <a href="/login" className="text-blue-500 font-medium">
                  Back to login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

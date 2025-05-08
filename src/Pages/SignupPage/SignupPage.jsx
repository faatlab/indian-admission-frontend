import React, { useState } from "react";
import bgSignupImg from "../../assets/signupbg.svg";
import { HiEyeOff } from "react-icons/hi";
import { EyeIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import { frappe_url } from "../../constants/globalConstants";

function SignupPage() {
   const [showPassword, setShowPassword] = useState(false);
   const [formData, setFormData] = useState({
      full_name: "",
      email: "",
      password: "",
   });

   const getFormData = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(formData);
      
      try {
         const response  = await axios.post(frappe_url + "/api/method/indianadmission.api.student.signup_student",formData)
         console.log(response.data);
         // await createDoc("Student", formData)
         //    .then((res) => {
         //       console.log("User created successfully:", res);
         //    })
         //    .catch((error) => {
         //       console.error("Error creating user:", error);
         //    });
         // alert("User created successfully!");
      } catch (error) {
         console.error("Error creating user:", error);
         alert("Error creating user. Please try again.");
      }
   };
   return (
      <div>
         <div
            className="w-full h-dvh bg-cover overflow-hidden min-h-screen flex flex-col md:flex-row justify-evenly"
            style={{
               backgroundImage: `url(${bgSignupImg})`,
            }}
         >
            {/* Left side - HIDDEN on mobile */}
            <div className="hidden md:flex w-1/2 max-w-md flex-col justify-center h-full text-white">
               <h1 className="text-5xl font-bold mb-4">
                  Building the Future...
               </h1>
               <p className="text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
               </p>
            </div>

            {/* Right side with signup form */}
            <div className="w-full md:w-1/2 flex justify-center">
               <div className="w-full md:w-3/5 md:ms-24 md:mt-24 mt-10 bg-white flex flex-col justify-center p-6 md:p-8 rounded-t-3xl md:rounded-ss-4xl md:rounded-se-4xl">
                  <h2 className="text-2xl font-semibold mb-6">
                     Get Started Now
                  </h2>

                  <form className="space-y-4" onSubmit={handleSubmit}>
                     {/* Name */}
                     <div>
                        <label
                           htmlFor="name"
                           className="block text-sm font-medium text-gray-700 mb-1"
                        >
                           Name
                        </label>
                        <input
                           type="text"
                           id="name"
                           name="full_name"
                           onChange={getFormData}
                           placeholder="Enter your name"
                           className="w-full border text-sm border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-slate-500"
                        />
                     </div>

                     {/* Email */}
                     <div>
                        <label
                           htmlFor="email"
                           className="block text-sm font-medium text-gray-700 mb-1"
                        >
                           Email Address
                        </label>
                        <input
                           type="text"
                           id="email"
                           name="email"
                           onChange={getFormData}
                           placeholder="you@example.com"
                           className="w-full border text-sm border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-slate-500"
                        />
                     </div>

                     {/* Password with eye toggle */}
                     <div className="relative">
                        <label
                           htmlFor="password"
                           className="block text-sm font-medium text-gray-700 mb-1"
                        >
                           Password
                        </label>
                        <input
                           type={showPassword ? "text" : "password"}
                           id="password"
                           name="password"
                           onChange={getFormData}
                           placeholder="Enter your password"
                           className="relative w-full border text-sm border-gray-300 rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-slate-500"
                        />
                        <button
                           type="button"
                           onClick={() => setShowPassword(!showPassword)}
                           className="absolute right-3 top-1/2 items-center text-gray-500"
                           tabIndex={-1}
                        >
                           {showPassword ? (
                              <HiEyeOff className="h-5 w-5" />
                           ) : (
                              <EyeIcon className="h-5 w-5" />
                           )}
                        </button>
                     </div>

                     {/* Terms */}
                     <div className="flex items-center text-sm">
                        <input type="checkbox" id="terms" className="mr-2" />
                        <label htmlFor="terms">
                           I agree to the{" "}
                           <span className="font-medium">terms & policy</span>
                        </label>
                     </div>

                     {/* Submit */}
                     <button
                        type="submit"
                        className="w-full bg-black hover:bg-gray-900 text-white py-2 rounded-xl text-sm transition duration-200 cursor-pointer"
                     >
                        Signup
                     </button>
                  </form>

                  <div className="my-4 text-center text-sm text-gray-500">
                     or
                  </div>

                  <button className="w-full border text-sm rounded-xl py-2 flex items-center justify-center gap-2 cursor-pointer">
                     <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="w-5"
                     />
                     Sign in with Google
                  </button>

                  <div className="mt-10 text-center text-sm">
                     You already have an account?{" "}
                     <a href="/login" className="text-blue-600 font-medium">
                        Login
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default SignupPage;

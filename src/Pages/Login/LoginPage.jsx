import React, { useState } from "react";
import bgImage from "../../assets/login-bg.svg";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function LoginPage() {
   const frappe_url = import.meta.env.VITE_FRAPPE_URL;

   const navigate = useNavigate();

   const [showPassword, setShowPassword] = useState(false);
   const [formData, setFormData] = useState({
      email: "",
      password: "",
   });

   const getFormData = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const { email, password } = formData;
      if (!email || !password) {
         alert("Please fill in all fields.");
         return;
      } else {
         try {
            const res = (
               await axios.post(
                  `${frappe_url}/api/method/indianadmission.api.student_auth.verify_student_login`,
                  { email, password }
               )
            ).data.message;
            
            if (res.status === "200") {
               localStorage.setItem("authToken", res.token);
               toast.success(res.message);
               navigate("/");
            } else if (res.status === "404") {
               toast.error(res.message);
            } else if (res.status === "401") {
               toast.error(res.message);
            } else {
               toast.error("Something went wrong. Please try again later.");
            }
         } catch (error) {
            console.error("Error logging in:", error);
            toast.error("Something went wrong. Please try again later.");
         }
      }
   };

   return (
      <div>
         <div
            className="w-full h-dvh bg-cover overflow-hidden min-h-screen flex flex-col md:flex-row justify-evenly"
            style={{
               backgroundImage: `url(${bgImage})`,
            }}
         >
            {/* Left side - hidden on mobile */}
            <div className="hidden md:flex w-1/2 max-w-md flex-col justify-center h-full text-white">
               <h1 className="text-5xl font-bold mb-4">
                  Building the Future...
               </h1>
               <p className="text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
               </p>
            </div>

            {/* Right side with login form */}
            <div className="w-full md:w-1/2 flex justify-center">
               <div className="w-full md:w-3/5 md:ms-24 md:mt-24 mt-10 bg-white flex flex-col justify-center p-6 md:p-8 rounded-t-3xl md:rounded-ss-4xl md:rounded-se-4xl">
                  <h2 className="text-2xl font-semibold mb-2">Welcome back!</h2>
                  <p className="pb-2 mb-4 text-gray-600">
                     Enter your credentials to access your account
                  </p>

                  <form className="space-y-4" onSubmit={handleSubmit}>
                     {/* Email */}
                     <div>
                        <label
                           htmlFor="email"
                           className="block text-sm font-bold text-gray-700 mb-1"
                        >
                           Email Address
                        </label>
                        <input
                           type="text"
                           id="email"
                           name="email"
                           onChange={getFormData}
                           placeholder="you@example.com"
                           className="w-full border border-gray-300 text-sm rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-slate-500"
                        />
                     </div>

                     {/* Password */}
                     <div className="relative">
                        <label
                           htmlFor="password"
                           className="block text-sm font-bold text-gray-700 mb-1"
                        >
                           Password
                        </label>
                        <input
                           type={showPassword ? "text" : "password"}
                           id="password"
                           name="password"
                           onChange={getFormData}
                           placeholder="Enter your password"
                           className="w-full border text-sm border-gray-300 rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-slate-500"
                        />
                        <button
                           type="button"
                           onClick={() => setShowPassword((prev) => !prev)}
                           className="absolute right-3 top-[38px] text-gray-500"
                        >
                           {showPassword ? (
                              <EyeSlashIcon className="h-5 w-5" />
                           ) : (
                              <EyeIcon className="h-5 w-5" />
                           )}
                        </button>
                     </div>

                     {/* Remember Me */}
                     <div className="flex items-center text-sm">
                        <input type="checkbox" id="remember" className="mr-2" />
                        <label htmlFor="remember">
                           Remember for{" "}
                           <span className="font-medium">30 days</span>
                        </label>
                     </div>

                     {/* Submit */}
                     <button
                        type="submit"
                        className="w-full bg-black hover:bg-gray-900 text-white py-2 rounded-xl text-sm transition duration-200 cursor-pointer"
                     >
                        Login
                     </button>
                  </form>

                  {/* OR Divider */}
                  <div className="my-4 text-center text-sm text-gray-500">
                     or
                  </div>

                  {/* Google Sign-In */}
                  <button className="w-full border rounded-xl py-2 text-sm flex items-center justify-center gap-2 cursor-pointer">
                     <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="w-5 h-5"
                     />
                     Login with Google
                  </button>

                  <div className="text-center text-sm mt-10">
                     <a
                        href="/forgot-password"
                        className="text-blue-500 font-medium"
                     >
                        forgot your password?
                     </a>
                  </div>

                  {/* Sign up link */}
                  <div className="text-center text-sm mt-10">
                     New User?{" "}
                     <a
                        href="/signup"
                        className="font-semibold text-sm underline"
                     >
                        Sign up here
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default LoginPage;

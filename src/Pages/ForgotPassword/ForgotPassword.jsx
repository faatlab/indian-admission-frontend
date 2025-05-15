import React, { useEffect, useState } from "react";
import forgotimg from "../../assets/forgotimg.svg";
import { toast } from "sonner";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";

import axios from "axios";
import { useFrappeUpdateDoc } from "frappe-react-sdk";
import {
   api_key,
   api_secret,
   frappe_url,
} from "../../constants/globalConstants";

function ForgotPassword() {
   const [formData, setFormData] = useState({
      email: "",
      password: "",
      confirmPassword: "",
      otp: "",
   });

   const [user, setUser] = useState("");
   const [counter, setCounter] = useState(300); // Delay in seconds
   const [isResend, setIsResend] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const [otpStatus, setOtpStatus] = useState({
      toSend: true,
      requested: false,
      accepted: false,
   });

   const { updateDoc } = useFrappeUpdateDoc();

   const getFormData = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const requestOTP = async (e) => {
      e.preventDefault();
      setIsResend(false);
      setCounter(30);
      const { email } = formData;

      if (!email) {
         toast.error("Please enter email");
      } else {
         const response = await axios.get(
            `${frappe_url}/api/resource/Student`,
            {
               headers: {
                  Authorization: `token ${api_key}:${api_secret}`,
               },
               params: {
                  limit_page_length: 100,
                  fields: '["name","email"]', // optional
               },
            }
         );

         const isUser = response.data.data.filter(
            (item) => item.email === email
         );
         if (isUser.length > 0) {
            try {
               const res = await axios.post(
                  `${
                     import.meta.env.VITE_FRAPPE_URL
                  }/api/method/indianadmission.indianadmission.doctype.student.student.send_otp_email`,
                  { email }
               );
               if (res.status == 200) {
                  setUser(isUser[0].name);
                  toast.info(res.data.message.message);
                  setOtpStatus({
                     toSend: false,
                     requested: true,
                     accepted: false,
                  });
               }
            } catch (err) {
               console.error(err);
            }
         } else {
            toast.warning("The email is not registered");
         }
      }
   };

   const verifyOTP = async (e) => {
      e.preventDefault();
      try {
         const response = await axios.post(
            `${
               import.meta.env.VITE_FRAPPE_URL
            }/api/method/indianadmission.indianadmission.doctype.student.student.verify_otp`,
            {
               email: formData.email,
               entered_otp: formData.otp,
            }
         );

         const { status, message } = response.data.message;
         if (status == 200) {
            toast.info(message);
            setOtpStatus({
               toSend: false,
               requested: false,
               accepted: true,
            });
         } else if (status == 401) {
            toast.warning("Invalid OTP");
         } else if (status == 404) {
            toast.warning("Expired OTP");
         }
      } catch (err) {
         console.error(err);
      }
   };

   const handlePasswordUpdate = async (e) => {
      e.preventDefault();
      const { password, confirmPassword } = formData;

      if (!password || !confirmPassword) {
         toast.warning("Please enter new password");
      } else if (password !== confirmPassword) {
         toast.error("Passwords does not match");
      } else {
         await updateDoc("Student", user, { password })
            .then(() => toast.success("Password has been updated succesfully"))
            .catch((err) => console.error(err));
      }
   };

   useEffect(() => {
      if (counter > 0) {
         const timer = setTimeout(() => {
            setCounter(counter - 1);
         }, 1000);
         return () => clearTimeout(timer);
      } else {
         setIsResend(true);
      }
   }, [counter]);

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
               <div className="md:flex lg:w-1/2 flex-col justify-center h-full text-white lg:ps-30 pt-20 px-8">
                  <h1 className="text-5xl font-bold mb-4">
                     Start your future with the right education
                  </h1>
                  <p className="text-lg text-slate-300 mt-10">
                     Choose a path that empowers you — with trusted guidance,
                     quality learning, and a brighter tomorrow.
                  </p>
               </div>

               {/* Right side - Forgot Password Form */}
               <div className="w-full md:w-1/2 flex justify-center">
                  <div className="w-full md:w-3/5 md:ms-24 md:mt-24 mt-10 bg-white flex flex-col justify-center p-6 md:p-8 rounded-t-3xl md:rounded-ss-4xl md:rounded-se-4xl">
                     <h2 className="text-2xl font-semibold mb-2">
                        Forgot Password?
                     </h2>

                     {otpStatus.toSend && (
                        <>
                           <p className="pb-2 mb-4 text-gray-600 text-sm">
                              Enter the email address associated with your
                              account and we’ll send you a verification code to
                              reset your password.
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
                                    onChange={getFormData}
                                    name="email"
                                    placeholder="you@example.com"
                                    className="w-full border border-gray-300 text-sm rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-slate-500"
                                 />
                              </div>

                              {/* Submit */}
                              <button
                                 onClick={requestOTP}
                                 className="w-full bg-black hover:bg-gray-900 text-white py-2 rounded-xl text-sm transition duration-200 cursor-pointer"
                              >
                                 Request Verification code
                              </button>
                           </form>
                        </>
                     )}

                     {otpStatus.requested && (
                        <>
                           <p className="pb-2 mb-4 text-gray-600 text-sm">
                              We have sent a verification code to{" "}
                              <span className="font-black">
                                 {formData.email}
                              </span>
                              . Please check your{" "}
                              <span className="italic font-black">spam</span>{" "}
                              folder of your mail if you haven't received
                              verification mail yet.
                           </p>

                           <form className="space-y-4 mt-5">
                              {/* OTP */}
                              <div>
                                 <label
                                    htmlFor="otp"
                                    className="block text-sm font-bold text-gray-700 mb-1"
                                 >
                                    Verification code
                                 </label>
                                 <input
                                    type="text"
                                    id="otp"
                                    onChange={getFormData}
                                    name="otp"
                                    placeholder="⁕ ⁕ ⁕ ⁕ ⁕ ⁕"
                                    className="w-full border border-gray-300 text-sm rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-slate-500"
                                 />
                              </div>

                              {/* Submit */}
                              <button
                                 type="submit"
                                 onClick={verifyOTP}
                                 className="w-full bg-black hover:bg-gray-900 text-white py-2 rounded-xl text-sm transition duration-200 cursor-pointer"
                              >
                                 Verify your code
                              </button>
                              {isResend ? (
                                 <div className="text-center text-sm text-slate-500 mt-4">
                                    Didn't receive code?{" "}
                                    <button
                                       className="cursor-pointer font-medium text-indigo-500 hover:text-indigo-600"
                                       onClick={requestOTP}
                                    >
                                       Resend code
                                    </button>
                                 </div>
                              ) : (
                                 <div className="text-center text-sm text-slate-500 mt-4">
                                    Didn't receive code? Request in{" "}
                                    <span className="text-indigo-500 font-bold">
                                       {counter}
                                    </span>
                                 </div>
                              )}
                           </form>
                        </>
                     )}

                     {otpStatus.accepted && (
                        <>
                           <p className="pb-2 mb-4 text-gray-600 text-sm">
                              We have successfully verified your account linked
                              with
                              <span className="font-black">
                                 {formData.email}
                              </span>
                              . You can now enter your new password for your
                              account.
                           </p>

                           <form className="space-y-4 mt-5">
                              {/* Password */}
                              <div>
                                 <label
                                    htmlFor="password"
                                    className="block text-sm font-bold text-gray-700 mb-1"
                                 >
                                    New Password
                                 </label>
                                 <div className="relative">
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
                                       onClick={() =>
                                          setShowPassword((prev) => !prev)
                                       }
                                       className="absolute right-3 top-2 text-gray-500"
                                    >
                                       {showPassword ? (
                                          <EyeSlashIcon className="h-5 w-5" />
                                       ) : (
                                          <EyeIcon className="h-5 w-5" />
                                       )}
                                    </button>
                                 </div>
                                 <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-bold text-gray-700 my-1"
                                 >
                                    Confirm Password
                                 </label>
                                 <div className="relative">
                                    <input
                                       type={
                                          showConfirmPassword
                                             ? "text"
                                             : "password"
                                       }
                                       id="confirmPassword"
                                       name="confirmPassword"
                                       onChange={getFormData}
                                       placeholder="Enter your password"
                                       className="relative w-full border text-sm border-gray-300 rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-slate-500"
                                    />
                                    <button
                                       type="button"
                                       onClick={() =>
                                          setShowConfirmPassword(
                                             (prev) => !prev
                                          )
                                       }
                                       className="absolute right-3 top-2 text-gray-500"
                                    >
                                       {showConfirmPassword ? (
                                          <EyeSlashIcon className="h-5 w-5" />
                                       ) : (
                                          <EyeIcon className="h-5 w-5" />
                                       )}
                                    </button>
                                 </div>
                              </div>

                              {/* Submit */}
                              <button
                                 type="button"
                                 onClick={handlePasswordUpdate}
                                 className="w-full bg-black hover:bg-gray-900 text-white py-2 rounded-xl text-sm transition duration-200 cursor-pointer"
                              >
                                 Update Password
                              </button>
                           </form>
                        </>
                     )}
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

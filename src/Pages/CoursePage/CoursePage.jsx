import React, { useEffect, useState } from "react";
import save from "../../assets/save.svg";

import {
   FaStar,
   FaStarHalfAlt,
   FaRegBookmark,
   FaClipboardList,
} from "react-icons/fa";
import course1 from "../../assets/course1.svg";

import FooterComponent from "../../components/FooterComponent/FooterComponent";
import axios from "axios";
import { api_url } from "../../constants/globalConstants";
import { useLocation, useNavigate } from "react-router-dom";

function CoursePage() {
   const totalStars = 5;
   const location = useLocation();
   const navigate = useNavigate();
   const queryParams = new URLSearchParams(location.search);
   const course_id = queryParams.get("course_id");
   const [courseData, setCourseData] = useState([]);

   const renderStars = (rating) =>
      Array.from({ length: totalStars }).map((_, i) => (
         <span
            key={i}
            className={`text-sm ${
               i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
         >
            ★
         </span>
      ));

   const getCourseData = async () => {
      try {
         const response = await axios.get(`${api_url}/courses`, {
            params: {
               course_id,
            },
         });
         setCourseData(response.data.data[0]);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      if (!course_id) {
         navigate(-1);
      } else {
         getCourseData();
      }
   }, [course_id]);

   return (
      <div>
         <div className="flex justify-between items-center mx-10 lg:mx-30 my-10 lg:my-20 ">
            <h2 className="text-2xl lg:text-3xl font-black text-[#535353]">About Course</h2>{" "}
         </div>
         {/* apply_now_section */}
         <div className="flex justify-center w-full">
            <div className="max-w-sm lg:max-w-3xl w-full">
               {/* Top card: title, duration, stars, image */}
               <div className="relative md:flex bg-gray-100 p-2 rounded-t-xl">
                  <div className="flex-1 ms-5">
                     <h2 className="text-2xl font-semibold text-gray-800 mt-5 ">
                        {courseData.course_name}
                     </h2>
                     <div className="flex items-center text-gray-600 mt-2">
                        <FaClipboardList className="text-gray-400 mr-1" />
                        <span className="text-sm">4 Years</span>
                     </div>
                  </div>
                  <img
                     className="h-24 w-full object-cover md:w-40 md:h-auto rounded-r-xl"
                     src={course1}
                     alt="Course thumbnail"
                  />
                  <FaRegBookmark className="absolute bottom-4 right-4 text-gray-400" />
               </div>

               {/* Info box: cutoffs and description */}
               <div className="border border-orange-300 rounded-b-xl p-4">
                  <div className="flex flex-col md:flex-row">
                     <div className="md:w-1/2">
                        <h3 className="text-lg font-bold text-gray-800">
                           Cutoffs
                        </h3>
                        <div className="mt-2 space-y-1">
                           <div className="flex justify-between">
                              <span>10th:</span>
                              <span className="text-orange-500">6</span>
                           </div>
                           <div className="flex justify-between">
                              <span>Class 12:</span>
                              <span className="text-orange-500">75</span>
                           </div>
                        </div>
                     </div>
                     <div className="md:w-1/2 md:pl-6 mt-4 md:mt-0">
                        <h3 className="text-lg font-bold text-gray-800">
                           Description
                        </h3>
                        <div className="mt-2 space-y-1">
                           <div className="flex justify-between">
                              <span>Duration:</span>
                              <span className="text-orange-500">36 Months</span>
                           </div>
                           <div className="flex justify-between">
                              <span>Level:</span>
                              <span className="text-orange-500">
                                 Bachelors Program
                              </span>
                           </div>
                           <div className="flex justify-between">
                              <span>Tuition &amp; fees:</span>
                              <span className="text-orange-500">₹3.5L</span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <p className="text-sm text-red-300 text-right italic mt-4">
                     *Tuition &amp; expenses may vary
                  </p>
               </div>

               {/* Apply button */}
               <div className="flex justify-end mt-4">
                  <button
                     onClick={() =>
                        navigate(`/application-form/${courseData.course_id}`)
                     }
                     className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-full"
                  >
                     Apply now
                  </button>
               </div>
            </div>
         </div>

         {/* Recommended courses section */}
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-8 lg:px-20 py-6 sm:py-10 gap-4">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#535353]">
               Recommended courses
            </h2>
         </div>

         <div className="flex flex-wrap justify-center gap-4 mt-3 mb-20 px-4">
            {/* Card 1 */}
            <div className="flex flex-col sm:flex-row w-full sm:max-w-md rounded-xl overflow-hidden shadow-md bg-white">
               <div className="flex flex-col justify-between p-4 flex-1">
                  <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-3">
                     Bachelor of Computer Applications
                  </h2>
                  <div className="flex items-center space-x-1">
                     {renderStars(3)}
                     <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                        <img src={save} alt="Save icon" />
                     </span>
                  </div>
               </div>
               <img
                  src={course1}
                  alt="BCA"
                  className="w-full sm:w-40 h-40 object-cover"
               />
            </div>

            {/* Card 2 */}
            <div className="flex flex-col sm:flex-row w-full sm:max-w-md rounded-xl overflow-hidden shadow-md bg-white">
               <div className="flex flex-col justify-between p-4 flex-1">
                  <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-3">
                     Bachelor of Computer Applications
                  </h2>
                  <div className="flex items-center space-x-1">
                     {renderStars(3)}
                     <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                        <img src={save} alt="Save icon" />
                     </span>
                  </div>
               </div>
               <img
                  src={course1}
                  alt="BCA"
                  className="w-full sm:w-40 h-40 object-cover"
               />
            </div>

            {/* Card 3 */}
            <div className="flex flex-col sm:flex-row w-full sm:max-w-md rounded-xl overflow-hidden shadow-md bg-white">
               <div className="flex flex-col justify-between p-4 flex-1">
                  <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-3">
                     Bachelor of Computer Applications
                  </h2>
                  <div className="flex items-center space-x-1">
                     {renderStars(3)}
                     <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                        <img src={save} alt="Save icon" />
                     </span>
                  </div>
               </div>
               <img
                  src={course1}
                  alt="BCA"
                  className="w-full sm:w-40 h-40 object-cover"
               />
            </div>

            {/* Card 4 */}
            <div className="flex flex-col sm:flex-row w-full sm:max-w-md rounded-xl overflow-hidden shadow-md bg-white">
               <div className="flex flex-col justify-between p-4 flex-1">
                  <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-3">
                     Bachelor of Computer Applications
                  </h2>
                  <div className="flex items-center space-x-1">
                     {renderStars(3)}
                     <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                        <img src={save} alt="Save icon" />
                     </span>
                  </div>
               </div>
               <img
                  src={course1}
                  alt="BCA"
                  className="w-full sm:w-40 h-40 object-cover"
               />
            </div>

            {/* Card 5 */}
            <div className="flex flex-col sm:flex-row w-full sm:max-w-md rounded-xl overflow-hidden shadow-md bg-white">
               <div className="flex flex-col justify-between p-4 flex-1">
                  <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-3">
                     Bachelor of Computer Applications
                  </h2>
                  <div className="flex items-center space-x-1">
                     {renderStars(3)}
                     <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                        <img src={save} alt="Save icon" />
                     </span>
                  </div>
               </div>
               <img
                  src={course1}
                  alt="BCA"
                  className="w-full sm:w-40 h-40 object-cover"
               />
            </div>

            {/* Card 6 */}
            <div className="flex flex-col sm:flex-row w-full sm:max-w-md rounded-xl overflow-hidden shadow-md bg-white">
               <div className="flex flex-col justify-between p-4 flex-1">
                  <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-3">
                     Bachelor of Computer Applications
                  </h2>
                  <div className="flex items-center space-x-1">
                     {renderStars(3)}
                     <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                        <img src={save} alt="Save icon" />
                     </span>
                  </div>
               </div>
               <img
                  src={course1}
                  alt="BCA"
                  className="w-full sm:w-40 h-40 object-cover"
               />
            </div>
         </div>
      </div>
   );
}

export default CoursePage;

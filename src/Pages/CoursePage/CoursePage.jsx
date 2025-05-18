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
   const location = useLocation();
   const navigate = useNavigate();
   const queryParams = new URLSearchParams(location.search);
   const course_id = queryParams.get("course_id");
   const [courseData, setCourseData] = useState([]);
   const [similarCourses, setSimilarCourses] = useState([]);   

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

   const getSimilarCourses = async () => {
      try {
         const response = await axios.get(`${api_url}/courses/india`, {
            params: {
               similar: courseData.course_name,
               limit: 6,
            },
         });

         if (response.status == 200) {
            setSimilarCourses(response.data.data);
         }
      } catch (error) {
         console.error("Error fetching courses:", error);
      }
   };

   useEffect(() => {
      if (!course_id) {
         navigate(-1);
      } else {
         getCourseData();
      }
   }, [course_id]);

   useEffect(() => {
      getSimilarCourses();
   }, [courseData]);
   return (
      <div>
         <div className="flex justify-between items-center mx-10 lg:mx-30 my-10 lg:my-8 ">
            <h2 className="text-2xl lg:text-3xl font-black text-[#535353]">
               About Course
            </h2>{" "}
         </div>
         {/* apply_now_section */}
         <div className="flex justify-center w-full">
            <div className="max-w-sm lg:max-w-3xl w-full px-2">
               {/* Top card: title, duration, stars, image */}
               <div className="relative md:flex bg-gray-100 p-2 rounded-t-xl">
                  <div className="flex-1 ms-5 my-5">
                     <h2 className="text-2xl font-semibold text-gray-800 mb-3 ">
                        {courseData.course_name}
                     </h2>
                     <p>{courseData.college_name}</p>
                  </div>
                  <img
                     className="h-24 w-full object-cover md:w-40 md:h-auto rounded-b-xl md:rounded-b-none md:rounded-r-xl"
                     src={course1}
                     alt="Course thumbnail"
                  />
                  <FaRegBookmark className="absolute bottom-4 right-4 text-gray-400" />
               </div>

               {/* Info box: cutoffs and description */}
               <div className="border border-orange-300 rounded-b-xl p-4">
                  <div className="flex flex-col md:flex-row">
                     <div className=" md:pl-6 mt-4 md:mt-0">
                        <h3 className="text-lg font-bold text-gray-800">
                           Description
                        </h3>
                        <div className="mt-2 space-y-1">
                           <div className="flex justify-between">
                              <span>Duration:</span>
                              <span className="text-orange-500">
                                 {courseData.course_duration}
                              </span>
                           </div>
                           {courseData.course_details?.map((c) => (
                              <>
                                 <div className="flex justify-between">
                                    <span>Seats:</span>
                                    <span className="text-orange-500">
                                       {c.seats}
                                    </span>
                                 </div>
                                 <div className="flex justify-between">
                                    <span>Exam:</span>
                                    <span className="text-orange-500">
                                       {c.exam}
                                    </span>
                                 </div>
                                 <div className="flex justify-between">
                                    <span>Tuition &amp; fees:</span>
                                    <span className="text-orange-500">
                                       {c.total_fees}
                                    </span>
                                 </div>
                              </>
                           ))}
                           {courseData.course_eligibility && (
                              <>
                                 <div className="border border-gray-300/50"></div>
                                 <p>Eligibility:</p>
                                 <p className="text-slate-500 text-sm">
                                    {courseData.course_eligibility}
                                 </p>
                              </>
                           )}
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
            {similarCourses.map((course) => (
               <div
                  key={course.course_id}
                  onClick={() =>
                     navigate(
                        `/course/${course.course_name}?course_id=${course.course_id}`
                     )
                  }
                  className="flex w-full max-w-sm lg:max-w-md rounded-xl overflow-hidden shadow-md bg-white gap-2 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer"
               >
                  <div className="flex flex-col justify-between p-4 flex-1">
                     <h2 className="text-lg font-semibold text-gray-800 mb-3">
                        {course.course_name}
                     </h2>
                     <h4 className="text-sm text-gray-600">
                        {course.college_name}
                     </h4>
                     <p className="flex items-center space-x-1 opacity-50 text-xs">
                        {course.course_in_state}
                     </p>
                  </div>
                  <img src={course1} alt="BCA" className="w-40 object-cover" />
               </div>
            ))}
         </div>
      </div>
   );
}

export default CoursePage;

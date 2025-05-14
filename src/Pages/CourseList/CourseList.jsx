import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import course1 from "../../assets/course1.svg";
import course2 from "../../assets/course2.svg";
import course3 from "../../assets/course3.svg";
import save from "../../assets/save.svg";
import axios from "axios";
import { api_url } from "../../constants/globalConstants";
import { toast } from "sonner";

function CourseList() {
   const [courses, setCourses] = useState([]);
   const [pageNum, setPageNum] = useState(1);
   const totalStars = 5;
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

   const [searchParams] = useSearchParams();

   const search_query = searchParams.get("search_query") || "";
   const selected_state = searchParams.get("selected_state") || "";

   const getAllCourses = async () => {
      try {
         const response = await axios.get(`${api_url}/courses/india`, {
            params: {
               page: pageNum,
            },
         });
         if (response.status == 200) {
            setCourses(response.data.data);
         } else {
            toast.info("Error fetching courses, please try again later.");
         }
      } catch (error) {
         console.error("Error fetching courses:", error);
      }
   };

   const getSeachedCourses = async () => {
      try {
         const response = await axios.get(`${api_url}/courses/india`, {
            params: {
               search_query,
               selected_state,
               page: pageNum,
            },
         });
         console.log(response);

         if (response.status == 200) {
            setCourses(response.data.data);
         } else {
            toast.info("Error fetching courses, please try again later.");
         }
      } catch (error) {
         console.error("Error fetching courses:", error);
      }
   };

   useEffect(() => {
      if (!search_query && !selected_state) {
         getAllCourses();
      } else {
         getSeachedCourses();
      }
   }, [pageNum]);

   return (
      <div>
         <div className="flex justify-between items-center mx-20 mt-20">
            <h2 className="text-3xl font-black text-[#535353]">
               Trending Courses
            </h2>{" "}
         </div>
         {search_query && selected_state && (
            <div className="searchInfo mx-20 my-10">
               <p className="text-xl">
                  Showing for "
                  <span className="text-orange-400 font-black">
                     {search_query}
                  </span>
                  " in "
                  <span className="text-orange-400 font-black">
                     {selected_state}
                  </span>
                  "
               </p>
            </div>
         )}
         <div className=" flex flex-row items-center gap-6 justify-center flex-wrap mt-3 mb-20">
            {/* Card 1 */}
            {courses.map((course) => (
               <div
                  key={course.course_id}
                  className="flex w-full max-w-md rounded-xl overflow-hidden shadow-md bg-white gap-2"
               >
                  <div className="flex flex-col justify-between p-4 flex-1">
                     <h2 className="text-lg font-semibold text-gray-800 mb-3">
                        {course.course_name}
                     </h2>
                     <h4 className="text-sm text-gray-600">
                        {course.college_name}
                     </h4>
                     <div className="flex items-center space-x-1 opacity-50 text-xs">
                        {course.course_in_state}
                        <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                           <img src={save} alt="" />
                        </span>
                     </div>
                  </div>
                  <img src={course1} alt="BCA" className="w-40 object-cover" />
               </div>
            ))}
         </div>

         <div className="w-full flex justify-center mt-10 mb-17">
            <div className="flex space-x-4">
               <button className="px-6 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition">
                  previous page
               </button>
               <button
                  onClick={() => setPageNum(pageNum + 1)}
                  className="px-6 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition"
               >
                  Next Page
               </button>
            </div>
         </div>
      </div>
   );
}

export default CourseList;

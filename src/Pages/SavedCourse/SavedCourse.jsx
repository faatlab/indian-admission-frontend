import React, { useContext, useEffect, useState } from "react";
import save from "../../assets/save.svg";
import saved from "../../assets/saved.svg";

import {
   FaStar,
   FaStarHalfAlt,
   FaRegBookmark,
   FaClipboardList,
} from "react-icons/fa";
import course1 from "../../assets/course1.svg";
import { AuthContext } from "../../context/AuthProvider";
import { useFrappeGetDoc } from "frappe-react-sdk";
import axios from "axios";
import { api_url } from "../../constants/globalConstants";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function SavedCourse() {
   const [courses, setCourses] = useState([]);
   const { user } = useContext(AuthContext);
   const { data } = useFrappeGetDoc("Student", user);
   const navigate = useNavigate();

   const saved_courses_arr = data?.saved_courses
      ?.map((c) => c.course_id)
      .join(",");

   const getSavedCourses = async () => {
      try {
         if (saved_courses_arr.length > 0) {
            const response = await axios.get(`${api_url}/courses`, {
               params: {
                  saved_courses_arr,
               },
            });
            if (response.status == 200) {
               setCourses(response.data.data);
            } else {
               toast.info("Error fetching courses, please try again later.");
            }
         }
      } catch (error) {
         console.error("Error fetching courses:", error);
      }
   };

   useEffect(() => {
      getSavedCourses();
   }, [data]);

   return (
      <div>
         <div>
            <div className="flex justify-between items-center mx-4 lg:mx-30 my-20 ">
               <h2 className="text-3xl font-black text-[#535353]">
                  Saved Courses
               </h2>{" "}
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-3 mb-20 px-4">
               {/* Card 1 */}
               {courses.length > 0 ? (
                  <>
                     {courses.map((course) => (
                        <div
                           key={course.course_id}
                           className="flex w-full max-w-md rounded-xl overflow-hidden shadow-md bg-white gap-2"
                        >
                           <div
                              onClick={() =>
                                 navigate(
                                    `/course/${course.course_name}?course_id=${course.course_id}`
                                 )
                              }
                              className="flex flex-col justify-between p-4 flex-1"
                           >
                              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                                 {course.course_name}
                              </h2>
                              <h4 className="text-sm text-gray-600">
                                 {course.college_name}
                              </h4>
                              <div className="flex items-center space-x-1 opacity-50 text-xs">
                                 {course.course_in_state}
                              </div>
                           </div>
                           <img
                              src={course1}
                              alt="BCA"
                              className="w-full sm:w-40 h-full object-cover"
                           />
                        </div>
                     ))}
                  </>
               ) : (
                  <>
                     <div>
                        <p>You have not applied for any course yet.</p>
                     </div>
                  </>
               )}
            </div>
         </div>
      </div>
   );
}

export default SavedCourse;

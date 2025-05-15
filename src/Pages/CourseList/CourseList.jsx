import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import course1 from "../../assets/course1.svg";
import course2 from "../../assets/course2.svg";
import course3 from "../../assets/course3.svg";
import save from "../../assets/save.svg";
import saved from "../../assets/saved.svg";
import axios from "axios";
import { api_url } from "../../constants/globalConstants";
import { toast } from "sonner";
import { AuthContext } from "../../context/AuthProvider";
import { useFrappeGetDoc, useFrappeUpdateDoc } from "frappe-react-sdk";

function CourseList() {
   const { user } = useContext(AuthContext);
   const [courses, setCourses] = useState([]);
   const [pageNum, setPageNum] = useState(1);
   const navigate = useNavigate();
   const { data, mutate } = useFrappeGetDoc("Student", user);
   const { updateDoc } = useFrappeUpdateDoc();

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

         if (response.status == 200) {
            setCourses(response.data.data);
         } else {
            toast.info("Error fetching courses, please try again later.");
         }
      } catch (error) {
         console.error("Error fetching courses:", error);
      }
   };

   const handleSaveCourse = (courseData) => {
      try {
         if (user) {
            const saved_courses = Array.isArray(data?.saved_courses)
               ? [...data.saved_courses]
               : [];

            const isSaved = saved_courses.filter(
               (course) => course.course_id === courseData.course_id
            );

            if (isSaved.length < 1) {
               saved_courses.push({
                  course_id: courseData.course_id,
                  course_name: courseData.course_name,
                  college_id: courseData.college_id,
                  college_name: courseData.college_name,
               });
               updateDoc("Student", user, { saved_courses })
                  .then(() => {
                     mutate();
                     toast.success("Course has been saved");
                  })
                  .catch((err) => {
                     toast.info("Course was not saved, please try again later");
                     console.error(err);
                  });
            } else {
               toast.info("You have already saved this course");
            }
         } else {
            toast.error("You have to log in to save courses");
         }
      } catch (error) {
         toast.info("Some internal error, please try again later");
         console.error(error);
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
         <div className="flex justify-between items-center mx-5 lg:mx-20 my-10 lg:my-20">
            <h2 className="text-3xl font-black text-[#535353]">
               Browse Through Courses
            </h2>{" "}
         </div>
         {search_query && selected_state && (
            <div className="searchInfo mx-10 lg:mx-20 mb-10">
               <p className="text-xl">
                  Showing results for "
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
         {/* Card 1 */}
         {courses.length > 1 ? (
            <>
               <div className=" flex flex-row items-center gap-6 justify-center flex-wrap mt-3 mb-20">
                  {courses.map((course) => (
                     <div
                        key={course.course_id}
                        className="flex w-full max-w-sm lg:max-w-md rounded-xl overflow-hidden shadow-md bg-white gap-2"
                     >
                        <div
                           className="flex flex-col justify-between p-4 flex-1"
                           onClick={() =>
                              navigate(
                                 `/course/${course.course_name}?course_id=${course.course_id}`
                              )
                           }
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
                        <div className="flex items-end">
                           <span
                              className="pb-3 w-full text-gray-600 text-lg cursor-pointer"
                              onClick={() => handleSaveCourse(course)}
                           >
                              {data?.saved_courses?.filter(
                                 (cou) => cou.course_id === course.course_id
                              ).length > 0 ? (
                                 <span
                                    class="material-symbols-outlined"
                                    style={{ fontSize: "32px" }}
                                 >
                                    bookmark_check
                                 </span>
                              ) : (
                                 <span
                                    class="material-symbols-outlined"
                                    style={{ fontSize: "32px" }}
                                 >
                                    bookmark
                                 </span>
                              )}
                           </span>
                        </div>
                        <img
                           src={course1}
                           alt="BCA"
                           className="w-40 object-cover"
                        />
                     </div>
                  ))}
               </div>
               <div className="w-full flex justify-center mt-10 mb-17">
                  <div className="flex space-x-4">
                     <button
                        disabled={pageNum > 1 ? false : true}
                        onClick={() => {
                           if (pageNum > 1) {
                              setPageNum(pageNum - 1);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                           }
                        }}
                        className="px-6 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                     >
                        Previous Page
                     </button>
                     <button
                        onClick={() => {
                           setPageNum(pageNum + 1);
                           window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="px-6 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition cursor-pointer"
                     >
                        Next Page
                     </button>
                  </div>
               </div>
            </>
         ) : (
            <>
               <div className=" flex flex-row items-center gap-6 justify-center flex-wrap mt-3 mb-20">
                  <p className="text-lg text-gray-500 mx-10">
                     Sorry but we currently do not have the course you are
                     looking for
                  </p>
               </div>
            </>
         )}
      </div>
   );
}

export default CourseList;

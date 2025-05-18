import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import university2 from "../../assets/university2.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { api_url } from "../../constants/globalConstants";
import axios from "axios";

function CollegePage() {
   const location = useLocation();
   const navigate = useNavigate();
   const queryParams = new URLSearchParams(location.search);
   const college_id = queryParams.get("college_id");

   const [collegeData, setCollegeData] = useState([]);

   const getCollegeData = async () => {
      try {
         const response = await axios.get(`${api_url}/colleges/india`, {
            params: {
               college_id,
            },
         });
         setCollegeData(response.data.data[0]);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      if (!college_id) {
         navigate(-1);
      } else {
         getCollegeData();
      }
   }, [college_id]);

   return (
      <div className="p-4 md:p-8 min-h-screen bg-gray-50 font-sans">
         {/* Institution Info */}
         <div className="p-5 rounded-2xl bg-gradient-to-r from-orange-50 to-white border border-orange-200 shadow hover:shadow-md transition-all flex items-center justify-between">
            <div>
               <p className="text-base font-medium text-gray-800">
                  {collegeData.col_name}
               </p>
               <p className="text-sm text-gray-500">
                  {collegeData.col_location}
               </p>
            </div>
            <img
               src={collegeData.col_image_url}
               alt="IIT Madras Logo"
               className="w-14 h-14 object-contain"
            />
         </div>

         <div className="py-5 lg:px-10">
            <h3 className="text-xl font-black mb-2">About College</h3>
            <p className="text-slate-500 px-5 text-sm">
               {collegeData.col_description}
            </p>
         </div>

         {/* Course Cards */}
         <h3 className="text-xl font-black mb-2 lg:px-10">All Courses <span className="text-xs md:text-sm font-normal text-slate-400">({collegeData.col_courses?.length} courses)</span></h3>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {collegeData?.col_courses?.map((course, index) => (
               <div
                  key={index}
                  onClick={() =>
                     navigate(
                        `/course/${course.name}?course_id=${
                           collegeData.col_id
                        }_course_${index + 1}`
                     )
                  }
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-6 w-full max-w-sm mx-auto border border-gray-100 cursor-pointer"
               >
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                     {course.name}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                     <div className="flex justify-between">
                        <span className="text-gray-500">Duration</span>
                        <span className="text-blue-600 font-medium">
                           {course.duration || "N/A"}
                        </span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-gray-500">Seats</span>
                        <span className="text-blue-600 font-medium">
                           {course.details?.seats || "N/A"}
                        </span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-gray-500">
                           Tuition Fee (1st Year)
                        </span>
                        <span className="text-blue-600 font-medium">
                           ₹ {course.details?.total_fees || "N/A"}
                        </span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-gray-500">Exam</span>
                        <span className="text-blue-600 font-medium">
                           {course.details?.exam || "N/A"}
                        </span>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}

export default CollegePage;

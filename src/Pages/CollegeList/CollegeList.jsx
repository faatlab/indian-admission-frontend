import axios from "axios";
import React, { useEffect, useState } from "react";
import { api_url } from "../../constants/globalConstants";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function CollegeList() {
   const [pageNum, setPageNum] = useState(1);
   const [colleges, setColleges] = useState([]);

   const navigate = useNavigate();

   const getAllColleges = async () => {
      try {
         const response = await axios.get(`${api_url}/colleges/india`, {
            params: {
               page: pageNum,
            },
         });

         if (response.status == 200) {
            setColleges(response.data.data);
         } else {
            toast.info("Error fetching courses, please try again later.");
         }
      } catch (error) {
         console.error("Error fetching courses:", error);
      }
   };

   useEffect(() => {
      getAllColleges();
   }, [pageNum]);

   return (
      <div>
         <div className="flex justify-between items-center mx-5 lg:mx-20 my-10 lg:my-20">
            <h2 className="text-3xl font-black text-[#535353]">
               Browse Through Colleges
            </h2>{" "}
         </div>
         <div className="flex flex-wrap justify-center gap-12">
            {colleges.map((college) => (
               <div
                  key={college.col_id}
                  onClick={() =>
                     navigate(
                        `/college/${college.col_name}/?college_id=${college.col_id}`
                     )
                  }
                  data-aos="fade-up"
                  className=" bg-white shadow-lg rounded-[28px] overflow-hidden p-5  max-w-sm w-[18rem] h-[22rem] hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer"
               >
                  <div className="p-4 h-30">
                     <img
                        className="h-20 w-20 object-fill"
                        src={college.col_image_url}
                        alt="University"
                     />
                     <div className="w-full h-[3px] bg-[#046A38] opacity-50 mt-5 rounded"></div>
                  </div>
                  <div className="p-4">
                     <h2 className="text-base font-bold text-gray-800">
                        {college.col_name}
                     </h2>
                     <p className="text-gray-600 mt-5">
                        {college.col_location}
                     </p>
                     <button
                        type="button"
                        className="mt-5 py-2.5 px-5 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:outline-none focus:ring-4 focus:ring-gray-100"
                     >
                        {college.col_name.length - 1}+ Courses
                     </button>
                  </div>
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
      </div>
   );
}

export default CollegeList;

import React from "react";
import saved from '../../assets/saved.svg';

import course1 from '../../assets/course1.svg';


function AppliedCourse() {
   return (
      <div>
         <div>
            <div className="flex justify-between items-center mx-30 my-20 ">
               <h2 className="text-3xl font-black text-[#535353]">
                  Applied course list
               </h2>{" "}
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-3 mb-20 px-4">
               {/* Card 1 */}
               <div className="flex flex-col sm:flex-row w-full sm:max-w-md rounded-xl overflow-hidden shadow-md bg-white">
                  <div className="flex flex-col justify-between p-4 flex-1">
                     <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-3">
                        Bachelor of Computer Applications
                     </h2>
                     <div className="flex items-center space-x-1">
                        <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                           <img src={saved} alt="Save icon" />
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
      </div>
   );
}

export default AppliedCourse;

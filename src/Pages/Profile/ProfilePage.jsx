import React, { useContext, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFrappeGetDoc } from "frappe-react-sdk";
import { AuthContext } from "../../context/AuthProvider";

function ProfilePage() {
   const { user } = useContext(AuthContext);
   const { data, error } = useFrappeGetDoc("Student", user);

   const [isEditing, setIsEditing] = useState(false);

   const [isUploaded, setIsUploaded] = useState(false);
   const [isHovering, setIsHovering] = useState(false);
   const [formData, setFormData] = useState({
      full_name: "",
      email: "",
      phone_number: "",
      nationality: "",
      gender: "",
   });

   const getBorderClass = () => {
      if (isUploaded) {
         return isHovering ? "border-red-300" : "border-green-300";
      }
      return "border-dashed border-gray-300 hover:border-orange-500";
   };

   const today = new Date().toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "long",
      year: "numeric",
   });

   const getFormData = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const handleUpload = (e) => {
      const file = e.target.files[0];
      console.log(file);
      
   };

   return (
      <div className="min-h-screen bg-white px-6 py-8 md:px-16 w-3/4 mx-auto mt-15">
         <div className="flex justify-between items-start flex-wrap gap-y-4">
            <div>
               <h1 className="text-2xl font-semibold text-gray-800">
                  Welcome, {data?.full_name || "User"}!
               </h1>
               <p className="text-sm text-gray-500">{today}</p>
            </div>
            <button
               onClick={() => setIsEditing(!isEditing)}
               className="text-white bg-[#FF7043]   hover:bg-orange-600 focus:outline-none focus:ring-4  font-medium rounded-full text-sm px-8  py-3 text-center me-2 mb-2"
            >
               {isEditing ? "Save" : "Edit"}
            </button>
         </div>

         {/* Profile Image & Info */}
         <div className="mt-8 flex items-center gap-4">
            <img
               src="https://randomuser.me/api/portraits/women/44.jpg"
               alt="User"
               className="w-16 h-16 rounded-full object-cover"
            />
            <div>
               <h2 className="text-lg font-semibold text-gray-800">
                  {data?.full_name || "User"}
               </h2>
               <p className="text-sm text-gray-500">{data?.email}</p>
            </div>
         </div>

         {/* Form Section */}
         <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
               </label>
               <input
                  type="text"
                  disabled={!isEditing}
                  value={data?.full_name || ""}
                  placeholder="Your First Name"
                  className="w-full bg-gray-100 rounded-lg px-4 py-2 text-sm outline-none disabled:opacity-70"
               />
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
               </label>
               <input
                  type="text"
                  disabled={!isEditing}
                  value={data?.email || ""}
                  placeholder="Enter your email"
                  className="w-full bg-gray-100 rounded-lg px-4 py-2 text-sm outline-none disabled:opacity-70"
               />
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
               </label>
               <select
                  disabled={!isEditing}
                  value={data?.gender || ""}
                  className="w-full bg-gray-100 rounded-lg px-4 py-2 text-sm outline-none disabled:opacity-70"
               >
                  <option hidden value="">
                     Select your gender
                  </option>
                  <option value={"Male"}>Male</option>
                  <option value={"Female"}>Female</option>
                  <option value={"Other"}>Other</option>
               </select>
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nationality
               </label>
               <input
                  type="text"
                  disabled={!isEditing}
                  value={data?.nationality || ""}
                  onChange={getFormData}
                  placeholder="Your First Name"
                  className="w-full bg-gray-100 rounded-lg px-4 py-2 text-sm outline-none disabled:opacity-70"
               />
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
               </label>
               <input
                  type="text"
                  disabled={!isEditing}
                  value={data?.phone_number || ""}
                  placeholder="Your Phone Number"
                  className="w-full bg-gray-100 rounded-lg px-4 py-2 text-sm outline-none disabled:opacity-70"
               />
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
               </label>
               <input
                  type="email"
                  disabled={!isEditing}
                  placeholder="Your First Name"
                  className="w-full bg-gray-100 rounded-lg px-4 py-2 text-sm outline-none disabled:opacity-70"
               />
            </div>
         </div>
         <div className="mt-10">
            <label className="block text-lg font-semibold text-gray-800 mb-4">
               Upload Documents
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
               <label
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-orange-500"
               >
                  <p className="text-sm text-gray-600">10th Marksheet</p>
                  <input
                     type="file"
                     name="10th_marksheet"
                     onChange={handleUpload}
                     style={{ display: "none" }}
                  />
               </label>
               <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-orange-500">
                  <p className="text-sm text-gray-600">12th Marksheet</p>
               </div>
               <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-orange-500">
                  <p className="text-sm text-gray-600">
                     Transfer Certificate (TC)
                  </p>
               </div>
               <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-orange-500">
                  <p className="text-sm text-gray-600">Community Certificate</p>
               </div>
               <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-orange-500">
                  <p className="text-sm text-gray-600">Passport Size Photo</p>
               </div>
               <div
                  className={`border-2 rounded-lg p-4 text-center cursor-pointer transition-colors duration-300 ${getBorderClass()}`}
                  onClick={() => {
                     if (isUploaded && isHovering) {
                        setIsUploaded(false); // delete file
                     } else if (!isUploaded) {
                        setIsUploaded(true); // simulate file upload
                     }
                  }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
               >
                  <div className="flex items-center justify-center gap-1 text-sm">
                     {isUploaded ? (
                        isHovering ? (
                           <span className="flex items-center text-red-500 gap-1">
                              <DeleteIcon fontSize="small" />
                              Remove
                           </span>
                        ) : (
                           <span className="flex items-center text-gray-600 gap-1">
                              Aadhaar / ID Proof
                              <CheckCircleIcon
                                 className="text-green-500"
                                 fontSize="small"
                              />
                           </span>
                        )
                     ) : (
                        <span className="text-gray-600">
                           Aadhaar / ID Proof
                        </span>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ProfilePage;

import React, { useContext, useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import {
   useFrappeFileUpload,
   useFrappeGetDoc,
   useFrappeUpdateDoc,
} from "frappe-react-sdk";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "sonner";

function ProfilePage() {
   const { user } = useContext(AuthContext);
   const { data, isloading } = useFrappeGetDoc("Student", user);
   const { updateDoc } = useFrappeUpdateDoc();
   const { upload } = useFrappeFileUpload();

   const [isEditing, setIsEditing] = useState(false);

   const [isUploaded, setIsUploaded] = useState(false);
   const [isHovering, setIsHovering] = useState(false);
   const [document_table, setDocument_table] = useState([]);
   const [formData, setFormData] = useState({});

   const profilePicDoc = document_table.find(
      (doc) => doc.document_name === "profile_pic"
   );
   const signatureDoc = document_table.find(
      (doc) => doc.document_name === "signature"
   );
   const tenthCertificateDoc = document_table.find(
      (doc) => doc.document_name === "tenth_school_certificate"
   );
   const twelfthCertificateDoc = document_table.find(
      (doc) => doc.document_name === "twelfth_school_certificate"
   );

   const getBorderClass = (docName) => {
      if (docName) {
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

   const handleUpload = async (e) => {
      if (e.target.files && e.target.files[0]) {
         const file = e.target.files[0];

         try {
            await upload(file, {
               doctype: "Student", // attach to Student
               docname: user, // e.g., "STUD-0001"
               isPrivate: 1,
            })
               .then((res) => {
                  const fileUrl = res?.file_url;

                  const documentToUpload = {
                     document_name: e.target.name || file.name,
                     document_file: fileUrl,
                  };

                  document_table.push(documentToUpload);

                  updateDoc("Student", user, {
                     document_table,
                  })
                     .then(() => {
                        toast.success("Uploaded successfully");
                     })
                     .catch((err) => {
                        toast.warning("Upload failed. Try again later");
                        console.error(err);
                     });
               })
               .catch((err) => {
                  toast.warning("Upload failed. Try again later");
                  console.error(err);
               });
         } catch (err) {
            console.error("Upload failed:", err);
         }
      }
   };

   const handleRemoveDoc = (name) => {
      const updatedDocuments = data.document_table.filter(
         (doc) => doc.document_name !== name
      );

      try {
         updateDoc("Student", user, { document_table: updatedDocuments })
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
      } catch (error) {
         console.error(error);
      }
   };

   const handleUpdate = () => {
      if (isEditing) {
         if (formData != data) {
            try {
               updateDoc("Student", user, formData)
                  .then(() => {
                     toast.success("Profile updated successfully");
                  })
                  .catch((err) => {
                     toast.error(
                        "Some internal error while updating. Please try again later"
                     );
                     console.error(err);
                  });
            } catch (error) {
               console.error(error);
            }
         }
      } else {
         toast.error("Nothing to save");
      }
      setIsEditing(!isEditing);
   };

   useEffect(() => {
      if (data) {
         setFormData(data);
         setDocument_table(data.document_table);
      }
   }, [data, isloading]);

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
               onClick={handleUpdate}
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
                  name="full_name"
                  value={formData?.full_name || ""}
                  onChange={getFormData}
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
                  name="email"
                  value={formData?.email || ""}
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
                  name="gender"
                  value={formData?.gender || ""}
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
                  name="nationality"
                  value={formData?.nationality || ""}
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
                  name="phone_number"
                  value={formData?.phone_number || ""}
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
                  name="email"
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
                  htmlFor="tenth_school_certificate"
                  className={`border-2 rounded-lg p-4 text-center cursor-pointer transition-colors duration-300 ${getBorderClass(
                     tenthCertificateDoc
                  )}`}
                  onClick={() => {
                     if (tenthCertificateDoc && isHovering) {
                        handleRemoveDoc("tenth_school_certificate"); // delete file
                     }
                  }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
               >
                  <div className="flex items-center justify-center gap-1 text-sm">
                     {tenthCertificateDoc ? (
                        isHovering ? (
                           <span
                              className="flex items-center text-red-500 gap-1"
                              onClick={handleRemoveDoc}
                           >
                              <DeleteIcon fontSize="small" />
                              Remove
                           </span>
                        ) : (
                           <span className="flex items-center text-gray-600 gap-1">
                              10th Certificate
                              <CheckCircleIcon
                                 className="text-green-500"
                                 fontSize="small"
                              />
                           </span>
                        )
                     ) : (
                        <>
                           <span className="text-gray-600">
                              10th Certificate
                           </span>
                           <input
                              type="file"
                              name="tenth_school_certificate"
                              id="tenth_school_certificate"
                              onChange={handleUpload}
                              style={{ display: "none" }}
                           />
                        </>
                     )}
                  </div>
               </label>
               <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-orange-500">
                  <p className="text-sm text-gray-600">12th Marksheet</p>
                  <input
                     type="file"
                     name="twelfth_school_certificate"
                     id="twelfth_school_certificate"
                     onChange={handleUpload}
                     style={{ display: "none" }}
                  />
               </label>
               <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-orange-500">
                  <p className="text-sm text-gray-600">
                     Transfer Certificate (TC)
                  </p>
                  <input
                     type="file"
                     name="transfer_certificate"
                     id="transfer_certificate"
                     onChange={handleUpload}
                     style={{ display: "none" }}
                  />
               </label>
               <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-orange-500">
                  <p className="text-sm text-gray-600">Community Certificate</p>
                  <input
                     type="file"
                     name="community_certificate"
                     id="community_certificate"
                     onChange={handleUpload}
                     style={{ display: "none" }}
                  />
               </label>
               <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-orange-500">
                  <p className="text-sm text-gray-600">Passport Size Photo</p>
                  <input
                     type="file"
                     name="profile_photo"
                     id="profile_photo"
                     onChange={handleUpload}
                     style={{ display: "none" }}
                  />
               </label>
               <label
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
                        <>
                           <span className="text-gray-600">
                              Aadhaar / ID Proof
                           </span>
                        </>
                     )}
                     <input
                        type="file"
                        name="aadhaar_card"
                        id="aadhaar_card"
                        onChange={handleUpload}
                        style={{ display: "none" }}
                     />
                  </div>
               </label>
            </div>
         </div>
      </div>
   );
}

export default ProfilePage;

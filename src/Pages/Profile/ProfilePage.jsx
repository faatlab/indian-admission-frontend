import React, { useContext, useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import {
   useFrappeDeleteCall,
   useFrappeDeleteDoc,
   useFrappeFileUpload,
   useFrappeGetDoc,
   useFrappeUpdateDoc,
} from "frappe-react-sdk";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
   const { user } = useContext(AuthContext);
   const { data, isloading, mutate } = useFrappeGetDoc("Student", user);
   const { updateDoc } = useFrappeUpdateDoc();
   const { upload } = useFrappeFileUpload();
   const { deleteDoc } = useFrappeDeleteDoc();
   const navigate = useNavigate();

   const [isEditing, setIsEditing] = useState(false);
   const [hovering, setHovering] = useState({
      tenth: false,
      twelfth: false,
      transfer: false,
      community: false,
      photo: false,
      id: false,
   });

   const [isUploaded, setIsUploaded] = useState(false);
   const [isHovering, setIsHovering] = useState(false);
   const [document_table, setDocument_table] = useState([]);
   const [formData, setFormData] = useState({});
   const [deleteDocName, setDeleteDocName] = useState({});

   const tenthCertificateDoc = document_table.find(
      (doc) => doc.document_name === "tenth_school_certificate"
   );
   const twelfthCertificateDoc = document_table.find(
      (doc) => doc.document_name === "twelfth_school_certificate"
   );
   const transferCetificateDoc = document_table.find(
      (doc) => doc.document_name === "transfer_certificate_doc"
   );
   const communityCertificateDoc = document_table.find(
      (doc) => doc.document_name === "community_certificate_doc"
   );
   const profilePicDoc = document_table.find(
      (doc) => doc.document_name === "profile_pic"
   );
   const identityDoc = document_table.find(
      (doc) => doc.document_name === "identity_doc"
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

   const handleMouseEnter = (key) => {
      setHovering((prev) => ({ ...prev, [key]: true }));
   };

   const handleMouseLeave = (key) => {
      setHovering((prev) => ({ ...prev, [key]: false }));
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
                  console.log(res);

                  const documentToUpload = {
                     document_name: e.target.name || file.name,
                     document_file: res.name,
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
      setVisible(false);
      const updatedDocuments = data.document_table.filter(
         (doc) => doc.document_name !== name
      );

      const removingDocument = data.document_table.filter(
         (doc) => doc.document_name === name
      )[0].document_file;

      try {
         deleteDoc("File", removingDocument)
            .then(() => {
               updateDoc("Student", user, { document_table: updatedDocuments })
                  .then((res) => {
                     mutate();
                     toast.success("Document has been removed");
                  })
                  .catch((err) => console.error(err));
            })
            .catch((err) => console.log(err));
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

   const [visible, setVisible] = useState(false);
   const footerContent = (
      <div>
         <div className="p-5 flex justify-end gap-2 text-white text-sm">
            <button
               label="No"
               icon="pi pi-times"
               onClick={() => setVisible(false)}
               className="text-gray-500 border  px-5 py-2 rounded-2xl cursor-pointer"
            >
               No
            </button>
            <button
               label="No"
               icon="pi pi-times"
               onClick={() => handleRemoveDoc(deleteDocName)}
               className="bg-green-500 px-5 py-2 rounded-2xl cursor-pointer"
            >
               Yes
            </button>
         </div>
      </div>
   );

   return (
      <>
         <div className="min-h-screen bg-white px-6 py-8 md:px-16 w-3/4 mx-auto mt-15">
            <div className="flex justify-between items-start flex-wrap gap-y-4">
               <div>
                  <h1 className="text-2xl font-semibold text-gray-800">
                     Welcome, {data?.full_name || "User"}!
                  </h1>
                  <p className="text-sm text-gray-500">{today}</p>
               </div>
               <div className="flex flex-wrap md:flex-nowrap gap-3  justify-between">
                  <button
                     className="w-full md:w-auto text-slate bg-[#F2F2F2] hover:bg-[#ffad7d] font-medium rounded-full text-sm px-8 py-3 cursor-pointer"
                     onClick={() => navigate("/saved-course")}
                  >
                     Saved Courses
                  </button>
                  
                  <button
                     onClick={handleUpdate}
                     className="w-full md:w-auto text-white bg-[#FF7043] hover:bg-orange-600 focus:outline-none focus:ring-4 font-medium rounded-full text-sm  px-8 py-3 text-center cursor-pointer "
                  >
                     {isEditing ? "Save" : "Edit"}
                  </button>
               </div>
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
                  {/* 10th Certificate */}
                  <label
                     htmlFor="tenth_school_certificate"
                     className={`border-2 rounded-lg p-4 text-center cursor-pointer transition-colors duration-300 ${getBorderClass(
                        tenthCertificateDoc
                     )}`}
                     onClick={() => {
                        if (tenthCertificateDoc && hovering.tenth) {
                           setVisible(true);
                           setDeleteDocName("tenth_school_certificate"); // delete file
                        }
                     }}
                     onMouseEnter={() => handleMouseEnter("tenth")}
                     onMouseLeave={() => handleMouseLeave("tenth")}
                  >
                     <div className="flex items-center justify-center gap-1 text-sm">
                        {tenthCertificateDoc ? (
                           hovering.tenth ? (
                              <span className="flex items-center text-red-500 gap-1">
                                 <DeleteIcon fontSize="small" />
                                 Remove
                              </span>
                           ) : (
                              <span className="flex items-center text-gray-600 gap-1">
                                 10th Marksheet
                                 <CheckCircleIcon
                                    className="text-green-500"
                                    fontSize="small"
                                 />
                              </span>
                           )
                        ) : (
                           <>
                              <span className="text-gray-600">
                                 10th Marksheet
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

                  {/* 12th Certificate */}
                  <label
                     htmlFor="twelfth_school_certificate"
                     className={`border-2 rounded-lg p-4 text-center cursor-pointer transition-colors duration-300 ${getBorderClass(
                        twelfthCertificateDoc
                     )}`}
                     onClick={() => {
                        if (twelfthCertificateDoc && hovering.twelfth) {
                           setVisible(true);
                           setDeleteDocName("twelfth_school_certificate"); // delete file
                        }
                     }}
                     onMouseEnter={() => handleMouseEnter("twelfth")}
                     onMouseLeave={() => handleMouseLeave("twelfth")}
                  >
                     <div className="flex items-center justify-center gap-1 text-sm">
                        {twelfthCertificateDoc ? (
                           hovering.twelfth ? (
                              <span className="flex items-center text-red-500 gap-1">
                                 <DeleteIcon fontSize="small" />
                                 Remove
                              </span>
                           ) : (
                              <span className="flex items-center text-gray-600 gap-1">
                                 12th Certificate
                                 <CheckCircleIcon
                                    className="text-green-500"
                                    fontSize="small"
                                 />
                              </span>
                           )
                        ) : (
                           <>
                              <span className="text-gray-600">
                                 12th Certificate
                              </span>
                              <input
                                 type="file"
                                 name="twelfth_school_certificate"
                                 id="twelfth_school_certificate"
                                 onChange={handleUpload}
                                 style={{ display: "none" }}
                              />
                           </>
                        )}
                     </div>
                  </label>

                  {/* Transfer Certificate */}
                  <label
                     htmlFor="transfer_certificate_doc"
                     className={`border-2 rounded-lg p-4 text-center cursor-pointer transition-colors duration-300 ${getBorderClass(
                        transferCetificateDoc
                     )}`}
                     onClick={() => {
                        if (transferCetificateDoc && hovering.transfer) {
                           setVisible(true);
                           setDeleteDocName("transfer_certificate_doc"); // delete file
                        }
                     }}
                     onMouseEnter={() => handleMouseEnter("transfer")}
                     onMouseLeave={() => handleMouseLeave("transfer")}
                  >
                     <div className="flex items-center justify-center gap-1 text-sm">
                        {transferCetificateDoc ? (
                           hovering.transfer ? (
                              <span className="flex items-center text-red-500 gap-1">
                                 <DeleteIcon fontSize="small" />
                                 Remove
                              </span>
                           ) : (
                              <span className="flex items-center text-gray-600 gap-1">
                                 Transfer Certificate (TC)
                                 <CheckCircleIcon
                                    className="text-green-500"
                                    fontSize="small"
                                 />
                              </span>
                           )
                        ) : (
                           <>
                              <span className="text-gray-600">
                                 Transfer Certificate (TC)
                              </span>
                              <input
                                 type="file"
                                 name="transfer_certificate_doc"
                                 id="transfer_certificate_doc"
                                 onChange={handleUpload}
                                 style={{ display: "none" }}
                              />
                           </>
                        )}
                     </div>
                  </label>

                  {/* Community Certificate */}
                  <label
                     htmlFor="community_certificate_doc"
                     className={`border-2 rounded-lg p-4 text-center cursor-pointer transition-colors duration-300 ${getBorderClass(
                        communityCertificateDoc
                     )}`}
                     onClick={() => {
                        if (communityCertificateDoc && hovering.community) {
                           setVisible(true);
                           setDeleteDocName("community_certificate_doc"); // delete file
                        }
                     }}
                     onMouseEnter={() => handleMouseEnter("community")}
                     onMouseLeave={() => handleMouseLeave("community")}
                  >
                     <div className="flex items-center justify-center gap-1 text-sm">
                        {communityCertificateDoc ? (
                           hovering.community ? (
                              <span className="flex items-center text-red-500 gap-1">
                                 <DeleteIcon fontSize="small" />
                                 Remove
                              </span>
                           ) : (
                              <span className="flex items-center text-gray-600 gap-1">
                                 Community Certificate
                                 <CheckCircleIcon
                                    className="text-green-500"
                                    fontSize="small"
                                 />
                              </span>
                           )
                        ) : (
                           <>
                              <span className="text-gray-600">
                                 Community Certificate
                              </span>
                              <input
                                 type="file"
                                 name="community_certificate_doc"
                                 id="community_certificate_doc"
                                 onChange={handleUpload}
                                 style={{ display: "none" }}
                              />
                           </>
                        )}
                     </div>
                  </label>

                  {/* Photo File */}
                  <label
                     htmlFor="profile_pic"
                     className={`border-2 rounded-lg p-4 text-center cursor-pointer transition-colors duration-300 ${getBorderClass(
                        profilePicDoc
                     )}`}
                     onClick={() => {
                        if (profilePicDoc && hovering.photo) {
                           setVisible(true);
                           setDeleteDocName("profile_pic"); // delete file
                        }
                     }}
                     onMouseEnter={() => handleMouseEnter("photo")}
                     onMouseLeave={() => handleMouseLeave("photo")}
                  >
                     <div className="flex items-center justify-center gap-1 text-sm">
                        {profilePicDoc ? (
                           hovering.photo ? (
                              <span className="flex items-center text-red-500 gap-1">
                                 <DeleteIcon fontSize="small" />
                                 Remove
                              </span>
                           ) : (
                              <span className="flex items-center text-gray-600 gap-1">
                                 Passport size photo
                                 <CheckCircleIcon
                                    className="text-green-500"
                                    fontSize="small"
                                 />
                              </span>
                           )
                        ) : (
                           <>
                              <span className="text-gray-600">
                                 Passport size photo
                              </span>
                              <input
                                 type="file"
                                 name="profile_pic"
                                 id="profile_pic"
                                 onChange={handleUpload}
                                 style={{ display: "none" }}
                              />
                           </>
                        )}
                     </div>
                  </label>

                  {/* Aadhaar/ID proof */}
                  <label
                     htmlFor="identity_doc"
                     className={`border-2 rounded-lg p-4 text-center cursor-pointer transition-colors duration-300 ${getBorderClass(
                        identityDoc
                     )}`}
                     onClick={() => {
                        if (identityDoc && hovering.id) {
                           setVisible(true);
                           setDeleteDocName("identity_doc"); // delete file
                        }
                     }}
                     onMouseEnter={() => handleMouseEnter("id")}
                     onMouseLeave={() => handleMouseLeave("id")}
                  >
                     <div className="flex items-center justify-center gap-1 text-sm">
                        {identityDoc ? (
                           hovering.id ? (
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
                              <input
                                 type="file"
                                 name="identity_doc"
                                 id="identity_doc"
                                 onChange={handleUpload}
                                 style={{ display: "none" }}
                              />
                           </>
                        )}
                     </div>
                  </label>
               </div>
            </div>
         </div>

         {/* modal for confirming document deletion */}
         <Dialog
            header="Delete uploaded document"
            visible={visible}
            position={top}
            style={{ width: "35vw" }}
            onHide={() => {
               if (!visible) return;
               setVisible(false);
            }}
            footer={footerContent}
            draggable={false}
            resizable={false}
            className="m-5"
            contentClassName="px-20"
            headerClassName="p-5 text-red-400"
         >
            <p className="text-slate-600">
               Are you sure you want to delete this Document.{" "}
               <span className="font-bold">
                 Deleting this now cannot be reversed!
               </span>
            </p>
         </Dialog>
      </>
   );
}

export default ProfilePage;

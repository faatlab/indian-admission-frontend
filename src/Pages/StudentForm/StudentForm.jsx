import React, { useContext, useEffect, useState } from "react";
import {
   useFrappeFileUpload,
   useFrappeGetDoc,
   useFrappeUpdateDoc,
} from "frappe-react-sdk";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "sonner";
import { api_url } from "../../constants/globalConstants";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircleIcon } from "lucide-react";

const sections = [
   "Program Info",
   "Personal Info",
   "Communication Info",
   "Educational Info",
   "Other Info",
   "Upload Docs",
];

const FormSectionSwitcher = ({ currentSection, setCurrentSection }) => (
   <div className="flex flex-wrap gap-2 mb-6">
      {sections.map((section, index) => (
         <button
            key={index}
            onClick={() => setCurrentSection(section)}
            className={`px-4 py-2 rounded-xl shadow text-sm font-medium transition duration-300 ${
               currentSection === section
                  ? "bg-orange-500 text-white"
                  : "bg-white text-orange-500 border border-orange-500 hover:bg-orange-100"
            }`}
         >
            {section}
         </button>
      ))}
   </div>
);

const Input = ({
   label,
   name,
   type = "text",
   placeholder,
   required = false,
   disabled = false,
   formData,
   getFormData,
}) => (
   <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
         {label}
      </label>
      <input
         type={type}
         name={name}
         disabled={disabled}
         value={formData[name] || ""}
         onChange={getFormData}
         placeholder={placeholder}
         required={required}
         className="border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full transition"
      />
   </div>
);

const Select = ({
   label,
   name,
   options,
   required = false,
   formData,
   getFormData,
}) => (
   <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
         {label}
      </label>
      <select
         required={required}
         name={name}
         onChange={getFormData}
         value={formData[name] || ""} // controlled value
         className="border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full transition"
      >
         <option value="" disabled hidden>
            Select
         </option>
         {options.map((option, index) => (
            <option key={index}>{option}</option>
         ))}
      </select>
   </div>
);

function StudentForm() {
   const { user } = useContext(AuthContext);
   const { data, isLoading, mutate } = useFrappeGetDoc("Student", user);
   const { updateDoc } = useFrappeUpdateDoc();
   const { upload } = useFrappeFileUpload();
   const navigate = useNavigate();

   const [currentSection, setCurrentSection] = useState("Personal Info");
   const [formData, setFormData] = useState({});
   const [courseData, setCourseData] = useState([]);
   const [isApplied, setIsApplied] = useState(false);
   const { id } = useParams();

   const [document_table, setDocument_table] = useState([]);

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

   const getCourseData = async () => {
      try {
         const response = await axios.get(`${api_url}/courses`, {
            params: {
               course_id: id,
            },
         });
         formData.program_name = response.data.data[0].course_name;
         formData.college_name = response.data.data[0].college_name;

         setCourseData(response.data.data[0]);
      } catch (error) {
         console.error(error);
      }
   };

   const getFormData = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const handleNext = () => {
      if (sections.indexOf(currentSection) < sections.length - 1)
         setCurrentSection(sections[sections.indexOf(currentSection) + 1]);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (formData != data) {
         await updateDoc("Student", user, formData)
            .then(() => {
               mutate();
               toast.success("Updated successfully");
               if (sections.indexOf(currentSection) < sections.length - 1)
                  setCurrentSection(
                     sections[sections.indexOf(currentSection) + 1]
                  );
            })
            .catch((err) => {
               toast.error(
                  "There has been some error while updating. Please try again later"
               );
               console.error(err);
            });
      } else {
         toast.info("Nothing to save");
      }
   };

   const handleFileChange = async (e) => {
      if (e.target.files && e.target.files[0]) {
         const file = e.target.files[0];

         try {
            await upload(file, {
               isPrivate: 0,
            })
               .then((res) => {
                  const fileUrl = res?.file_url;

                  const documentToUpload = {
                     document_name: e.target.name || file.name,
                     document_file: res.name,
                  };

                  document_table.push(documentToUpload);

                  updateDoc("Student", user, {
                     document_table,
                     display_picture: fileUrl,
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

   const handleApplication = () => {
      try {
         const applied_courses = Array.isArray(data.applied_courses)
            ? [...data.applied_courses]
            : [];

         applied_courses.push({
            course_id: courseData.course_id,
            course_name: courseData.course_name,
            college_id: courseData.college_id,
            college_name: courseData.college_name,
         });
         updateDoc("Student", user, { applied_courses })
            .then(() => {
               toast.success("You have applied for this course.");
               setIsApplied(true);
            })
            .catch((err) => {
               toast.error("Some technical error. Please try again later");
               console.error(err);
            });
      } catch (error) {
         console.error(error);
      }
   };

   const checkAppliedCourse = () => {
      const applied_courses = Array.isArray(data.applied_courses)
         ? [...data.applied_courses]
         : [];

      const appliedCourse = applied_courses.find(
         (course) => course.course_id === courseData.course_id
      );

      if (appliedCourse) {
         setIsApplied(true);
         toast.warning("You have already applied for this course");
         navigate("/profile");
      }
   };

   useEffect(() => {
      if (data) {
         checkAppliedCourse();
         setFormData(data);
         setDocument_table(data.document_table);
      }
   }, [isLoading, data]);

   useEffect(() => {
      getCourseData();
   }, []);

   return (
      <div className="max-w-6xl mx-auto p-6">
         {!isApplied ? (
            <>
               <div className="flex justify-between items-center  lg:my-20 my-10 ">
                  <h2 className="text-3xl font-black text-[#535353]">
                     Application Form
                  </h2>{" "}
               </div>

               <FormSectionSwitcher
                  currentSection={currentSection}
                  setCurrentSection={setCurrentSection}
               />

               {currentSection === "Personal Info" && (
                  <form
                     className="grid grid-cols-1 md:grid-cols-2 gap-4"
                     onSubmit={handleSubmit}
                  >
                     <Input
                        label="Full Name"
                        name="full_name"
                        getFormData={getFormData}
                        data={data}
                        formData={formData}
                        placeholder="Enter full name"
                     />
                     <Input
                        label="Date of Birth"
                        name="dob"
                        getFormData={getFormData}
                        data={data}
                        formData={formData}
                        type="date"
                     />
                     <Select
                        label="Gender"
                        name="gender"
                        getFormData={getFormData}
                        data={data}
                        formData={formData}
                        options={["Male", "Female", "Other"]}
                     />
                     <Select
                        label="Religion"
                        name="religion"
                        getFormData={getFormData}
                        data={data}
                        formData={formData}
                        options={["Hindu", "Muslim", "Christian", "Other"]}
                     />
                     <Input
                        label="Caste"
                        name="caste"
                        getFormData={getFormData}
                        data={data}
                        formData={formData}
                        placeholder="Enter caste"
                     />
                     <Select
                        label="Category"
                        name="category"
                        getFormData={getFormData}
                        data={data}
                        formData={formData}
                        options={["General", "OBC", "SC", "ST"]}
                     />
                     <Input
                        label="Aadhar Number"
                        name="aadhaar_number"
                        getFormData={getFormData}
                        data={data}
                        formData={formData}
                        placeholder="Enter Aadhar number"
                     />
                     <Select
                        label="Blood Group"
                        name="blood_group"
                        getFormData={getFormData}
                        data={data}
                        formData={formData}
                        options={[
                           "A+",
                           "A-",
                           "B+",
                           "B-",
                           "AB+",
                           "AB-",
                           "O+",
                           "O-",
                        ]}
                     />
                     <Select
                        label="PWD (Disability)"
                        name="pwd"
                        getFormData={getFormData}
                        data={data}
                        formData={formData}
                        options={["Yes", "No"]}
                     />
                     <Input
                        label="Father's Name"
                        name="fathers_name"
                        getFormData={getFormData}
                        data={data}
                        formData={formData}
                        placeholder="Enter father's name"
                     />
                     <Input
                        label="Father's Mobile Number"
                        name="fathers_number"
                        getFormData={getFormData}
                        data={data}
                        formData={formData}
                        placeholder="Enter father's mobile number"
                     />
                     <Input
                        label="Mother's Name"
                        name="mothers_name"
                        getFormData={getFormData}
                        data={data}
                        formData={formData}
                        placeholder="Enter mother's name"
                     />
                     <Input
                        label="Mother's Mobile Number"
                        name="mothers_number"
                        getFormData={getFormData}
                        data={data}
                        formData={formData}
                        placeholder="Enter mother's mobile number"
                     />
                     <Select
                        label="Combined Parent Annual Income"
                        name="annual_income"
                        getFormData={getFormData}
                        data={data}
                        formData={formData}
                        options={[
                           "Choose",
                           "< 1 Lakh",
                           "1-5 Lakhs",
                           "5-10 Lakhs",
                           "> 10 Lakhs",
                        ]}
                     />
                     <Select
                        label="Preferred Point of Contact"
                        name="poc"
                        getFormData={getFormData}
                        data={data}
                        formData={formData}
                        options={["Select", "Father", "Mother"]}
                     />

                     <div className="md:col-span-2 flex justify-end mt-4">
                        <button
                           type="submit"
                           className="bg-orange-500 hover:bg-orange-600 text-white  py-2 px-6 rounded-xl shadow-lg transition duration-300"
                        >
                           Save
                        </button>
                     </div>
                  </form>
               )}

               {currentSection === "Program Info" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           Program Name
                        </label>
                        <input
                           disabled
                           value={courseData.course_name}
                           className="border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full transition"
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           College Name
                        </label>
                        <input
                           disabled
                           value={courseData.college_name}
                           className="border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full transition"
                        />
                     </div>
                     <div className="md:col-span-2 flex justify-end mt-4">
                        <button
                           type="button"
                           onClick={handleNext}
                           className="bg-orange-500 hover:bg-orange-600 text-white  py-2 px-6 rounded-xl shadow-lg transition duration-300"
                        >
                           Next
                        </button>
                     </div>
                  </div>
               )}

               {currentSection === "Communication Info" && (
                  <form
                     className="grid grid-cols-1 md:grid-cols-2 gap-4"
                     onSubmit={handleSubmit}
                  >
                     <Input
                        label="Permanent Address"
                        name="address"
                        getFormData={getFormData}
                        data={data}
                        formData={formData}
                        placeholder="Enter permanent address"
                     />
                     <Input
                        label="Correspondence Address"
                        name="corr_address"
                        getFormData={getFormData}
                        data={data}
                        formData={formData}
                        placeholder="Enter correspondence address"
                     />
                     <Input
                        label="Email"
                        name="email"
                        getFormData={getFormData}
                        data={data}
                        formData={formData}
                        type="email"
                        placeholder="Enter email address"
                     />
                     <Input
                        label="Mobile Number"
                        name="phone_number"
                        getFormData={getFormData}
                        data={data}
                        formData={formData}
                        placeholder="Enter mobile number"
                     />
                     <div className="md:col-span-2 flex justify-end mt-4">
                        <button
                           type="submit"
                           className="bg-orange-500 hover:bg-orange-600 text-white  py-2 px-6 rounded-xl shadow-lg transition duration-300"
                        >
                           Save
                        </button>
                     </div>
                  </form>
               )}

               {currentSection === "Educational Info" && (
                  <form
                     className="grid grid-cols-1 md:grid-cols-2 gap-4"
                     onSubmit={handleSubmit}
                  >
                     <Input
                        label="10th School Name"
                        name="tenth_school_name"
                        getFormData={getFormData}
                        data={data}
                        formData={formData}
                        placeholder="Enter 10th school name"
                     />
                     <Input
                        label="10th Board Name"
                        name="tenth_school_board"
                        getFormData={getFormData}
                        data={data}
                        formData={formData}
                        placeholder="Enter 10th board name"
                     />
                     <Input
                        label="10th Percentage/CGPA"
                        name="tenth_school_marks"
                        getFormData={getFormData}
                        data={data}
                        formData={formData}
                        placeholder="Enter marks"
                     />
                     <Input
                        label="10th Year of Passing"
                        name="tenth_school_yop"
                        getFormData={getFormData}
                        data={data}
                        formData={formData}
                        type="number"
                        placeholder="YYYY"
                     />
                     <Input
                        label="12th School Name"
                        name="twelfth_school_name"
                        getFormData={getFormData}
                        data={data}
                        formData={formData}
                        placeholder="Enter 12th school name"
                     />
                     <Input
                        label="12th Board Name"
                        name="twelfth_school_board"
                        getFormData={getFormData}
                        data={data}
                        formData={formData}
                        placeholder="Enter 12th board name"
                     />
                     <Input
                        label="12th Percentage/CGPA"
                        name="twelfth_school_marks"
                        getFormData={getFormData}
                        data={data}
                        formData={formData}
                        placeholder="Enter marks"
                     />
                     <Input
                        label="12th Year of Passing"
                        name="twelfth_school_yop"
                        getFormData={getFormData}
                        data={data}
                        formData={formData}
                        type="number"
                        placeholder="YYYY"
                     />
                     <div className="md:col-span-2 flex justify-end mt-4">
                        <button
                           type="submit"
                           className="bg-orange-500 hover:bg-orange-600 text-white  py-2 px-6 rounded-xl shadow-lg transition duration-300"
                        >
                           Save
                        </button>
                     </div>
                  </form>
               )}

               {currentSection === "Other Info" && (
                  <form
                     className="grid grid-cols-1 md:grid-cols-2 gap-4"
                     onSubmit={handleSubmit}
                  >
                     <Input
                        label="Extra Curricular Activities"
                        name="extra_curricular"
                        getFormData={getFormData}
                        data={data}
                        formData={formData}
                        placeholder="Mention any activities"
                     />
                     <Input
                        label="Hobbies"
                        name="hobbies"
                        getFormData={getFormData}
                        data={data}
                        formData={formData}
                        placeholder="Enter hobbies"
                     />
                     <Input
                        label="Achievements"
                        name="achievements"
                        getFormData={getFormData}
                        data={data}
                        formData={formData}
                        placeholder="Mention achievements"
                     />
                     <div className="md:col-span-2 flex justify-end mt-4">
                        <button
                           type="submit"
                           className="bg-orange-500 hover:bg-orange-600 text-white  py-2 px-6 rounded-xl shadow-lg transition duration-300"
                        >
                           Save
                        </button>
                     </div>
                  </form>
               )}

               {currentSection === "Upload Docs" && (
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           Profile Photo
                        </label>
                        {profilePicDoc ? (
                           <label className="border flex border-green-300 p-3 rounded-xl shadow-sm hover:outline-none hover:ring-2 hover:ring-green-500 hover:border-transparent w-full transition cursor-pointer">
                              <CheckCircleIcon
                                 className="text-green-500 me-2"
                                 fontSize="small"
                              />
                              File Uploaded
                           </label>
                        ) : (
                           <label
                              htmlFor="profile_pic"
                              className="border flex border-gray-300 p-3 rounded-xl shadow-sm hover:outline-none hover:ring-2 hover:ring-orange-500 hover:border-transparent w-full transition cursor-pointer"
                           >
                              Choose File to upload
                           </label>
                        )}
                        <input
                           hidden
                           type="file"
                           name="profile_pic"
                           id="profile_pic"
                           onChange={handleFileChange}
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           Signature
                        </label>
                        {signatureDoc ? (
                           <label className="border flex border-green-300 p-3 rounded-xl shadow-sm hover:outline-none hover:ring-2 hover:ring-green-500 hover:border-transparent w-full transition cursor-pointer">
                              <CheckCircleIcon
                                 className="text-green-500 me-2"
                                 fontSize="small"
                              />
                              File Uploaded
                           </label>
                        ) : (
                           <label
                              htmlFor="signatue"
                              className="border block border-gray-300 p-3 rounded-xl shadow-sm hover:outline-none hover:ring-2 hover:ring-orange-500 hover:border-transparent w-full transition cursor-pointer"
                           >
                              Choose File to upload
                           </label>
                        )}
                        <input
                           hidden
                           type="file"
                           className="border border-gray-300 p-3 rounded-xl shadow-sm hover:outline-none hover:ring-2 hover:ring-orange-500 hover:border-transparent w-full transition cursor-pointer"
                           name="signature"
                           id="signature"
                           onChange={handleFileChange}
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           10th Marksheet
                        </label>
                        {tenthCertificateDoc ? (
                           <label className="border flex border-green-300 p-3 rounded-xl shadow-sm hover:outline-none hover:ring-2 hover:ring-green-500 hover:border-transparent w-full transition cursor-pointer">
                              <CheckCircleIcon
                                 className="text-green-500 me-2"
                                 fontSize="small"
                              />
                              File Uploaded
                           </label>
                        ) : (
                           <label
                              htmlFor="tenth_school_certificate"
                              className="border block border-gray-300 p-3 rounded-xl shadow-sm hover:outline-none hover:ring-2 hover:ring-orange-500 hover:border-transparent w-full transition cursor-pointer"
                           >
                              Choose File to upload
                           </label>
                        )}
                        <input
                           hidden
                           type="file"
                           className="border border-gray-300 p-3 rounded-xl shadow-sm hover:outline-none hover:ring-2 hover:ring-orange-500 hover:border-transparent w-full transition cursor-pointer"
                           name="tenth_school_certificate"
                           id="tenth_school_certificate"
                           onChange={handleFileChange}
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           12th Marksheet
                        </label>
                        {twelfthCertificateDoc ? (
                           <label className="border flex border-green-300 p-3 rounded-xl shadow-sm hover:outline-none hover:ring-2 hover:ring-green-500 hover:border-transparent w-full transition cursor-pointer">
                              <CheckCircleIcon
                                 className="text-green-500"
                                 fontSize="small"
                              />
                              File Uploaded
                           </label>
                        ) : (
                           <label
                              htmlFor="twelfth_school_certificate"
                              className="border block border-gray-300 p-3 rounded-xl shadow-sm hover:outline-none hover:ring-2 hover:ring-orange-500 hover:border-transparent w-full transition cursor-pointer"
                           >
                              Choose File to upload
                           </label>
                        )}
                        <input
                           hidden
                           type="file"
                           className="border border-gray-300 p-3 rounded-xl shadow-sm hover:outline-none hover:ring-2 hover:ring-orange-500 hover:border-transparent w-full transition cursor-pointer"
                           name="twelfth_school_certificate"
                           id="twelfth_school_certificate"
                           onChange={handleFileChange}
                        />
                     </div>

                     <div className="md:col-span-2 flex justify-end mt-4">
                        <button
                           type="button"
                           onClick={handleApplication}
                           className="bg-orange-500 hover:bg-orange-600 text-white  py-2 px-6 rounded-xl shadow-lg transition duration-300"
                        >
                           Apply Now
                        </button>
                     </div>
                  </form>
               )}
            </>
         ) : (
            <div className="bg-white flex flex-col items-center justify-center px-4 text-center my-32">
               <img
                  src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
                  alt="Success"
                  className="w-24 h-24 md:w-32 md:h-32 mb-6"
               />
               <h1 className="text-2xl md:text-4xl font-bold text-green-600 mb-4">
                  Application Submitted Successfully!
               </h1>
               <p className="text-gray-600 text-sm md:text-base max-w-md mb-6">
                  Thank you for applying through our Indian Admission Platform.
                  Our team will review your details and get in touch with you
                  shortly.
               </p>
               <button
                  onClick={() => navigate("/")}
                  className="bg-[#FF7043] hover:bg-orange-600 text-white px-6 py-3 rounded-full transition"
               >
                  Go to Home
               </button>
            </div>
         )}
      </div>
   );
}

export default StudentForm;

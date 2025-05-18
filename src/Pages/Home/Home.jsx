import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/main-logo.svg";
import hero from "../../assets/hero.jpeg";
import curve_line from "../../assets/curve_line.png";
import amritha from "../../assets/Amrita.png";
import rajagiri from "../../assets/rajagiri.png";
import ramaiah from "../../assets/ramaiah.png";
import manipal from "../../assets/manipal.png";
import madras from "../../assets/Madras_Christian.png";
import presidency from "../../assets/presidency.png";
import jain from "../../assets/jain.png";
import amity from "../../assets/amity.webp";
import srm from "../../assets/srm.png";
import christ from "../../assets/christ_university.png";
import college from "../../assets/college.svg";
import done from "../../assets/done.svg";
import bell from "../../assets/bell.svg";
import course1 from "../../assets/course1.svg";
import course2 from "../../assets/course2.svg";
import course3 from "../../assets/course3.svg";
import save from "../../assets/save.svg";
import down from "../../assets/down arow.svg";
import mars from "../../assets/mars.svg";
import Aos from "aos";
import "aos/dist/aos.css";
import { toast } from "sonner";
import { api_url } from "../../constants/globalConstants";
import axios from "axios";

function Home() {
   const [selectedState, setSelectedState] = useState(null);
   const [search, setSearch] = useState("");
   const [majorColleges, setMajorColleges] = useState([]);
   const [trendingCourses, setTrendingCourses] = useState([]);

   const navigate = useNavigate();

   const indianStates = [
      { name: "Andhra Pradesh", code: "AP" },
      { name: "Arunachal Pradesh", code: "AR" },
      { name: "Assam", code: "AS" },
      { name: "Bihar", code: "BR" },
      { name: "Chhattisgarh", code: "CG" },
      { name: "Goa", code: "GA" },
      { name: "Gujarat", code: "GJ" },
      { name: "Haryana", code: "HR" },
      { name: "Himachal Pradesh", code: "HP" },
      { name: "Jharkhand", code: "JH" },
      { name: "Karnataka", code: "KA" },
      { name: "Kerala", code: "KL" },
      { name: "Madhya Pradesh", code: "MP" },
      { name: "Maharashtra", code: "MH" },
      { name: "Manipur", code: "MN" },
      { name: "Meghalaya", code: "ML" },
      { name: "Mizoram", code: "MZ" },
      { name: "Nagaland", code: "NL" },
      { name: "Odisha", code: "OR" },
      { name: "Punjab", code: "PB" },
      { name: "Rajasthan", code: "RJ" },
      { name: "Sikkim", code: "SK" },
      { name: "Tamil Nadu", code: "TN" },
      { name: "Telangana", code: "TG" },
      { name: "Tripura", code: "TR" },
      { name: "Uttar Pradesh", code: "UP" },
      { name: "Uttarakhand", code: "UK" },
      { name: "West Bengal", code: "WB" },
   ];

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

   const testimonials = [
      {
         quote: "This platform changed my life!",
         avatar: "https://randomuser.me/api/portraits/women/44.jpg",
         name: "Sarah Lee",
         role: "Software Engineer",
      },
      {
         quote: "Excellent guidance and support. asdjsalkdakasjdaskjldajd asdjlkdjalkjslda ajdlasjdlkajdsl",
         avatar: "https://randomuser.me/api/portraits/men/46.jpg",
         name: "James Kim",
         role: "Data Scientist",
      },
      {
         quote: "Highly recommend to every student!",
         avatar: "https://randomuser.me/api/portraits/women/65.jpg",
         name: "Amanda Stone",
         role: "Product Designer",
      },
      {
         quote: "Very informative and helpful.",
         avatar: "https://randomuser.me/api/portraits/men/70.jpg",
         name: "David Lin",
         role: "Marketing Analyst",
      },
      {
         quote: "I landed a job within weeks.",
         avatar: "https://randomuser.me/api/portraits/women/85.jpg",
         name: "Olivia Tran",
         role: "UX Researcher",
      },
      {
         quote: "The best mentorship I’ve received.",
         avatar: "https://randomuser.me/api/portraits/men/80.jpg",
         name: "Tom Jackson",
         role: "AI Engineer",
      },
   ];

   const groupSize = 3;
   const [currentGroup, setCurrentGroup] = useState(0);
   const [fade, setFade] = useState(true);
   const totalGroups = Math.ceil(testimonials.length / groupSize);

   useEffect(() => {
      const interval = setInterval(() => {
         setFade(false);
         setTimeout(() => {
            setCurrentGroup((prev) => (prev + 1) % totalGroups);
            setFade(true);
         }, 300);
      }, 5000);

      return () => clearInterval(interval);
   }, [totalGroups]);

   const getGroupedTestimonials = () => {
      const start = currentGroup * groupSize;
      return testimonials.slice(start, start + groupSize);
   };

   const handleSearch = () => {
      if (search && selectedState) {
         navigate(
            `/courses?search_query=${encodeURIComponent(
               search
            )}&selected_state=${encodeURIComponent(selectedState.name)}`
         );
      } else {
         toast("Please select a state and enter a search term.");
      }
   };

   const getMajorColleges = async () => {
      try {
         const response = await axios.get(`${api_url}/colleges/india`, {
            params: {
               limit: 4,
               page: 8,
            },
         });
         if (response.status == 200) setMajorColleges(response.data.data);
      } catch (error) {
         console.error(error);
      }
   };

   const getTrendingCourses = async () => {
      try {
         const response = await axios.get(`${api_url}/courses/india`, {
            params: { limit: 9 },
         });
         setTrendingCourses(response.data.data);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      getMajorColleges();
      getTrendingCourses();
      Aos.init({ duration: 600 });
   }, []);

   return (
      <>
         <div>
            {/* hero section */}
            <div className="h-[75vh] relative">
               <div className="position absolute z-10 h-full w-full lg:w-1/2 flex align-center justify-center gap-6 flex-col lg:ps-20 px-1">
                  <div className="flex-col justify-center items-center">
                     <h1 className="text-5xl lg:text-6xl font-black text-white mb-5 px-3">
                        Never stop <br />
                        Dreaming big
                     </h1>
                  </div>
                  <div className="">
                     <form className="w-full lg:w-11/13 h-16">
                        <label
                           htmlFor="default-search"
                           className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                        >
                           Search
                        </label>
                        <div className="relative h-full">
                           <div className="hidden absolute inset-y-0 start-0 lg:flex items-center ps-3 pointer-events-none">
                              <svg
                                 className="w-4 h-4 text-gray-500 dark:text-gray-400 "
                                 aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 20 20"
                              >
                                 <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                 />
                              </svg>
                           </div>

                           <input
                              type="search"
                              id="default-search"
                              name="search"
                              onChange={(e) => setSearch(e.target.value)}
                              className="block w-full h-full ps-4 lg:ps-10 pe-36 md:pe-48 text-sm text-gray-900 border border-gray-300 rounded-[30px] bg-gray-50 outline-0 "
                              placeholder="Search for a Courses"
                           />

                           <div className="card absolute top-3 right-13 lg:right-27 flex justify-content-center">
                              <Dropdown
                                 value={selectedState}
                                 onChange={(e) => setSelectedState(e.value)}
                                 options={indianStates}
                                 optionLabel="name"
                                 placeholder="Select State"
                                 className="w-36 lg:w-50 py-2 text-lg focus:outline-none focus:ring-0 shadow-none bg-gray-50"
                                 virtualScrollerOptions={{ itemSize: 38 }}
                                 panelStyle={{ color: "blue" }}
                                 itemTemplate={(option) => (
                                    <div className="flex items-center text-sm md:px-3 py-2 hover:bg-blue-100">
                                       <i className="pi pi-map-marker text-blue-500 mr-2"></i>
                                       <span className="text-gray-800">
                                          {option.name}
                                       </span>
                                    </div>
                                 )}
                              />
                           </div>
                           <button
                              type="button"
                              onClick={handleSearch}
                              className="cursor-pointer text-white absolute top-2 right-2 lg:top-1 lg:right-1 flex justify-center items-center h-12 w-12 lg:h-14 bg-[#FF671F]  font-medium rounded-[50px] text-sm px-4 lg:w-24"
                           >
                              <div className="md:hidden">
                                 <span class="material-symbols-outlined">
                                    search
                                 </span>
                              </div>
                              <span className="hidden md:block">Search</span>
                           </button>
                        </div>
                     </form>
                  </div>
               </div>
               <div className="h-[75vh]">
                  <img
                     className="h-full w-full object-cover"
                     src={hero}
                     alt="hero img"
                  />
               </div>
            </div>
            <div className="flex justify-center bg-gray-900/60 blur-3xl z-0 h-60 w-max-sm lg:h-100 lg:w-250  position absolute top-75 left-5 lg:top-55 lg:-left-50 right-0 bottom-0"></div>
            {/* marque div */}
            <div>
               <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
                  <div className="mt-3 lg:mt-0 text-center ">
                     <div className="w-full inline-flex  flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                        <ul
                           x-ref="logos"
                           className="flex items-center justify-center md:justify-start [&_img]:max-w-none marqueeDiv"
                        >
                           <li className="h-18  text-gray-900 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                              <img
                                 className="h-full p-1"
                                 src={amritha}
                                 alt=""
                              />
                           </li>
                           <li className="h-22 text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                              <img
                                 className="h-full p-1"
                                 src={rajagiri}
                                 alt=""
                              />
                           </li>
                           <li className="h-20 gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                              <img
                                 className="h-full p-1"
                                 src={ramaiah}
                                 alt=""
                              />
                           </li>
                           <li className="h-20 text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                              <img
                                 className="h-full p-1"
                                 src={manipal}
                                 alt=""
                              />
                           </li>
                           <li className="h-25 text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                              <img className="h-full p-1" src={madras} alt="" />
                           </li>
                           <li className="h-20 text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                              <img
                                 className="h-full p-1"
                                 src={presidency}
                                 alt=""
                              />
                           </li>
                           <li className="h-20 text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                              <img className="h-full p-1" src={jain} alt="" />
                           </li>
                           <li className="h-27 text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                              <img className="h-full p-1" src={amity} alt="" />
                           </li>
                           <li className="h-20 text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                              <img className="h-full p-1" src={srm} alt="" />
                           </li>
                           <li className="h-26 text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                              <img className="h-full p-1" src={christ} alt="" />
                           </li>
                        </ul>
                        <ul
                           x-ref="logos"
                           className="flex items-center justify-center md:justify-start [&_img]:max-w-none marqueeDiv"
                        >
                           <li className="h-18 text-gray-900 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                              <img
                                 className="h-full p-1"
                                 src={amritha}
                                 alt=""
                              />
                           </li>
                           <li className="h-22 text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                              <img
                                 className="h-full p-1"
                                 src={rajagiri}
                                 alt=""
                              />
                           </li>
                           <li className="h-20 gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                              <img
                                 className="h-full p-1"
                                 src={ramaiah}
                                 alt=""
                              />
                           </li>
                           <li className="h-20 text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                              <img
                                 className="h-full p-1"
                                 src={manipal}
                                 alt=""
                              />
                           </li>
                           <li className="h-25 text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                              <img className="h-full p-1" src={madras} alt="" />
                           </li>
                           <li className="h-20 text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                              <img
                                 className="h-full p-1"
                                 src={presidency}
                                 alt=""
                              />
                           </li>
                           <li className="h-20 text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                              <img className="h-full p-1" src={jain} alt="" />
                           </li>
                           <li className="h-27 text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                              <img className="h-full p-1" src={amity} alt="" />
                           </li>
                           <li className="h-20 text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                              <img className="h-full p-1" src={srm} alt="" />
                           </li>
                           <li className="h-26 text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                              <img className="h-full p-1" src={christ} alt="" />
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
            {/* major universitycsection  */}
            <div>
               <div
                  data-aos="fade-up"
                  className="flex justify-between items-center mx-10 lg:mx-30 my-20"
               >
                  <h2 className="text-2xl lg:text-3xl font-black text-[#535353]">
                     Major Colleges
                  </h2>{" "}
                   <button
                        onClick={() => navigate("/colleges")}
                        className="text-white h-12 bg-[#FF671F]  font-medium rounded-[50px] text-sm px-4 cursor-pointer"
                     >
                        See all colleges
                     </button>
               </div>
               <div
                  data-aos="fade-up"
                  className="flex flex-wrap justify-center gap-12"
               >
                  {/* Card 1 */}
                  {majorColleges.map((majorCollege) => (
                     <div
                        key={majorCollege.col_id}
                        onClick={() => navigate(`/college/${majorCollege.col_name}/?college_id=${majorCollege.col_id}`)}
                        data-aos="fade-up"
                        className=" bg-white shadow-lg rounded-[28px] overflow-hidden p-5 max-w-sm w-[18rem] h-[22rem] hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer"
                     >
                        <div className="p-4 h-30">
                           <img
                              className="h-20 w-20 object-fill"
                              src={majorCollege.col_image_url}
                              alt="University"
                           />
                           <div className="w-full h-[3px] bg-[#046A38] opacity-50 mt-5 rounded"></div>
                        </div>
                        <div className="p-4">
                           <h2 className="text-base font-bold text-gray-800">
                              {majorCollege.col_name}
                           </h2>
                           <p className="text-gray-600 mt-5">
                              {majorCollege.col_location}
                           </p>
                           <button
                              type="button"
                              className="mt-5 py-2.5 px-5 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:outline-none focus:ring-4 focus:ring-gray-100"
                           >
                              {majorCollege.col_name.length - 1}+ Courses
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* path section  */}
            <div data-aos="fade-down">
               <div data-aos="zoom-in" className="text-center mt-20">
                  <h1 className="text-3xl lg:text-4xl text-[#486284] px-6 lg:px-0">
                     Your Step-by-Step Guide to the Indian Admission Process
                  </h1>
                  <p className="mt-5 text-gray-500 lg:w-1/2 mx-10 lg:mx-auto">
                     Navigate the Indian education system with ease. From
                     selecting the right university and course to application
                     submission, entrance exams, and final enrollment—this guide
                     walks you through every essential step to secure your spot
                     in a top Indian institution.
                  </p>
               </div>
               <div
                  data-aos=""
                  className="relative flex flex-col md:flex-row justify-center mt-10 lg:gap-40"
               >
                  <div className="flex flex-col items-center mt-5">
                     <div className="w-32 h-32 bg-[#486284]/30 rounded-[2rem] flex items-center justify-center">
                        <img
                           className="w-20 h-20"
                           src={college}
                           alt="location"
                        />
                     </div>
                     <h1 className="text-center text-2xl mt-10 font-medium ">
                        Select Your Institution
                     </h1>
                     <p className="w-80 mt-3 p-3  text-center text-slate-500">
                        Explore top universities and colleges across India to
                        find the one that matches your goals.{" "}
                     </p>
                  </div>

                  <div className="w-full h-40 md:h-auto md:w-1/5 lg:absolute flex justify-center lg:top-14 lg:left-92">
                     <img
                        className="w-40 lg:w-auto object-contain transform rotate-90 lg:rotate-0"
                        src={curve_line}
                        alt=""
                        srcset=""
                     />
                  </div>

                  <div className="flex flex-col items-center mt-5">
                     <div className="w-32 h-32 bg-[#486284]/30 rounded-[2rem] flex items-center justify-center">
                        <img className="w-20 h-20" src={done} alt="location" />
                     </div>
                     <h1 className="text-center text-2xl mt-10 font-medium">
                        Submit Application
                     </h1>
                     <p className="w-80 mt-3 p-3 text-center text-slate-500">
                        Complete the online application form with your academic
                        details and necessary documents{" "}
                     </p>
                  </div>

                  <div className="w-full h-40 md:h-auto md:w-1/5 lg:absolute flex justify-center lg:top-14 lg:right-92">
                     <img
                        className="w-40 lg:w-auto object-contain transform rotate-90 lg:rotate-0"
                        src={curve_line}
                        alt=""
                        srcset=""
                     />
                  </div>

                  <div className="flex flex-col items-center mt-5">
                     <div className="w-32 h-32 bg-[#486284]/30 rounded-[2rem] flex items-center justify-center">
                        <img className="w-20 h-20" src={bell} alt="location" />
                     </div>
                     <h1 className="text-center text-2xl mt-10 font-medium">
                        Get Admission Updates
                     </h1>
                     <p className="w-80 mt-3 p-3  text-center text-slate-500">
                        Track your application status and receive notifications
                        about interview calls or admission offers.{" "}
                     </p>
                  </div>
               </div>
            </div>
            <div data-aos="fade-up">
               <div>
                  {/* trending courses */}
                  <div className="flex justify-between items-center mx-5 lg:mx-30 my-20">
                     <h2 className="text-2xl lg:text-3xl font-black text-[#535353]">
                        Trending Courses
                     </h2>{" "}
                     <button
                        onClick={() => navigate("/courses")}
                        className="text-white h-12 bg-[#FF671F]  font-medium rounded-[50px] text-sm px-4 cursor-pointer"
                     >
                        See all courses
                     </button>
                  </div>
               </div>
               {/* card  */}
               <div className="flex flex-row items-center gap-6 justify-center flex-wrap mt-3 mx-2 mb-20">
                  {/* Card 1 */}
                  {trendingCourses.map((trendingCourse) => (
                     <div
                        key={trendingCourse.course_id}
                        onClick={() =>
                           navigate(
                              `/course/${trendingCourse.course_name}?course_id=${trendingCourse.course_id}`
                           )
                        }
                        className="flex w-full max-w-sm lg:max-w-md rounded-xl overflow-hidden shadow-md bg-white gap-2 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer"
                     >
                        <div className="flex flex-col justify-between p-4 flex-1">
                           <h2 className="text-lg font-semibold text-gray-800 mb-3">
                              {trendingCourse.course_name}
                           </h2>
                           <h4 className="text-sm text-gray-600">
                              {trendingCourse.college_name}
                           </h4>
                           <p className="flex items-center space-x-1 opacity-50 text-xs">
                              {trendingCourse.course_in_state}
                           </p>
                        </div>
                        <img
                           src={course1}
                           alt="BCA"
                           className="w-40 object-cover"
                        />
                     </div>
                  ))}
               </div>
            </div>
            {/* testimony section */}
            <div>
               <section className="relative py-20 bg-white text-center overflow-hidden">
                  {/* Decorative Elements */}
                  <div data-aos="zoom-in-right" className="hidden lg:block">
                     <img
                        src={down}
                        alt="Arrow"
                        className="absolute top-40 w-30 left-10"
                     />
                  </div>
                  <div className="bg-[#FF7526]/20 z-0 h-[80vh] lg:h-100 w-150 blur-3xl flex justify-center position absolute top-60 lg:top-20 -left-50 right-0 "></div>
                  <div className="bg-[#FF7526]/20 z-0 h-[80vh] lg:h-100 w-150 blur-3xl flex justify-center position absolute top-60 lg:top-20 -right-50 "></div>

                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                     What Student’s Say
                  </h2>
                  <p className="text-gray-500 mb-12">
                     Lorem Ipsum is simply dummy text of the printing.
                  </p>

                  {/* Testimonial Cards with fade animation */}
                  <div className="relative w-full flex justify-center">
                     <div
                        className={`flex flex-col md:flex-row items-stretch justify-center gap-6 px-4 md:px-0 transition-opacity duration-500 ${
                           fade ? "opacity-100" : "opacity-0"
                        } z-10`}
                     >
                        {getGroupedTestimonials().map((t, index) => (
                           <div
                              key={index}
                              className="bg-white shadow-lg rounded-md p-6 w-80   md:w-90  text-left z-50 flex flex-col justify-between h-full"
                           >
                              <p className="md:min-h-18 min-h-18  text-gray-600 italic mb-4 text-[15px] max-h-40 overflow-y-auto">
                                 {t.quote}
                              </p>
                              <div className="flex items-center gap-3 mt-4 md:min-h-18 min-h-18 ">
                                 <img
                                    src={t.avatar}
                                    alt={t.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                 />
                                 <div className="">
                                    <p className="font-semibold text-gray-800">
                                       {t.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                       {t.role}
                                    </p>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Dots Navigation */}
                  <div className="mt-8 flex justify-center gap-2">
                     {Array.from({ length: totalGroups }).map((_, idx) => (
                        <button
                           key={idx}
                           onClick={() => {
                              setFade(false);
                              setTimeout(() => {
                                 setCurrentGroup(idx);
                                 setFade(true);
                              }, 300);
                           }}
                           className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                              idx === currentGroup
                                 ? "bg-orange-500"
                                 : "bg-gray-300"
                           }`}
                        />
                     ))}
                  </div>

                  {/* Planet Decorative Element */}
                  <div data-aos="zoom-in-left" className="hidden lg:block">
                     <img
                        src={mars}
                        alt="Planet"
                        className="absolute right-10 bottom-30 w-30 opacity-90"
                     />
                  </div>

                  <h3 className="mt-20 text-2xl md:text-3xl font-bold text-black">
                     Our Tracks
                  </h3>
               </section>
            </div>
         </div>
      </>
   );
}

export default Home;

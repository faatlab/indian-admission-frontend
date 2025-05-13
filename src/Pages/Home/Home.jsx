import { Dropdown } from 'primereact/dropdown';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../../assets/main-logo.svg';
import hero from '../../assets/hero.jpeg';
import university1 from '../../assets/university1.svg';
import university2 from '../../assets/university2.svg';
import university3 from '../../assets/university3.svg';
import university4 from '../../assets/university4.svg';
import college from '../../assets/college.svg';
import done from '../../assets/done.svg';
import bell from '../../assets/bell.svg';
import course1 from '../../assets/course1.svg';
import course2 from '../../assets/course2.svg';
import course3 from '../../assets/course3.svg';
import save from '../../assets/save.svg';
import down from '../../assets/down arow.svg';
import mars from '../../assets/mars.svg';
import Aos from 'aos';
import 'aos/dist/aos.css';

function Home() {
  const [state, setState] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const indianStates = [
    { name: 'Andhra Pradesh', code: 'AP' },
    { name: 'Arunachal Pradesh', code: 'AR' },
    { name: 'Assam', code: 'AS' },
    { name: 'Bihar', code: 'BR' },
    { name: 'Chhattisgarh', code: 'CG' },
    { name: 'Goa', code: 'GA' },
    { name: 'Gujarat', code: 'GJ' },
    { name: 'Haryana', code: 'HR' },
    { name: 'Himachal Pradesh', code: 'HP' },
    { name: 'Jharkhand', code: 'JH' },
    { name: 'Karnataka', code: 'KA' },
    { name: 'Kerala', code: 'KL' },
    { name: 'Madhya Pradesh', code: 'MP' },
    { name: 'Maharashtra', code: 'MH' },
    { name: 'Manipur', code: 'MN' },
    { name: 'Meghalaya', code: 'ML' },
    { name: 'Mizoram', code: 'MZ' },
    { name: 'Nagaland', code: 'NL' },
    { name: 'Odisha', code: 'OR' },
    { name: 'Punjab', code: 'PB' },
    { name: 'Rajasthan', code: 'RJ' },
    { name: 'Sikkim', code: 'SK' },
    { name: 'Tamil Nadu', code: 'TN' },
    { name: 'Telangana', code: 'TG' },
    { name: 'Tripura', code: 'TR' },
    { name: 'Uttar Pradesh', code: 'UP' },
    { name: 'Uttarakhand', code: 'UK' },
    { name: 'West Bengal', code: 'WB' },
  ];

  const totalStars = 5;
  const renderStars = (rating) =>
    Array.from({ length: totalStars }).map((_, i) => (
      <span
        key={i}
        className={`text-sm ${
          i < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));

  const testimonials = [
    {
      quote: 'This platform changed my life!',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      name: 'Sarah Lee',
      role: 'Software Engineer',
    },
    {
      quote:
        'Excellent guidance and support. asdjsalkdakasjdaskjldajd asdjlkdjalkjslda ajdlasjdlkajdsl',
      avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
      name: 'James Kim',
      role: 'Data Scientist',
    },
    {
      quote: 'Highly recommend to every student!',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      name: 'Amanda Stone',
      role: 'Product Designer',
    },
    {
      quote: 'Very informative and helpful.',
      avatar: 'https://randomuser.me/api/portraits/men/70.jpg',
      name: 'David Lin',
      role: 'Marketing Analyst',
    },
    {
      quote: 'I landed a job within weeks.',
      avatar: 'https://randomuser.me/api/portraits/women/85.jpg',
      name: 'Olivia Tran',
      role: 'UX Researcher',
    },
    {
      quote: 'The best mentorship I’ve received.',
      avatar: 'https://randomuser.me/api/portraits/men/80.jpg',
      name: 'Tom Jackson',
      role: 'AI Engineer',
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
    if (search) {
      navigate('/course-list', {
        state: { searchTerm: search, selectedState: state },
      });
    }
  };

  useEffect(() => {
    Aos.init({ duration: 600 });
  }, []);

  return (
    <>
      <div>
        <nav>
          <div className="w-full h-20 flex justify-between items-center bg-white shadow-md">
            <img className="w-30 ms-5" src={logo} alt="logo" />
            <div className="hidden md:flex gap-5 p-5">
              <button
                className="text-white bg-[#FF7043]   hover:bg-orange-600 focus:outline-none focus:ring-4  font-medium rounded-full text-sm px-8  py-3 text-center me-2 mb-2"
                onClick={() => navigate('/login')}
              >
                Log In
              </button>
            </div>
          </div>
        </nav>
        {/* hero section */}
        <div className="h-[75vh] relative">
          <div className="position absolute z-10 h-full w-1/2 flex align-center justify-center gap-6 flex-col ps-20 ">
            <div className="flex-col justify-center items-center">
              <h1 className="text-6xl font-black text-white mb-5">
                Never stop <br />
                Dreaming big
              </h1>
            </div>
            <div className="">
              <form className="w-11/13 h-16" onSubmit={handleSearch}>
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative h-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
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
                    className="block w-full h-full ps-10 text-sm text-gray-900 border border-gray-300 rounded-[30px] bg-gray-50 outline-0 "
                    placeholder="Search for a Courses"
                  />

                  <div className="card absolute top-3 right-27 flex justify-content-center">
                    <Dropdown
                      value={state}
                      onChange={(e) => setState(e.value)}
                      options={indianStates}
                      optionLabel="name"
                      placeholder="Select State"
                      className="w-50 px-3 py-2 text-lg focus:outline-none focus:ring-0 shadow-none"
                      virtualScrollerOptions={{ itemSize: 38 }}
                      panelStyle={{ color: 'blue' }}
                      itemTemplate={(option) => (
                        <div className="flex items-center text-sm px-3 py-2 hover:bg-blue-100">
                          <i className="pi pi-map-marker text-blue-500 mr-2"></i>
                          <span className="text-gray-800">{option.name}</span>
                        </div>
                      )}
                    />
                  </div>
                  <button
                    type="submit"
                    className="text-white absolute top-1 right-1 h-14 bg-[#FF671F]  font-medium rounded-[50px] text-sm px-4 w-24"
                  >
                    Search
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
        <div className="bg-gray-900/60 z-0  h-100 w-250 blur-3xl flex justify-center position absolute top-55 -left-50 right-0 bottom-0"></div>
        {/* marque div */}
        <div>
          <div className="w-full max-w-2xl mx-auto px-4 md:px-6">
            <div className="mt-5 text-center ">
              <div className="w-full inline-flex  flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                <ul
                  x-ref="logos"
                  className="flex items-center justify-center md:justify-start [&_img]:max-w-none marqueeDiv"
                >
                  <li className="h-20 text-gray-900 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                    <img className="h-full p-1" src={university1} alt="" />
                    IIT Bombay
                  </li>
                  <li className="h-20 text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                    <img className="h-full p-1" src={university2} alt="" />
                    IIT Madras
                  </li>
                  <li className="h-20 text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                    <img className="h-full p-1" src={university3} alt="" />
                    Delhi University
                  </li>
                  <li className="h-20 text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                    <img className="h-full p-1" src={university4} alt="" />
                    IIT Kanpur
                  </li>
                  <li className="h-20 text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                    <img className="h-full p-1" src={university1} alt="" />
                    IIT Bombay
                  </li>
                  <li className="h-20 text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                    <img className="h-full p-1" src={university2} alt="" />
                    IIT Madras
                  </li>
                  <li className="h-20 text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                    <img className="h-full p-1" src={university3} alt="" />
                    IIT Madras
                  </li>
                  <li className="h-20 text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                    <img className="h-full p-1" src={university4} alt="" />
                    Delhi University
                  </li>
                </ul>
                <ul
                  x-ref="logos"
                  className="flex items-center justify-center md:justify-start [&_img]:max-w-none marqueeDiv"
                >
                  <li className="h-20  text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                    <img className="h-full p-1 " src={university1} alt="" />
                    IIT Bombay
                  </li>
                  <li className="h-20 text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                    <img className="h-full p-1" src={university2} alt="" />
                    IIT Bombay
                  </li>
                  <li className="h-20 text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                    <img className="h-full p-1" src={university3} alt="" />
                    IIT Bombay
                  </li>
                  <li className="h-20 text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                    <img className="h-full p-1" src={university4} alt="" />
                    IIT Bombay
                  </li>
                  <li className="h-20 text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                    <img className="h-full p-1" src={university1} alt="" />
                    IIT Bombay
                  </li>
                  <li className="h-20 text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                    <img className="h-full p-1" src={university2} alt="" />
                    IIT Bombay
                  </li>
                  <li className="h-20 text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                    <img className="h-full p-1" src={university3} alt="" />
                    IIT Bombay
                  </li>
                  <li className="h-20 text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                    <img className="h-full p-1" src={university4} alt="" />
                    IIT Bombay
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
            className="flex justify-between items-center mx-30 my-20"
          >
            <h2 className="text-3xl font-black text-[#535353]">
              Major Universities
            </h2>{' '}
            <button className="text-white h-12 bg-[#FF671F]  font-medium rounded-[50px] text-sm px-4">
              See more
            </button>
          </div>
          <div data-aos="fade-up" className="flex justify-center gap-12">
            {/* Card 1 */}
            <div className=" bg-white shadow-lg rounded-[28px] overflow-hidden p-5 max-w-sm w-[18rem] h-[22rem]">
              <div className="p-4 w-full">
                <img
                  className="h-20 object-cover"
                  src={university1}
                  alt="University"
                />
                <div className="w-full h-[3px] bg-[#046A38] opacity-50 mt-5 rounded"></div>
              </div>
              <div className="p-4">
                <h2 className="text-base font-bold text-gray-800">Mumbai</h2>
                <p className="text-gray-600 mt-5">
                  Indian Institute of Technology Bombay (IIT)
                </p>
                <button
                  type="button"
                  className="mt-5 py-2.5 px-5 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:outline-none focus:ring-4 focus:ring-gray-100"
                >
                  50+ Courses
                </button>
              </div>
            </div>
            {/* Card 2 */}
            <div className="bg-white shadow-lg rounded-[28px] overflow-hidden p-5 max-w-sm w-[18rem] h-[22rem]">
              <div className="p-4 w-full">
                <img
                  className="h-20 object-cover"
                  src={university1}
                  alt="University"
                />
                <div className="w-full h-[3px] bg-[#046A38] opacity-50 mt-5 rounded"></div>
              </div>
              <div className="p-4">
                <h2 className="text-base font-bold text-gray-800">Mumbai</h2>
                <p className="text-gray-600 mt-5">
                  Indian Institute of Technology Bombay (IIT)
                </p>
                <button
                  type="button"
                  className="mt-5 py-2.5 px-5 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:outline-none focus:ring-4 focus:ring-gray-100"
                >
                  50+ Courses
                </button>
              </div>
            </div>
            {/* Card 3 */}
            <div className="bg-white shadow-lg rounded-[28px] overflow-hidden p-5 max-w-sm w-[18rem] h-[22rem]">
              <div className="p-4 w-full">
                <img
                  className="h-20 object-cover"
                  src={university1}
                  alt="University"
                />
                <div className="w-full h-[3px] bg-[#046A38] opacity-50 mt-5 rounded"></div>
              </div>
              <div className="p-4">
                <h2 className="text-base font-bold text-gray-800">Mumbai</h2>
                <p className="text-gray-600 mt-5">
                  Indian Institute of Technology Bombay (IIT)
                </p>
                <button
                  type="button"
                  className="mt-5 py-2.5 px-5 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:outline-none focus:ring-4 focus:ring-gray-100"
                >
                  50+ Courses
                </button>
              </div>
            </div>
            {/* Card 4 */}
            <div className="bg-white shadow-lg rounded-[28px] overflow-hidden p-5 max-w-sm w-[18rem] h-[22rem]">
              <div className="p-4 w-full">
                <img
                  className="h-20 object-cover"
                  src={university1}
                  alt="University"
                />
                <div className="w-full h-[3px] bg-[#046A38] opacity-50 mt-5 rounded"></div>
              </div>
              <div className="p-4">
                <h2 className="text-base font-bold text-gray-800">Mumbai</h2>
                <p className="text-gray-600 mt-5">
                  Indian Institute of Technology Bombay (IIT)
                </p>
                <button
                  type="button"
                  className="mt-5 py-2.5 px-5 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:outline-none focus:ring-4 focus:ring-gray-100"
                >
                  50+ Courses
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* path section  */}
        <div data-aos="fade-down">
          <div data-aos="zoom-in" className="text-center mt-20">
            <h1 className="text-4xl text-[#486284]">
              Your Step-by-Step Guide to the Indian Admission Process
            </h1>
            <p className="mt-5 text-gray-500 w-1/2 mx-auto">
              Navigate the Indian education system with ease. From selecting the
              right university and course to application submission, entrance
              exams, and final enrollment—this guide walks you through every
              essential step to secure your spot in a top Indian institution.
            </p>
          </div>
          <div
            data-aos=""
            className="relative flex flex-col md:flex-row justify-center mt-10 gap-40"
          >
            <div className="flex flex-col items-center mt-5">
              <div className="w-32 h-32 bg-[#486284]/30 rounded-[2rem] flex items-center justify-center">
                <img className="w-20 h-20" src={college} alt="location" />
              </div>
              <h1 className="text-center text-2xl mt-10 font-medium ">
                Select Your Institution
              </h1>
              <p className="w-80 mt-3 p-3  text-center text-slate-500">
                Explore top universities and colleges across India to find the
                one that matches your goals.{' '}
              </p>
            </div>

            <svg
              className="absolute top-10 left-95"
              width="480"
              height="134"
              viewBox="0 0 696 134"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M255.069 63.9437C254.975 62.236 256.311 60.7777 258.018 60.6835C259.727 60.6231 261.186 61.9268 261.248 63.6646C261.342 65.3718 260.006 66.8334 258.299 66.8942C258.267 66.8942 258.205 66.8942 258.143 66.8942C256.497 66.8937 255.131 65.59 255.069 63.9437ZM242.244 66.3663C240.537 66.1481 239.295 64.629 239.511 62.9185C239.698 61.2113 241.251 60.0014 242.958 60.1862C244.666 60.3742 245.878 61.9268 245.691 63.634C245.505 65.2172 244.139 66.3965 242.586 66.3965C242.462 66.3965 242.338 66.3663 242.244 66.3663ZM270.595 62.5485C270.284 60.872 271.401 59.2251 273.078 58.9461C274.786 58.6336 276.4 59.7224 276.711 61.4296C277.021 63.1066 275.904 64.7199 274.195 65.032C274.009 65.0621 273.824 65.0928 273.637 65.0928C272.178 65.0928 270.874 64.0375 270.595 62.5485ZM226.471 63.1367C224.824 62.6696 223.893 60.9319 224.359 59.2855C224.856 57.642 226.563 56.7078 228.208 57.205V57.1753C229.855 57.6726 230.786 59.3797 230.32 61.0266C229.918 62.3916 228.676 63.2616 227.34 63.2616C227.06 63.2612 226.749 63.231 226.471 63.1367ZM285.84 59.195C285.344 57.5482 286.276 55.8075 287.92 55.3136C289.567 54.8163 291.274 55.7773 291.771 57.3935C292.269 59.0371 291.336 60.7777 289.691 61.275C289.412 61.3659 289.101 61.3994 288.791 61.3994C287.455 61.3994 286.245 60.5289 285.84 59.195ZM211.472 57.4845C209.92 56.7719 209.236 54.9068 209.95 53.3542C210.665 51.8017 212.498 51.1192 214.05 51.8347C215.633 52.5473 216.285 54.3789 215.571 55.9649C215.043 57.0811 213.926 57.7664 212.745 57.7664C212.31 57.7664 211.876 57.6721 211.472 57.4845ZM300.156 53.169C299.286 51.6801 299.814 49.7848 301.304 48.9147C302.794 48.0777 304.69 48.5749 305.528 50.0639C306.397 51.5561 305.869 53.448 304.379 54.3181C303.913 54.5972 303.385 54.7216 302.857 54.7216C301.771 54.7216 300.714 54.164 300.156 53.169ZM0.413106 50.2826C-0.425394 48.7602 0.102501 46.8654 1.59285 46.0585H1.62443C3.11479 45.2219 5.0086 45.7493 5.8471 47.2684C6.65543 48.7606 6.12612 50.6559 4.63577 51.4623C4.13993 51.7413 3.64221 51.8658 3.11479 51.8658C2.02742 51.8653 0.972577 51.3072 0.413106 50.2826ZM197.405 50.0337C195.915 49.133 195.449 47.2378 196.318 45.779C197.189 44.2872 199.082 43.7928 200.573 44.6935C202.033 45.5607 202.528 47.456 201.66 48.9147C201.07 49.9093 200.045 50.4673 198.99 50.4673C198.43 50.4673 197.902 50.3127 197.405 50.0337ZM313.57 45.1879C312.639 43.7296 313.073 41.8038 314.501 40.903C315.961 39.9722 317.886 40.4058 318.817 41.8339C319.718 43.2955 319.283 45.2214 317.855 46.1221C317.327 46.4619 316.768 46.6165 316.178 46.6165C315.153 46.6165 314.16 46.1221 313.57 45.1879ZM13.889 42.3953C12.9581 40.9337 13.3936 39.0111 14.8213 38.1104C16.28 37.1762 18.1753 37.6131 19.1061 39.0413C20.0384 40.4996 19.6034 42.4255 18.1753 43.3563C17.6478 43.6688 17.0563 43.8234 16.4983 43.8234C15.4736 43.8234 14.4805 43.3262 13.889 42.3953ZM184.084 41.619C182.655 40.6546 182.252 38.7288 183.215 37.3011C184.146 35.8725 186.071 35.4997 187.5 36.4339C188.929 37.3949 189.332 39.3208 188.401 40.7489C187.779 41.6497 186.818 42.1167 185.793 42.1167C185.203 42.1163 184.613 41.9584 184.084 41.619ZM326.643 36.6823C325.712 35.2541 326.083 33.3283 327.512 32.3639V32.3946C328.942 31.433 330.866 31.8059 331.828 33.2345C332.761 34.6631 332.388 36.5885 330.96 37.55C330.432 37.8926 329.841 38.0774 329.251 38.0774C328.227 38.0769 327.265 37.583 326.643 36.6823ZM26.9934 33.8863C26.0305 32.4582 26.4339 30.5323 27.8621 29.6015C29.2921 28.6706 31.2161 29.0434 32.179 30.472C33.1113 31.9001 32.7064 33.8255 31.2783 34.787C30.7509 35.1297 30.1612 35.2843 29.5711 35.2843C28.578 35.2843 27.583 34.7871 26.9934 33.8863ZM171.105 32.9554C169.677 32.0246 169.272 30.0987 170.235 28.6706C171.167 27.242 173.091 26.839 174.521 27.8C175.949 28.7309 176.352 30.6563 175.42 32.0849C174.8 32.9856 173.837 33.4829 172.812 33.4829C172.223 33.4829 171.633 33.3283 171.105 32.9554ZM339.653 28.0489C338.722 26.6203 339.126 24.6949 340.585 23.764C342.013 22.7997 343.937 23.2366 344.87 24.6647C345.801 26.1235 345.398 28.0187 343.938 28.9798C343.938 28.9798 343.938 28.9798 343.97 28.9798C343.442 29.289 342.852 29.477 342.261 29.477C341.268 29.477 340.243 28.9496 339.653 28.0489ZM40.0658 25.3774C39.1656 23.9191 39.6006 21.9932 41.0589 21.0925C42.5191 20.1918 44.445 20.6589 45.3452 22.0875C46.2459 23.5764 45.7788 25.4716 44.3507 26.3719C44.3507 26.3719 44.3507 26.3719 44.3201 26.3719C43.8228 26.6815 43.2647 26.839 42.7053 26.839C41.6806 26.839 40.6559 26.3082 40.0658 25.3774ZM158.033 24.7255C156.542 23.855 156.075 21.963 156.945 20.4713C157.814 19.0125 159.709 18.5152 161.2 19.3853C162.658 20.2559 163.156 22.1478 162.285 23.64C161.695 24.6317 160.67 25.162 159.615 25.162C159.088 25.162 158.528 25.038 158.033 24.7255ZM352.85 19.728C352.012 18.2362 352.509 16.341 353.999 15.4737C355.49 14.6338 357.384 15.1311 358.254 16.6229C359.092 18.1118 358.595 20.007 357.105 20.8742C356.607 21.1566 356.079 21.2805 355.552 21.2805C354.465 21.2805 353.44 20.7197 352.85 19.728ZM53.4799 17.3991C52.6735 15.8772 53.2631 13.9815 54.7855 13.2052C56.306 12.3983 58.1697 12.987 58.9761 14.5089C59.784 16.0313 59.1944 17.8931 57.672 18.7028C57.2063 18.9517 56.7095 19.0427 56.2137 19.0427C55.0947 19.0427 54.0394 18.4544 53.4799 17.3991ZM144.555 17.4901C143.002 16.7473 142.32 14.9124 143.065 13.3598C143.811 11.8072 145.674 11.1554 147.195 11.8709C148.747 12.617 149.4 14.4788 148.685 16.0313C148.158 17.1503 147.04 17.8021 145.891 17.8021C145.425 17.8026 144.96 17.6781 144.555 17.4901ZM366.575 12.305C365.893 10.7218 366.575 8.89063 368.159 8.20814C369.712 7.49266 371.543 8.20815 372.258 9.76072C372.941 11.3133 372.258 13.1751 370.674 13.8575C370.27 14.0456 369.836 14.1366 369.431 14.1366C368.221 14.1361 367.103 13.4541 366.575 12.305ZM67.5157 10.5978C66.8955 8.98443 67.7019 7.18349 69.3167 6.59197C70.9013 5.97028 72.7027 6.77718 73.3225 8.39338C73.9122 10.0063 73.1359 11.7776 71.5211 12.3992C71.1497 12.5237 70.7769 12.5845 70.4036 12.5845C69.1616 12.5835 67.9824 11.8407 67.5157 10.5978ZM130.457 11.7771C128.812 11.2195 127.943 9.44822 128.501 7.83485C129.029 6.21865 130.8 5.34812 132.415 5.87884C134.03 6.40673 134.93 8.17468 134.37 9.82104C133.935 11.0946 132.724 11.9317 131.452 11.9317C131.109 11.9317 130.768 11.8709 130.457 11.7771ZM381.076 6.53115C380.61 4.88432 381.605 3.17716 383.25 2.7407C384.897 2.27691 386.634 3.26811 387.069 4.91495C387.505 6.56178 386.542 8.26894 384.896 8.73603C384.616 8.79636 384.337 8.827 384.088 8.827C382.69 8.82653 381.449 7.92582 381.076 6.53115ZM82.3274 5.72139C81.9861 4.04439 83.0735 2.40087 84.7505 2.05821C86.427 1.71555 88.0724 2.80387 88.4132 4.48087C88.7559 6.15787 87.669 7.80139 85.992 8.14405C85.7747 8.17469 85.5565 8.20768 85.3703 8.20768C83.9115 8.20768 82.638 7.183 82.3274 5.72139ZM115.77 7.92582C114.093 7.61662 113.007 5.9698 113.317 4.29327C113.628 2.61627 115.242 1.50061 116.951 1.8098C118.628 2.15246 119.745 3.76585 119.404 5.44237C119.124 6.93461 117.82 7.98945 116.359 7.98945C116.175 7.98945 115.988 7.95928 115.77 7.92582ZM97.7286 3.48634C97.7286 1.77917 99.0964 0.381209 100.804 0.351044C102.542 0.351044 103.939 1.71556 103.939 3.42555C103.971 5.13271 102.573 6.56133 100.866 6.56133C100.866 6.56133 100.866 6.56133 100.834 6.56133C99.1266 6.56133 97.7607 5.1935 97.7286 3.48634Z"
                fill="#375994"
              />
            </svg>

            <div className="flex flex-col items-center mt-5">
              <div className="w-32 h-32 bg-[#486284]/30 rounded-[2rem] flex items-center justify-center">
                <img className="w-20 h-20" src={done} alt="location" />
              </div>
              <h1 className="text-center text-2xl mt-10 font-medium">
                Submit Application
              </h1>
              <p className="w-80 mt-3 p-3 text-center text-slate-500">
                Complete the online application form with your academic details
                and necessary documents{' '}
              </p>
            </div>

            <svg
              className="absolute top-10 right-45"
              width="480"
              height="134"
              viewBox="0 0 696 134"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M255.069 63.9437C254.975 62.236 256.311 60.7777 258.018 60.6835C259.727 60.6231 261.186 61.9268 261.248 63.6646C261.342 65.3718 260.006 66.8334 258.299 66.8942C258.267 66.8942 258.205 66.8942 258.143 66.8942C256.497 66.8937 255.131 65.59 255.069 63.9437ZM242.244 66.3663C240.537 66.1481 239.295 64.629 239.511 62.9185C239.698 61.2113 241.251 60.0014 242.958 60.1862C244.666 60.3742 245.878 61.9268 245.691 63.634C245.505 65.2172 244.139 66.3965 242.586 66.3965C242.462 66.3965 242.338 66.3663 242.244 66.3663ZM270.595 62.5485C270.284 60.872 271.401 59.2251 273.078 58.9461C274.786 58.6336 276.4 59.7224 276.711 61.4296C277.021 63.1066 275.904 64.7199 274.195 65.032C274.009 65.0621 273.824 65.0928 273.637 65.0928C272.178 65.0928 270.874 64.0375 270.595 62.5485ZM226.471 63.1367C224.824 62.6696 223.893 60.9319 224.359 59.2855C224.856 57.642 226.563 56.7078 228.208 57.205V57.1753C229.855 57.6726 230.786 59.3797 230.32 61.0266C229.918 62.3916 228.676 63.2616 227.34 63.2616C227.06 63.2612 226.749 63.231 226.471 63.1367ZM285.84 59.195C285.344 57.5482 286.276 55.8075 287.92 55.3136C289.567 54.8163 291.274 55.7773 291.771 57.3935C292.269 59.0371 291.336 60.7777 289.691 61.275C289.412 61.3659 289.101 61.3994 288.791 61.3994C287.455 61.3994 286.245 60.5289 285.84 59.195ZM211.472 57.4845C209.92 56.7719 209.236 54.9068 209.95 53.3542C210.665 51.8017 212.498 51.1192 214.05 51.8347C215.633 52.5473 216.285 54.3789 215.571 55.9649C215.043 57.0811 213.926 57.7664 212.745 57.7664C212.31 57.7664 211.876 57.6721 211.472 57.4845ZM300.156 53.169C299.286 51.6801 299.814 49.7848 301.304 48.9147C302.794 48.0777 304.69 48.5749 305.528 50.0639C306.397 51.5561 305.869 53.448 304.379 54.3181C303.913 54.5972 303.385 54.7216 302.857 54.7216C301.771 54.7216 300.714 54.164 300.156 53.169ZM0.413106 50.2826C-0.425394 48.7602 0.102501 46.8654 1.59285 46.0585H1.62443C3.11479 45.2219 5.0086 45.7493 5.8471 47.2684C6.65543 48.7606 6.12612 50.6559 4.63577 51.4623C4.13993 51.7413 3.64221 51.8658 3.11479 51.8658C2.02742 51.8653 0.972577 51.3072 0.413106 50.2826ZM197.405 50.0337C195.915 49.133 195.449 47.2378 196.318 45.779C197.189 44.2872 199.082 43.7928 200.573 44.6935C202.033 45.5607 202.528 47.456 201.66 48.9147C201.07 49.9093 200.045 50.4673 198.99 50.4673C198.43 50.4673 197.902 50.3127 197.405 50.0337ZM313.57 45.1879C312.639 43.7296 313.073 41.8038 314.501 40.903C315.961 39.9722 317.886 40.4058 318.817 41.8339C319.718 43.2955 319.283 45.2214 317.855 46.1221C317.327 46.4619 316.768 46.6165 316.178 46.6165C315.153 46.6165 314.16 46.1221 313.57 45.1879ZM13.889 42.3953C12.9581 40.9337 13.3936 39.0111 14.8213 38.1104C16.28 37.1762 18.1753 37.6131 19.1061 39.0413C20.0384 40.4996 19.6034 42.4255 18.1753 43.3563C17.6478 43.6688 17.0563 43.8234 16.4983 43.8234C15.4736 43.8234 14.4805 43.3262 13.889 42.3953ZM184.084 41.619C182.655 40.6546 182.252 38.7288 183.215 37.3011C184.146 35.8725 186.071 35.4997 187.5 36.4339C188.929 37.3949 189.332 39.3208 188.401 40.7489C187.779 41.6497 186.818 42.1167 185.793 42.1167C185.203 42.1163 184.613 41.9584 184.084 41.619ZM326.643 36.6823C325.712 35.2541 326.083 33.3283 327.512 32.3639V32.3946C328.942 31.433 330.866 31.8059 331.828 33.2345C332.761 34.6631 332.388 36.5885 330.96 37.55C330.432 37.8926 329.841 38.0774 329.251 38.0774C328.227 38.0769 327.265 37.583 326.643 36.6823ZM26.9934 33.8863C26.0305 32.4582 26.4339 30.5323 27.8621 29.6015C29.2921 28.6706 31.2161 29.0434 32.179 30.472C33.1113 31.9001 32.7064 33.8255 31.2783 34.787C30.7509 35.1297 30.1612 35.2843 29.5711 35.2843C28.578 35.2843 27.583 34.7871 26.9934 33.8863ZM171.105 32.9554C169.677 32.0246 169.272 30.0987 170.235 28.6706C171.167 27.242 173.091 26.839 174.521 27.8C175.949 28.7309 176.352 30.6563 175.42 32.0849C174.8 32.9856 173.837 33.4829 172.812 33.4829C172.223 33.4829 171.633 33.3283 171.105 32.9554ZM339.653 28.0489C338.722 26.6203 339.126 24.6949 340.585 23.764C342.013 22.7997 343.937 23.2366 344.87 24.6647C345.801 26.1235 345.398 28.0187 343.938 28.9798C343.938 28.9798 343.938 28.9798 343.97 28.9798C343.442 29.289 342.852 29.477 342.261 29.477C341.268 29.477 340.243 28.9496 339.653 28.0489ZM40.0658 25.3774C39.1656 23.9191 39.6006 21.9932 41.0589 21.0925C42.5191 20.1918 44.445 20.6589 45.3452 22.0875C46.2459 23.5764 45.7788 25.4716 44.3507 26.3719C44.3507 26.3719 44.3507 26.3719 44.3201 26.3719C43.8228 26.6815 43.2647 26.839 42.7053 26.839C41.6806 26.839 40.6559 26.3082 40.0658 25.3774ZM158.033 24.7255C156.542 23.855 156.075 21.963 156.945 20.4713C157.814 19.0125 159.709 18.5152 161.2 19.3853C162.658 20.2559 163.156 22.1478 162.285 23.64C161.695 24.6317 160.67 25.162 159.615 25.162C159.088 25.162 158.528 25.038 158.033 24.7255ZM352.85 19.728C352.012 18.2362 352.509 16.341 353.999 15.4737C355.49 14.6338 357.384 15.1311 358.254 16.6229C359.092 18.1118 358.595 20.007 357.105 20.8742C356.607 21.1566 356.079 21.2805 355.552 21.2805C354.465 21.2805 353.44 20.7197 352.85 19.728ZM53.4799 17.3991C52.6735 15.8772 53.2631 13.9815 54.7855 13.2052C56.306 12.3983 58.1697 12.987 58.9761 14.5089C59.784 16.0313 59.1944 17.8931 57.672 18.7028C57.2063 18.9517 56.7095 19.0427 56.2137 19.0427C55.0947 19.0427 54.0394 18.4544 53.4799 17.3991ZM144.555 17.4901C143.002 16.7473 142.32 14.9124 143.065 13.3598C143.811 11.8072 145.674 11.1554 147.195 11.8709C148.747 12.617 149.4 14.4788 148.685 16.0313C148.158 17.1503 147.04 17.8021 145.891 17.8021C145.425 17.8026 144.96 17.6781 144.555 17.4901ZM366.575 12.305C365.893 10.7218 366.575 8.89063 368.159 8.20814C369.712 7.49266 371.543 8.20815 372.258 9.76072C372.941 11.3133 372.258 13.1751 370.674 13.8575C370.27 14.0456 369.836 14.1366 369.431 14.1366C368.221 14.1361 367.103 13.4541 366.575 12.305ZM67.5157 10.5978C66.8955 8.98443 67.7019 7.18349 69.3167 6.59197C70.9013 5.97028 72.7027 6.77718 73.3225 8.39338C73.9122 10.0063 73.1359 11.7776 71.5211 12.3992C71.1497 12.5237 70.7769 12.5845 70.4036 12.5845C69.1616 12.5835 67.9824 11.8407 67.5157 10.5978ZM130.457 11.7771C128.812 11.2195 127.943 9.44822 128.501 7.83485C129.029 6.21865 130.8 5.34812 132.415 5.87884C134.03 6.40673 134.93 8.17468 134.37 9.82104C133.935 11.0946 132.724 11.9317 131.452 11.9317C131.109 11.9317 130.768 11.8709 130.457 11.7771ZM381.076 6.53115C380.61 4.88432 381.605 3.17716 383.25 2.7407C384.897 2.27691 386.634 3.26811 387.069 4.91495C387.505 6.56178 386.542 8.26894 384.896 8.73603C384.616 8.79636 384.337 8.827 384.088 8.827C382.69 8.82653 381.449 7.92582 381.076 6.53115ZM82.3274 5.72139C81.9861 4.04439 83.0735 2.40087 84.7505 2.05821C86.427 1.71555 88.0724 2.80387 88.4132 4.48087C88.7559 6.15787 87.669 7.80139 85.992 8.14405C85.7747 8.17469 85.5565 8.20768 85.3703 8.20768C83.9115 8.20768 82.638 7.183 82.3274 5.72139ZM115.77 7.92582C114.093 7.61662 113.007 5.9698 113.317 4.29327C113.628 2.61627 115.242 1.50061 116.951 1.8098C118.628 2.15246 119.745 3.76585 119.404 5.44237C119.124 6.93461 117.82 7.98945 116.359 7.98945C116.175 7.98945 115.988 7.95928 115.77 7.92582ZM97.7286 3.48634C97.7286 1.77917 99.0964 0.381209 100.804 0.351044C102.542 0.351044 103.939 1.71556 103.939 3.42555C103.971 5.13271 102.573 6.56133 100.866 6.56133C100.866 6.56133 100.866 6.56133 100.834 6.56133C99.1266 6.56133 97.7607 5.1935 97.7286 3.48634Z"
                fill="#375994"
              />
            </svg>

            <div className="flex flex-col items-center mt-5">
              <div className="w-32 h-32 bg-[#486284]/30 rounded-[2rem] flex items-center justify-center">
                <img className="w-20 h-20" src={bell} alt="location" />
              </div>
              <h1 className="text-center text-2xl mt-10 font-medium">
                Get Admission Updates
              </h1>
              <p className="w-80 mt-3 p-3  text-center text-slate-500">
                Track your application status and receive notifications about
                interview calls or admission offers.{' '}
              </p>
            </div>
          </div>
        </div>
        <div data-aos="fade-up">
          <div>
            {/* trending courses */}
            <div className="flex justify-between items-center mx-30 my-20">
              <h2 className="text-3xl font-black text-[#535353]">
                Trending Courses
              </h2>{' '}
              <button className="text-white h-12 bg-[#FF671F]  font-medium rounded-[50px] text-sm px-4">
                See more
              </button>
            </div>
          </div>
          {/* card  */}
          <div className=" flex flex-row items-center gap-6 justify-center flex-wrap mt-3 mb-20">
            {/* Card 1 */}
            <div className="flex w-full max-w-md rounded-xl overflow-hidden shadow-md bg-white gap-2">
              <div className="flex flex-col justify-between p-4 flex-1">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Bachelor of Computer Applications
                </h2>
                <div className="flex items-center space-x-1">
                  {renderStars(3)}
                  <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                    <img src={save} alt="" />
                  </span>
                </div>
              </div>
              <img src={course1} alt="BCA" className="w-40 object-cover" />
            </div>

            {/* Card 2 */}
            <div className="flex w-full max-w-md rounded-xl overflow-hidden shadow-md bg-white">
              <div className="flex flex-col justify-between p-4 flex-1">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Bachelor of Information Technology
                </h2>
                <div className="flex items-center space-x-1">
                  {renderStars(4)}
                  <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                    <img src={save} alt="" />
                  </span>
                </div>
              </div>
              <img src={course2} alt="BIT" className="w-40 object-cover" />
            </div>

            {/* Card 3 */}
            <div className="flex w-full max-w-md rounded-xl overflow-hidden shadow-md bg-white">
              <div className="flex flex-col justify-between p-4 flex-1">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Bachelor of Data Science
                </h2>
                <div className="flex items-center space-x-1">
                  {renderStars(5)}
                  <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                    <img src={save} alt="" />
                  </span>
                </div>
              </div>
              <img src={course3} alt="BDS" className="w-40 object-cover" />
            </div>
            <div className="flex w-full max-w-md rounded-xl overflow-hidden shadow-md bg-white">
              <div className="flex flex-col justify-between p-4 flex-1">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Bachelor of Data Science
                </h2>
                <div className="flex items-center space-x-1">
                  {renderStars(5)}
                  <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                    <img src={save} alt="" />
                  </span>
                </div>
              </div>
              <img src={course3} alt="BDS" className="w-40 object-cover" />
            </div>
            <div className="flex w-full max-w-md rounded-xl overflow-hidden shadow-md bg-white">
              <div className="flex flex-col justify-between p-4 flex-1">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Bachelor of Data Science
                </h2>
                <div className="flex items-center space-x-1">
                  {renderStars(5)}
                  <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                    <img src={save} alt="" />
                  </span>
                </div>
              </div>
              <img src={course3} alt="BDS" className="w-40 object-cover" />
            </div>
            <div className="flex w-full max-w-md rounded-xl overflow-hidden shadow-md bg-white">
              <div className="flex flex-col justify-between p-4 flex-1">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Bachelor of Data Science
                </h2>
                <div className="flex items-center space-x-1">
                  {renderStars(5)}
                  <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                    <img src={save} alt="" />
                  </span>
                </div>
              </div>
              <img src={course3} alt="BDS" className="w-40 object-cover" />
            </div>
            <div className="flex w-full max-w-md rounded-xl overflow-hidden shadow-md bg-white gap-2">
              <div className="flex flex-col justify-between p-4 flex-1">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Bachelor of Computer Applications
                </h2>
                <div className="flex items-center space-x-1">
                  {renderStars(3)}
                  <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                    <img src={save} alt="" />
                  </span>
                </div>
              </div>
              <img src={course1} alt="BCA" className="w-40 object-cover" />
            </div>

            {/* Card 2 */}
            <div className="flex w-full max-w-md rounded-xl overflow-hidden shadow-md bg-white">
              <div className="flex flex-col justify-between p-4 flex-1">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Bachelor of Information Technology
                </h2>
                <div className="flex items-center space-x-1">
                  {renderStars(4)}
                  <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                    <img src={save} alt="" />
                  </span>
                </div>
              </div>
              <img src={course2} alt="BIT" className="w-40 object-cover" />
            </div>
            <div className="flex w-full max-w-md rounded-xl overflow-hidden shadow-md bg-white">
              <div className="flex flex-col justify-between p-4 flex-1">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Bachelor of Information Technology
                </h2>
                <div className="flex items-center space-x-1">
                  {renderStars(4)}
                  <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                    <img src={save} alt="" />
                  </span>
                </div>
              </div>
              <img src={course2} alt="BIT" className="w-40 object-cover" />
            </div>
          </div>
        </div>
        {/* testimony section */}
        <div>
          <section  className="relative py-20 bg-white text-center overflow-hidden">
            {/* Decorative Elements */}
           <div data-aos="zoom-in-right" >
              <img
                src={down}
                alt="Arrow"
                className="absolute top-40 w-30 left-10"
              />
           </div>
            <div className="bg-[#FF7526]/20 z-0  h-100 w-150 blur-3xl flex justify-center position absolute  -left-50 right-0 "></div>
            <div className="bg-[#FF7526]/20 z-0  h-100 w-150 blur-3xl flex justify-center position absolute  -right-50 "></div>
  
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              What Student’s Say
            </h2>
            <p className="text-gray-500 mb-12">
              Lorem Ipsum is simply dummy text of the printing.
            </p>
  
            {/* Testimonial Cards with fade animation */}
            <div  className="relative w-full flex justify-center">
              <div
                className={`flex flex-col md:flex-row items-stretch justify-center gap-6 px-4 md:px-0 transition-opacity duration-500 ${
                  fade ? 'opacity-100' : 'opacity-0'
                } z-10`}
              >
                {getGroupedTestimonials().map((t, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-lg rounded-md p-6 w-80   md:w-90  text-left z-50 flex flex-col justify-between h-full"
                  >
                    <p className="md:min-h-26 min-h-18  text-gray-600 italic mb-4 text-[15px] max-h-40 overflow-y-auto">
                      {t.quote}
                    </p>
                    <div className="flex items-center gap-3 mt-4">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">{t.name}</p>
                        <p className="text-sm text-gray-500">{t.role}</p>
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
                    idx === currentGroup ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
  
            {/* Planet Decorative Element */}
           <div data-aos="zoom-in-left" >
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

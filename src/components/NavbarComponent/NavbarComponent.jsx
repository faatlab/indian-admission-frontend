import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/main-logo.svg";
import { Search } from "lucide-react";
import { Dropdown } from "primereact/dropdown";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "sonner";
import { Dialog } from "primereact/dialog";

function NavbarComponent() {
   const [isOpen, setIsOpen] = useState(false);
   const navigate = useNavigate();
   const { user, logout } = useContext(AuthContext);

   const toggleMenu = () => {
      setIsOpen(!isOpen);
   };

   const [state, setState] = useState(null);
   const [search, setSearch] = useState("");

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

   const handleSearch = () => {
      if (search) {
         navigate("/courses-page", {
            state: { searchTerm: search, selectedState: state },
         });
      }
   };

   const handleLogout = () => {
      navigate("/");
      logout();
      setVisible(false);
      toast.success("Logged out successfully");
   };

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
               onClick={handleLogout}
               className="bg-green-500 px-5 py-2 rounded-2xl cursor-pointer"
            >
               Yes
            </button>
         </div>
      </div>
   );

   return (
      <div className="sticky top-0 z-50">
         <nav className="bg-white shadow-md">
            {/* Top section */}
            <div className="w-full h-22 flex justify-between items-center px-5 md:px-10">
               {/* Logo */}
               <img
                  className="w-[130px]"
                  src={logo}
                  alt="logo"
                  onClick={() => navigate("/")}
               />

               {/* Desktop Login Button */}
               <div className="hidden md:flex items-center gap-3 ms-auto">
                  <div className="">
                     <form className="w-[480px] h-12" onSubmit={handleSearch}>
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

                           <div className="h-full absolute top-0 right-26 flex justify-content-center items-center">
                              <Dropdown
                                 value={state}
                                 onChange={(e) => setState(e.value)}
                                 options={indianStates}
                                 optionLabel="name"
                                 placeholder="Select State"
                                 className="text-xs h-full w-40 bg-transparent flex items-center  shadow-none outline-none ring-0"
                                 virtualScrollerOptions={{ itemSize: 38 }}
                                 panelStyle={{ color: "blue" }}
                                 itemTemplate={(option) => (
                                    <div className="flex items-center text-xs px-3 py-2">
                                       <span className="text-gray-800">
                                          {option.name}
                                       </span>
                                    </div>
                                 )}
                                 valueTemplate={(option) => (
                                    <span className="text-slate-800 text-sm">
                                       {option ? option.name : "Select State"}
                                    </span>
                                 )}
                              />
                           </div>
                           <button
                              type="submit"
                              className="text-white absolute top-1 right-1 h-10 bg-[#FF671F]  font-medium rounded-[50px] text-sm px-4 w-24"
                           >
                              Search
                           </button>
                        </div>
                     </form>
                  </div>
                  {user ? (
                     <>
                        <button
                           className="text-slate bg-[#F2F2F2] hover:bg-[#ffad7d] font-medium rounded-full text-sm px-8 py-3"
                           onClick={() => navigate("/saved-course")}
                        >
                           Applied courses
                        </button>
                        <button
                           className="text-slate bg-[#F2F2F2] hover:bg-[#ffad7d] font-medium rounded-full text-sm px-8 py-3"
                           onClick={() => navigate("/profile")}
                        >
                           Profile
                        </button>
                        <button
                           className="text-white bg-[#FF7043] hover:bg-orange-600 font-medium rounded-full text-sm px-8 py-3"
                           onClick={() => setVisible(true)}
                        >
                           Log Out
                        </button>
                     </>
                  ) : (
                     <button
                        className="text-white bg-[#FF7043] hover:bg-orange-600 font-medium rounded-full text-sm px-8 py-3"
                        onClick={() => navigate("/login")}
                     >
                        Log In
                     </button>
                  )}
               </div>
               {/* Hamburger Icon for Mobile */}
               <div className="md:hidden">
                  <button onClick={toggleMenu} aria-label="Toggle Menu">
                     {isOpen ? <X size={28} /> : <Menu size={28} />}
                  </button>
               </div>
            </div>

            {/* Mobile Dropdown */}
            <div
               className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
               }`}
            >
               <div className="px-5 py-4 space-y-4">
                  {/* Mobile SearchBar */}
                  <div className="">
                     <form className="w-full h-12" onSubmit={handleSearch}>
                        <label
                           htmlFor="default-search"
                           className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                        >
                           Search
                        </label>
                        <div className="relative h-full">
                           <input
                              type="search"
                              id="default-search"
                              name="search"
                              onChange={(e) => setSearch(e.target.value)}
                              className="block w-full h-full ps-4 pe-44 text-sm text-gray-900 border border-gray-300 rounded-[30px] bg-gray-50 outline-0 "
                              placeholder="Search for a Courses"
                           />

                           <div className="h-full absolute top-0 right-0 flex justify-content-center items-center">
                              <Dropdown
                                 value={state}
                                 onChange={(e) => setState(e.value)}
                                 options={indianStates}
                                 optionLabel="name"
                                 placeholder="Select State"
                                 className="text-xs h-full w-40 bg-transparent flex items-center shadow-none outline-none ring-0"
                                 virtualScrollerOptions={{ itemSize: 38 }}
                                 panelStyle={{ color: "blue" }}
                                 itemTemplate={(option) => (
                                    <div className="flex items-center text-xs px-3 py-2">
                                       <span className="text-gray-800">
                                          {option.name}
                                       </span>
                                    </div>
                                 )}
                                 valueTemplate={(option) => (
                                    <span className="text-slate-800 text-sm">
                                       {option ? option.name : "Select State"}
                                    </span>
                                 )}
                              />
                           </div>
                        </div>
                     </form>
                  </div>

                  {/* Mobile Log In */}
                  <button
                     type="button"
                     className="flex justify-center items-center gap-2 w-full text-[#FF7043] border border-[#FF7043] hover:bg-orange-600 font-medium rounded-full text-sm px-8 py-3"
                  >
                     <svg
                        className="w-3 h-3"
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
                     Search
                  </button>
                  {user ? (
                     <>
                        <div className="flex justify-between gap-3">
                           <button
                              className="w-full text-slate bg-[#F2F2F2] hover:bg-[#ffad7d] font-medium rounded-full text-sm px-8 py-3 flex items-center justify-center"
                              onClick={() => navigate("/saved-course")}
                           >
                              Applied Course
                           </button>
                           <button
                              className="w-full text-slate bg-[#F2F2F2] hover:bg-[#ffad7d] font-medium rounded-full text-sm px-8 py-3 flex items-center justify-center"
                              onClick={() => navigate("/saved-course")}
                           >
                              Profile
                           </button>
                        </div>
                        <button
                           className="w-full text-white bg-[#FF7043] hover:bg-orange-600 font-medium rounded-full text-sm px-8 py-3"
                           onClick={() => setVisible(true)}
                        >
                           Log Out
                        </button>
                     </>
                  ) : (
                     <>
                        <button
                           className="w-full text-white bg-[#FF7043] hover:bg-orange-600 font-medium rounded-full text-sm px-8 py-3"
                           onClick={() => {
                              setIsOpen(false);
                              navigate("/login");
                           }}
                        >
                           Log In
                        </button>
                     </>
                  )}
               </div>
            </div>
         </nav>
         <Dialog
            header="Logout"
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
            <p className="text-slate-600">Are you sure you want to Log out.</p>
         </Dialog>
      </div>
   );
}

export default NavbarComponent;

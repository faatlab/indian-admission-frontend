import { Route, Routes } from "react-router-dom";
import "./App.css";
import FooterComponent from "./components/FooterComponent/FooterComponent";
import Home from "./Pages/Home/Home";
import CoursePage from "./Pages/CoursePage/CoursePage";
import CourseList from "./Pages/CourseList/CourseList";
import LoginPage from "./Pages/Login/LoginPage";
import SignupPage from "./Pages/SignupPage/SignupPage";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import SavedCourse from "./Pages/SavedCourse/SavedCourse";
import ProfilePage from "./Pages/Profile/ProfilePage";
import CollegePage from "./Pages/CollegePage/CollegePage";
import Contactus from "./Pages/Contactus/Contactus";
import { FrappeProvider } from "frappe-react-sdk";
import { Toaster } from "sonner";

function App() {
   const frappe_url = import.meta.env.VITE_FRAPPE_URL;

   return (
      <>
         <FrappeProvider url={frappe_url} enableSocket={false}>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/course" element={<CoursePage />} />
               <Route path="/course-list" element={<CourseList />} />
               <Route path="/login" element={<LoginPage />} />
               <Route path="/signup" element={<SignupPage />} />
               <Route path="/forgot-password" element={<ForgotPassword />} />
               <Route path="/saved-course" element={<SavedCourse />} />
               <Route path="/profile" element={<ProfilePage />} />
               <Route path="/college-page" element={<CollegePage />} />
               <Route path="/contact-us" element={<Contactus />} />
               <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
            <FooterComponent />
            <Toaster position="top-center" />
         </FrappeProvider>
      </>
   );
}

export default App;

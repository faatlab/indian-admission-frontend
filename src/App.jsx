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

function App() {
   const api_key = import.meta.env.VITE_FRAPPE_STUDENT_KEY;
   const api_secret = import.meta.env.VITE_FRAPPE_STUDENT_SECRET;
   const frappe_url = import.meta.env.VITE_FRAPPE_URL;
   return (
      <>
         <FrappeProvider
            url="http://indianadmission.localhost:8000"
            // socketPort="9000"
            enableSocket={false}
            tokenParams={{
               type: "token",
               useToken: "true",
               token: () => `${api_key}:${api_secret}`,
            }}
         >
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
         </FrappeProvider>
      </>
   );
}

export default App;

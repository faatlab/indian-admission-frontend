import { Navigate, Route, Routes, useLocation } from "react-router-dom";
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
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import StudentForm from "./Pages/StudentForm/StudentForm";

import { FrappeProvider } from "frappe-react-sdk";
import { toast, Toaster } from "sonner";
import Faq from "./Pages/Faq/faq";
import { useContext } from "react";
import { api_key, api_secret, frappe_url } from "./constants/globalConstants";
import { AuthContext } from "./context/AuthProvider";
import TermsAndConditions from "./Pages/TermsAndConditions/TermsAndConditions";
import Privacy from "./Pages/Privacy/Privacy";
import ScrollToTop from "./components/ScrollToTop";
import NavbarComponent from "./components/NavbarComponent/NavbarComponent";
import AppliedCourse from "./Pages/AppliedCourse/AppliedCourse";

function ProtectedRoute({ children }) {
   const { isAuthenticated, loading } = useContext(AuthContext);

   if (loading) return <p>Loading...</p>;

   if (!isAuthenticated) {
      toast.error("You need to log in to access this page.");
      return <Navigate to="/login" />;
   }
   return children;
}

function App() {
   const location = useLocation();

   const hideNavbarOnRoutes = ["/login", "/signup", "/forgot-password"];
   const shouldHideNavbar = hideNavbarOnRoutes.includes(location.pathname);
   return (
      <>
         <FrappeProvider
            url={frappe_url}
            enableSocket={false}
            tokenParams={{
               type: "token",
               useToken: "true",
               token: () => `${api_key}:${api_secret}`,
            }}
         >
            <ScrollToTop />
            {!shouldHideNavbar && <NavbarComponent />}
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/login" element={<LoginPage />} />
               <Route path="/signup" element={<SignupPage />} />
               <Route path="/forgot-password" element={<ForgotPassword />} />
               <Route path="/contact-us" element={<Contactus />} />
               <Route
                  path="/terms-and-conditions"
                  element={<TermsAndConditions />}
               />
               <Route path="/privacy-policy" element={<Privacy />} />
               <Route path="/faq" element={<Faq />} />
               <Route path="/college-page" element={<CollegePage />} />
               <Route path="/courses-page" element={<CourseList />} />
               <Route path="/course/:id" element={<CoursePage />} />
               <Route
                  path="/profile"
                  element={
                     <ProtectedRoute>
                        <ProfilePage />
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="/application-form/:id"
                  element={
                     <ProtectedRoute>
                        <StudentForm />
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="/saved-course"
                  element={
                     <ProtectedRoute>
                        <SavedCourse />
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="/applied-course"
                  element={
                     <ProtectedRoute>
                        <AppliedCourse />
                     </ProtectedRoute>
                  }
               />
               <Route path="*" element={<PageNotFound />} />
            </Routes>
            <FooterComponent />
            <Toaster position="top-center" duration={2100} />
         </FrappeProvider>
      </>
   );
}

export default App;

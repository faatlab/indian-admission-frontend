import { Route, Routes } from 'react-router-dom';
import './App.css';
import FooterComponent from './components/FooterComponent/FooterComponent';
import Home from './Pages/Home/Home';
import CoursePage from './Pages/CoursePage/CoursePage';
import CourseList from './Pages/CourseList/CourseList';
import LoginPage from './Pages/Login/LoginPage';
import SignupPage from './Pages/SignupPage/SignupPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course" element={<CoursePage />} />
        <Route path="/course-list" element={<CourseList />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
      <FooterComponent />
    </>
  );
}

export default App;

import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProfessionalProfile from "../pages/professional/ProfessionalProfile";
import ProfessionalDashboard from "../pages/professional/ProfessionalDashboard";
import ProfessionalCourseInfo from "../pages/professional/ProfessionalCourseInfo";
import ProfessionalNotification from "../pages/professional/ProfessionalNotification";

import InstitutionCourseInfo from "../pages/institution/InstitutionCourseInfo";
import InstitutionDashboard from "../pages/institution/InstitutionDashboard";
import InstitutionNotification from "../pages/institution/InstitutionNotification";
import InstitutionProfile from "../pages/institution/InstitutionProfile";
import InstitutionRequests from "../pages/institution/InstitutionRequests";
import CreateCourse from "../pages/institution/CreateCourse";




const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/home" replace />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
      path: "/home",
      element: <Home /> ,
    },
   
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/professional/profile",
        element: <ProfessionalProfile />,
    },
    {
        path: "/professional/dashboard",
        element: <ProfessionalDashboard />,
    },
    {
        path: "/professional/courses/:courseId",
        element: <ProfessionalCourseInfo />,
    },
    {
        path: "/professional/notification",
        element: <ProfessionalNotification />,
    },
    
    {
        path: "/institution/profile",
        element: <InstitutionProfile />,
    },
    {
        path: "/institution/dashboard",
        element: <InstitutionDashboard />,
    },
    {
        path: "/institution/courses/:courseId",
        element: <InstitutionCourseInfo />,
    },
    {
        path: "/institution/notifications",
        element: <InstitutionNotification />,
    },
    {
        path: "/institution/requests",
        element: <InstitutionRequests />,
    },
    {
        path: "/institution/courses/new",
        element: <CreateCourse />,
    },
    
    
 
  ]);

export default router;
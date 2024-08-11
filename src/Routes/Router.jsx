import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import SignIn from "../Pages/SignIn/SignIn";
import RegisterStudent from "../Pages/Register/RegisterStudent";
import RegisterTeacher from "../Pages/Register/RegisterTeacher";
import Profile from "../Pages/Dashboard/Profile/Profile";
import AllProjects from "../Pages/AllProjects/AllProjects";
import JoinGeustTeacher from "../Pages/JoinGeustTeacher/JoinGeustTeacher";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/projects",
        element: <AllProjects />,
      },
      {
        path: "/join-as-guest-teacher",
        element: <JoinGeustTeacher />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/signup-student",
    element: <RegisterStudent />,
  },
  {
    path: "/signup-teacher",
    element: <RegisterTeacher />,
  },
]);

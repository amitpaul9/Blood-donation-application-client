import { createBrowserRouter } from "react-router";
import Layouts from "../Layouts/Layouts";
import Home from "../Components/Home/Home/Home";
import Dashboard from "../Components/Dashboard/Dashboard";
import Login from "../Components/Login/Login";
import Registration from "../Components/Registration/Registration";


export const router = createBrowserRouter([
    {
        path: "/",
        Component: Layouts,
        errorElement: <h1 className="text-center text-5xl text-red-900">404 not found</h1>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/dashboard',
                Component: Dashboard
            },
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'registration',
                Component: Registration
            }
        ]
    },
]);
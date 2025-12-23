import { createBrowserRouter } from "react-router";
import Layouts from "../Layouts/Layouts";
import Home from "../Components/Home/Home/Home";
import Login from "../Components/Login/Login";
import Registration from "../Components/Registration/Registration";
import DashboardLayout from "../Components/Dashboard/DashboardLayout/DashboardLayout";
import DashboardHome from "../Components/Dashboard/DashboardHome/DashboardHome";
import DonationRequest from "../Components/Dashboard/DonationRequest/DonationRequest";
import MyRequest from "../Components/Dashboard/MyRequest/MyRequest";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import Profile from "../Components/Dashboard/Profile/Profile";
import AllUsers from "../Components/Dashboard/AllUsers/AllUsers";



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
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Registration
            }
        ]

    },
    {
        path: 'dashboard',
        element: <PrivateRouter><DashboardLayout></DashboardLayout></PrivateRouter>,
        errorElement: <h1 className="text-center text-5xl text-red-900">404 not found</h1>,
        children: [
            {
                index: true,
                element: <PrivateRouter><DashboardHome></DashboardHome></PrivateRouter>
            },
            {
                path: 'donation-request',
                element: <PrivateRouter><DonationRequest></DonationRequest></PrivateRouter>
            },
            {
                path: 'my-requests',
                element: <PrivateRouter><MyRequest></MyRequest></PrivateRouter>
            },
            {
                path: 'profile',
                element: <PrivateRouter><Profile></Profile></PrivateRouter>

            },
            {
                path: 'allusers',
                element: <PrivateRouter><AllUsers></AllUsers></PrivateRouter>
            }

        ]
    }
]);
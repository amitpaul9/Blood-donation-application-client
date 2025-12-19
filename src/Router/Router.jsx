import { createBrowserRouter } from "react-router";
import Layouts from "../Layouts/Layouts";
import Home from "../Components/Home/Home/Home";
import Login from "../Components/Login/Login";
import Registration from "../Components/Registration/Registration";
import DashboardLayout from "../Components/Dashboard/DashboardLayout/DashboardLayout";
import DashboardHome from "../Components/Dashboard/DashboardHome/DashboardHome";
import DonationRequest from "../Components/Dashboard/DonationRequest/DonationRequest";
import MyRequest from "../Components/Dashboard/MyRequest/MyRequest";


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
                path: 'registration',
                Component: Registration
            }
        ]

    },
    {
        path: 'dashboard',
        element: <DashboardLayout></DashboardLayout>,
        errorElement: <h1 className="text-center text-5xl text-red-900">404 not found</h1>,
        children: [
            {
                index: true,
                Component: DashboardHome
            },
            {
                path: 'donation-request',
                Component: DonationRequest
            },
            {
                path: 'my-requests',
                Component: MyRequest
            }

        ]
    }
]);
import { createBrowserRouter } from "react-router";
import Layouts from "../Layouts/Layouts";
import Home from "../Components/Home/Home/Home";


export const router = createBrowserRouter([
    {
        path: "/",
        Component: Layouts,
        errorElement: <h1 className="text-center text-5xl text-red-900">404 not found</h1>,
        children: [
            {
                index: true,
                Component: Home
            }
        ]
    },
]);
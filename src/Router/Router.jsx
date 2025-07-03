import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";

export const router =createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children:[
            {
                index: true,
                Component: Home
            }
        ]
    }
])
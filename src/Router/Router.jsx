import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import About from "../Pages/shared/About/About";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import SendParcel from "../Pages/SendParcel/SendParcel";
import PrivetRout from "../PrivetRoute/PrivetRout";
import DeshboardLayout from "../layouts/DeshboardLayout";
import MyParcels from "../Pages/Deshboard/Myparcel/MyParcels";
import Payment from "../Pages/Deshboard/Payment/Payment";
import PaymentHistry from "../Pages/Deshboard/PaymentHistry/PaymentHistry";
import TrackPackge from "../Pages/Deshboard/TrackPackge/TrackPackge";
import BeARider from "../Pages/Deshboard/BeARider/BeARider";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/about',
                Component: About
            },
            {
                path: '/coverage',
                Component: Coverage,
                loader: () => fetch('./warehouses.json')
            },
            {
                path: '/sendparcel',
                element: <PrivetRout>
                    <SendParcel></SendParcel>
                </PrivetRout>,
                loader: () => fetch('./warehouses.json')
            },
            {
                path: '/beARider',
                element: <PrivetRout>
                    <BeARider></BeARider>
                </PrivetRout>,
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            }
        ]
    },
    {
        path: '/deshboard',
        element: <PrivetRout>
            <DeshboardLayout></DeshboardLayout>
        </PrivetRout>,
        children:[
            {
                path:'myparcels',
                Component: MyParcels
            },
            {
                path:'payment/:parcelId',
                Component: Payment,
            },
            {
                path:'History',
                Component: PaymentHistry,
            },
            {
                path:'track_parcel',
                Component: TrackPackge,
            }
        ]
    }
])
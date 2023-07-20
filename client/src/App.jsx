import { Navigate, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import Footer from "./Components/Footer.jsx";
import Header from "./Components/Header.jsx";
import Home from "./Pages/Home.jsx";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import Single from "./Pages/Single.jsx";
import AddCar from "./Pages/AddCar.jsx";
import Revue from "./Pages/Revues.jsx";
import Horaires from "./Pages/Horaires.jsx";
import OurCars from "./Pages/OurCars.jsx";

export const proxy = "http://localhost:8800/api";

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
                        {
                path: "/our-cars",
                element: <OurCars />,
            },
            {
                path: "/reviews",
                element: <Revue />,
            },
            {
                path: "/cars/:id",
                element: <Single />,
            },
            {
                path: "/cars/add",
                element: <AddCar />
            },
            {
                path: "/hours",
                element: <Horaires />
            },
        ],
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
]);

export default function App() {

    return <>
        <div className="app">
            <RouterProvider router={router}  />
        </div>
    </>
}
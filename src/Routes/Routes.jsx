import Main from "@/Layout/Main";
import Dashboard from "@/Pages/Dashboard/Dashboard";
import DonationCampaigns from "@/Pages/DonationCampaigns/DonationCampaigns";
import DonationDetails from "@/Pages/DonationDetails/DonationDetails";
import Home from "@/Pages/Home/Home";
import Login from "@/Pages/Login/Login";
import PetDetails from "@/Pages/PetDetails/PetDetails";
import PetListing from "@/Pages/PetListing/PetListing";
import Register from "@/Pages/Register/Register";

import {
    createBrowserRouter,
  } from "react-router-dom";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: 'PetListing',
          element: <PetListing></PetListing>
      },
      {
        path: '/PetDetails/:id',
        element: <PetDetails></PetDetails>
      }, 
      {
        path: '/DonationCampaigns',
        element: <DonationCampaigns></DonationCampaigns>
      }, 
      {
        path: '/DonationDetails/:id',
        element: <DonationDetails></DonationDetails>
      }, 
      {
        path: '/Login',
        element: <Login></Login>
      }, 
      {
        path: '/Register',
        element: <Register></Register>
      }, 
      {
        path: '/Dashboard',
        element: <Dashboard></Dashboard>
      }, 
      ]
    },
  ]);
import Dashboard from "@/Layout/Dashboard";
import Main from "@/Layout/Main";
import DonationCampaigns from "@/Pages/DonationCampaigns/DonationCampaigns";
import DonationDetails from "@/Pages/DonationDetails/DonationDetails";
import Home from "@/Pages/Home/Home";
import Login from "@/Pages/Login/Login";
import PetDetails from "@/Pages/PetDetails/PetDetails";
import PetListing from "@/Pages/PetListing/PetListing";
import ProtectedRoute from "@/Pages/ProtectedRoute/ProtectedRoute";
// import Register from "@/Pages/Register/Register";

import {
    createBrowserRouter,
  } from "react-router-dom";
import AddPet from "../Pages/Dashboard/AddPet/AddPet";
import AdoptionRequest from "@/Pages/Dashboard/AdoptionRequest/AdoptionRequest";
import MyAddedPets from "@/Pages/Dashboard/MyAddedPets/MyAddedPets";
import CreateDonationCampaign from "@/Pages/Dashboard/CreateDonationCampaign/CreateDonationCampaign";
import MyDonationCampaigns from "@/Pages/Dashboard/MyDonationCampaigns/MyDonationCampaigns";
import MyDonations from "@/Pages/Dashboard/MyDonations/MyDonations";
import Payment from "@/Pages/Payment/Payment";
import UpdatePet from "@/Pages/Dashboard/MyAddedPets/UpdatePet";
import BasicTable from "@/Pages/Dashboard/MyAddedPets/BasicTable";
import EditDonationCampaign from "@/Pages/Dashboard/MyDonationCampaigns/EditDonationCampaign";

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
        element: <ProtectedRoute>
          <DonationDetails></DonationDetails>
          </ProtectedRoute>
      }, 
      {
        path: '/Payment/:id/:donationAmount/:donatedAmount',
        element: <Payment></Payment>
      },
      {
        path: '/Login',
        element: <Login></Login>
      }, 
      // {
      //   path: '/Register',
      //   element: <Register></Register>
      // }, 
      ]
    },
    {
      path: 'Dashboard',
      element: <ProtectedRoute><Dashboard></Dashboard></ProtectedRoute>,
      children: [
        {
          path: 'AddPet',
          element: <AddPet></AddPet>
        },
       
        {
          path: 'MyAddedPets',
          element: <MyAddedPets></MyAddedPets>
          
        },
        {
          path: 'UpdatePet/:id', 
          element: <UpdatePet></UpdatePet>,
          loader: ({ params }) => fetch(`http://localhost:5000/petDetails/${params.id}`),
        }, 
        {
          path: 'BasicTable', 
          element: <BasicTable></BasicTable>
        }, 
        {
          path: 'EditDonationCampaign/:id', 
          element: <EditDonationCampaign></EditDonationCampaign>,
          loader: ({ params }) => fetch(`http://localhost:5000/donationCampaignDetailsById/${params.id}`),
        }, 
        
        {
          path: 'AdoptionRequest',
          element: <AdoptionRequest></AdoptionRequest>
        },
        {
          path: 'CreateDonationCampaign',
          element: <CreateDonationCampaign></CreateDonationCampaign>
        },
        {
          path: 'MyDonationCampaigns',
          element: <MyDonationCampaigns></MyDonationCampaigns>
        }, 
        {
          path: 'MyDonations',
          element: <MyDonations></MyDonations>
        }
      ]
    }
  ]);
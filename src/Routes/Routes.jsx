import Main from "@/Layout/Main";
import Home from "@/Pages/Home/Home";
import PetListing from "@/Pages/PetListing/PetListing";
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
      }
      ]
    },
  ]);
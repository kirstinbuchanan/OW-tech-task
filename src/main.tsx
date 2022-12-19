import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Title } from "./models/Title";
import TitleDetails from "./pages/TitleDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: async () => {
      return (
        await axios.get(
          "https://owfetechtask.blob.core.windows.net/titledata/testdata.json"
        )
      ).data;
    },
  },
  {
    path: "/:titleNumber",
    element: <TitleDetails />,
    loader: async ({ params }) => {
      const allData = (
        await axios.get<Title[]>(
          "https://owfetechtask.blob.core.windows.net/titledata/testdata.json"
        )
      ).data;

      return allData.find(
        (title) => title["Title Number"] === params.titleNumber
      );
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "@/pages/root";
import ErrorPage from "@/pages/error-page";
import Home from "@/pages/home";
import Cohorts from "@/pages/cohorts";
import Preview from "@/pages/preview";
import CohortForm from "./pages/cohort-form";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "cohorts",
        element: <Cohorts />,
        errorElement: <ErrorPage />,
      },
      {
        path: "cohorts/:cohortId",
        element: <CohortForm />,
      },
    ],
  },
  {
    path: "cohorts/preview/:cohortId",
    element: <Preview />,
    errorElement: <ErrorPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

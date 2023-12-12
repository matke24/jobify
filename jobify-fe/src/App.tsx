import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  Admin,
  AddJob,
  AllJobs,
  Stats,
  Profile,
  EditJob,
} from "./pages";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  addJobAction,
  allJobsLoader,
  checkDefaultTheme,
  dashboardLoader,
  editJobAction,
  formActionLogin,
  formActionRegister,
  singleJobLoader,
} from "./utils";
import { deleteJobAction } from "./pages/DeleteJob";

checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
        action: formActionLogin,
      },
      {
        path: "register",
        element: <Register />,
        action: formActionRegister,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction,
          },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            loader: singleJobLoader,
            action: editJobAction,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: allJobsLoader,
          },
          {
            path: "stats",
            element: <Stats />,
          },
          {
            path: "admin",
            element: <Admin />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "delete-job/:id",
            action: deleteJobAction,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

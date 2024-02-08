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
  editJobAction,
  formActionLogin,
  formActionRegister,
  updateUserAction,
} from "./actions";
import { deleteJobAction } from "./pages";
import {
  checkDefaultTheme,
  dashboardLoader,
  singleJobLoader,
  allJobsLoader,
  adminLoader,
  statsLoader,
} from "./utils";

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
            loader: statsLoader,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: "profile",
            element: <Profile />,
            action: updateUserAction,
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

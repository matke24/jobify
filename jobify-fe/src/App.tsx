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
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
import { ErrorElement } from "./components";
import { queryClient } from "./query-service";

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
        element: <DashboardLayout queryClient={queryClient} />,
        loader: dashboardLoader(queryClient),
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
            errorElement: <ErrorElement />,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: allJobsLoader,
            errorElement: <ErrorElement />,
          },
          {
            path: "stats",
            element: <Stats />,
            loader: statsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
            errorElement: <ErrorElement />,
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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

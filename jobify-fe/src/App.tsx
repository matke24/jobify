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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
            errorElement: <ErrorElement />,
          },
          {
            path: "stats",
            element: <Stats />,
            loader: statsLoader,
            errorElement: <ErrorElement />,
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5min validity time
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

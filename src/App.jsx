import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import TurfDetails from "./pages/TurfDetails";
import MyBookings from "./pages/MyBookings";
import OwnerDashboard from "./pages/OwnerDashboard";
import CreateTurf from "./pages/CreateTurf";
import MyTurfs from "./pages/MyTurfs";
import OwnerBookings from "./pages/OwnerBookings";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Profile from "./pages/Profile";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/profile", element: <Profile /> },

      { path: "/turfs/:turfId", element: <TurfDetails /> },
      { path: "/my-bookings", element: <MyBookings /> },

      { path: "/owner/dashboard", element: <OwnerDashboard /> },
      { path: "/owner/turf/create", element: <CreateTurf /> },
      { path: "/owner/turfs", element: <MyTurfs /> },
      { path: "/owner/bookings", element: <OwnerBookings /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
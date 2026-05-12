import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Body = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1">
        <h1 className="text-3xl font-bold text-center mt-10">
          Body is working
        </h1>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Body;
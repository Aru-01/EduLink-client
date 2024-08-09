import { Outlet } from "react-router-dom";
import Nav from "../Pages/shared_style/Nav";
import Footer from "../Pages/shared_style/Footer";

const Main = () => {
  return (
    <div>
      <Nav />
      <div className="">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;

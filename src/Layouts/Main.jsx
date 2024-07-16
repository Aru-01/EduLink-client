import { Outlet } from "react-router-dom";
import Nav from "../Pages/shared_style/Nav";
import Footer from "../Pages/shared_style/Footer";

const Main = () => {
  return (
    <div>
      <Nav/>
      <Outlet />
      <Footer/>
    </div>
  );
};

export default Main;

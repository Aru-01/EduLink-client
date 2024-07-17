import { useContext } from "react";
import BeforeLoginNav from "../../Components/Nav/BeforeLoginNav";
import { AuthContext } from "../../Providers/AuthProviders";
import AfterLoginNav from "../../Components/Nav/AfterLoginNav";

const Nav = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {user ? <AfterLoginNav /> : <BeforeLoginNav />}
    </div>
  );
};

export default Nav;

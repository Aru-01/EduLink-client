import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/LOGO/logo.png";
import avater from "../../assets/profile/avater.png";
import { AuthContext } from "../../Providers/AuthProviders";
import Swal from "sweetalert2";

const AfterLoginNav = () => {
  const [showLinks, setShowLinks] = useState(false);
  const [isGlass, setIsGlass] = useState(false);

  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Log Out Successful",
          showConfirmButton: true,
          timer: 1200,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsGlass(true);
      } else {
        setIsGlass(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getLinkClass = (path) => {
    return location.pathname === path ? "text-[#703ee6]" : "";
  };

  return (
    <div
      className={`navbar bg-[#EFF8F2] px-5 font-inria-sans md:py-1 lg:py-2 text-black fixed top-0 left-0 right-0 z-50 shadow-md transition duration-300 ${
        isGlass ? "bg-[#eff8f2] bg-opacity-50 shadow-md" : ""
      }`}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
            onClick={() => setShowLinks(!showLinks)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            className={`menu menu-sm dropdown-content bg-[#EFF8F2] rounded-box z-[1] mt-3 w-52 p-2 shadow ${
              showLinks ? "block" : "hidden"
            } lg:hidden`}
          >
            <li>
              <Link to="/" className={getLinkClass("/")}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/projects" className={getLinkClass("/projects")}>
                Projects
              </Link>
            </li>
            <li>
              <Link to="#">
                Attend Test
              </Link>
              <ul className="p-2">
                <li>
                  <Link to="/class-test">Class Test</Link>
                </li>
                <li>
                  <Link to="/quiz-test">Quiz Test</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/join-as-guest-teacher" className={getLinkClass("/join-as-guest-teacher")}>
                Join as a Guest Teacher
              </Link>
            </li>
          </ul>
        </div>
        {/* logo  */}
        <div>
          <Link
            to="/"
            className="flex justify-center items-center hover:underline"
          >
            <img
              className="hidden md:block md:w-[40px] md:h-[30px] lg:w-[80px] lg:h-[70px] rounded-2xl ml-4"
              src={logo}
              alt="logo"
              width="70"
              height="70"
            />
            <h5
              className="ml-2 md:text-lg lg:text-3xl font-bold bg-transparent"
              style={{ textShadow: "0 8px 6px rgba(34, 87, 122, .7)" }}
            >
              EDULINK
            </h5>
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg font-bold">
          <li>
            <Link to="/" className={getLinkClass("/")}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/projects" className={getLinkClass("/projects")}>
              Projects
            </Link>
          </li>
          <li>
            <details>
              <summary>Attend Test</summary>
              <ul className="p-2">
                <li>
                  <Link to="/quiz-test">Quiz Test</Link>
                </li>
                <li>
                  <Link to="/class-test">Class Test</Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Link to="/join-as-guest-teacher" className={getLinkClass("/join-as-guest-teacher")}>
              Join as a Guest Teacher
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            onClick={() => setShowLinks(!showLinks)}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="lg:w-10 md:w-6 w-3 rounded-full">
              <img alt="avatar" src={user?.photoURL || avater} />
            </div>
          </div>
          {showLinks && (
            <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white right-0 top-12 text-sm">
              <div className="flex flex-col cursor-pointer">
                <Link to="/profile" className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
                  Profile
                </Link>
                <Link onClick={handleLogOut} className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
                  Logout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AfterLoginNav;

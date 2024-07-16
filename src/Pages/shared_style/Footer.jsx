import logo from "../../assets/LOGO/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className=" font-lora text-black">
      <footer className="footer bg-[#EFF8F2] text-base-content p-10 mt-10">
        <nav className="lg:justify-self-start">
          <h4 className="footer-title text-black md:text-xl">
            Show this world (EduLink).
          </h4>
          <div className="md:text-xl font-medium">
            <h6 className="">A learn Based Web .</h6>
            <h6 className="">Show Your own skills & shares others.</h6>
          </div>
        </nav>
        <nav className="lg:justify-self-center font-lora lg:text-lg">
          <h6 className="footer-title">Contact Info</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact us</a>
        </nav>
        <nav
          className="
       justify-self-center  lg:justify-self-end"
        >
          <div className="bg-[#0F4C81] text-white py-4 md:py-6 px-3 hover:bg-slate-500  cursor-pointer rounded-lg md:text-lg font-semibold">
            Contact & services
          </div>
        </nav>
      </footer>
      <footer className="footer bg-[#EFF8F2] text-base-content border-base-300 border-t px-10 py-4">
        {/* <div className="flex justify-between"> */}
        <nav className="md:place-self-center md:justify-self-start">
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
        <div className="flex justify-center items-center  w-full">
          <p className="font-semibold text-center md:text-base">
            This Projects Created by CST 21-22 session boys Team.
          </p>
        </div>
        <aside className="grid-flow-col items-center justify-self-end">
          <div>
            <Link
              to="/"
              className="flex justify-center items-center hover:underline"
            >
              <img
                className=" rounded-2xl ml-4"
                src={logo}
                alt="logo"
                width="70"
                height="80"
              />
              <h5 className="ml-2 text-lg md:text-xl font-bold  p-1 rounded-2xl">
                EDULINK
              </h5>
            </Link>
          </div>
        </aside>
        {/* </div> */}
      </footer>
    </div>
  );
};

export default Footer;

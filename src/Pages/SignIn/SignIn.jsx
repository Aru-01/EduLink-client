import { Helmet } from "react-helmet";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import Container from "../../Components/Container/Container";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import Swal from "sweetalert2";

const SignIn = () => {
  // const { loginUser } = useContext(AuthContext);
  // const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    console.log(email, password);
    // firebase login
    // loginUser(email, password)
    //   .then((res) => {
    //     console.log(res.user);
    //     Swal.fire({
    //       position: "center",
    //       icon: "success",
    //       title: "Sign In Successful",
    //       showConfirmButton: true,
    //       timer: 1200,
    //     });
    //     navigate(`${location.state ? location.state : "/"}`);
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
  };
  return (
    <div className="my-12">
      <Helmet>
        <title>EduLink | Login</title>
      </Helmet>

      <Container>
        <div className="flex justify-center items-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <Card
            color="transparent"
            shadow={false}
            className="w-full max-w-md space-y-8 p-10 border border-blue-gray-200 shadow-xl bg-[#F4FDFF] rounded-lg"
          >
            <div>
              <Typography
                variant="h4"
                className="text-center text-2xl font-black"
                color="blue-gray"
              >
                Login
              </Typography>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 space-y-6"
            >
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mb-4">
                  <Typography variant="h6" color="blue-gray">
                    Your Email
                  </Typography>
                  <Input
                    size="lg"
                    name="email"
                    {...register("email", { required: true })}
                    placeholder="name@mail.com"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  {errors.email?.type === "required" && (
                    <p className="text-red-600">Email is required</p>
                  )}
                </div>
                <div className="mb-4">
                  <Typography variant="h6" color="blue-gray">
                    Password
                  </Typography>
                  <Input
                    type="password"
                    name="password"
                    size="lg"
                    {...register("password", { required: true })}
                    placeholder="********"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  {errors.password?.type === "required" && (
                    <p className="text-red-600">Password is required</p>
                  )}
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  fullWidth
                  className="flex justify-center w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800"
                >
                  Login
                </Button>
              </div>

              <div className="mt-6 text-center">
                <Typography color="gray" className="font-normal">
                  New user?
                  <NavLink
                    to="/signup-student"
                    className="underline text-red-500 font-bold ml-1"
                  >
                    Register Here
                  </NavLink>
                </Typography>
              </div>
            </form>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default SignIn;

import { Helmet } from "react-helmet";
import Container from "../../Components/Container/Container";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Checkbox,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import the icons

const RegisterTeacher = () => {
  const navigate = useNavigate();  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data); // Replace with your form submission logic
  };

  return (
    <div className="my-20">
      <Helmet>
        <title>EduLink | Register</title>
      </Helmet>

      <Container>
        <div className="flex justify-center gap-8">
          <Card
            color="transparent"
            shadow={false}
            className="border p-10 shadow-xl border-blue-gray-200 bg-[#F4FDFF] w-full max-w-3xl"
          >
            <Typography
              variant="h4"
              className="text-center text-2xl font-black"
              color="blue-gray"
            >
              Register as a Teacher
            </Typography>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 mb-2 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <div className="col-span-full">
                <Typography variant="h6" color="blue-gray">
                  Your Name
                </Typography>
                <Input
                  size="lg"
                  name="name"
                  {...register("name", { required: true })}
                  placeholder="Enter Your Full Name"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                />
                {errors.name?.type === "required" && (
                  <p className="text-red-600">Name is required</p>
                )}
              </div>

              <div className="col-span-full sm:col-span-1 lg:col-span-1">
                <Typography variant="h6" color="blue-gray">
                  Teacher ID
                </Typography>
                <Input
                  size="lg"
                  type="number"
                  name="roll"
                  {...register("roll", { required: true })}
                  placeholder="Enter Teacher ID"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                />
                {errors.roll?.type === "required" && (
                  <p className="text-red-600">Teacher ID is required</p>
                )}
              </div>

              <div className="col-span-full sm:col-span-1 lg:col-span-1">
                <Typography variant="h6" color="blue-gray">
                  Choose Your Department
                </Typography>
                <select
                  name="department"
                  {...register("department", { required: true })}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full py-2 px-3 rounded-md"
                >
                  <option value="">Please Select Your Department</option>
                  <option value="CST">CST</option>
                  <option value="Civil">Civil</option>
                  <option value="Power">Power</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Architecture">Architecture</option>
                  <option value="Non-tech">Non-tech</option>
                </select>
                {errors.department?.type === "required" && (
                  <p className="text-red-600">Department is required</p>
                )}
              </div>

              <div className="col-span-full">
                <Typography variant="h6" color="blue-gray">
                  Your Phone Number
                </Typography>
                <Input
                  type="text"
                  name="phone"
                  size="lg"
                  {...register("phone", {
                    required: true,
                    pattern: {
                      value: /^01\d{9}$/,
                      message:
                        "Phone number must start with '01' and be 11 digits long",
                    },
                  })}
                  placeholder="Enter your phone number"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                />
                {errors.phone?.type === "required" && (
                  <p className="text-red-600">Phone number is required</p>
                )}
                {errors.phone?.type === "pattern" && (
                  <p className="text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div className="col-span-full">
                <Typography variant="h6" color="blue-gray">
                  Enter Your Email
                </Typography>
                <Input
                  type="email"
                  name="email"
                  size="lg"
                  {...register("email", { required: true })}
                  placeholder="Enter your email"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                />
                {errors.email?.type === "required" && (
                  <p className="text-red-600">Email is required</p>
                )}
              </div>

              <div className="col-span-full">
                <Typography variant="h6" color="blue-gray">
                  Upload Your Photo
                </Typography>
                <Input
                  type="file"
                  name="photo"
                  size="lg"
                  placeholder="Upload your photo"
                  {...register("photo")}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                />
              </div>

              <div className="col-span-full">
                <Checkbox
                  name="terms"
                  {...register("terms", { required: true })}
                  label={
                    <Typography variant="small" color="gray">
                      I agree to the{" "}
                      <a
                        href="#"
                        className="font-medium transition-colors hover:text-gray-900"
                      >
                        Terms and Conditions
                      </a>
                    </Typography>
                  }
                  containerProps={{ className: "mt-2" }}
                />
                {errors.terms?.type === "required" && (
                  <p className="text-red-600">You must agree to the terms</p>
                )}
              </div>

              <div className="col-span-full">
                <Button className="mt-6 bg-black" fullWidth type="submit">
                  Register
                </Button>
              </div>
            </form>

            <Typography color="gray" className="mt-4 text-center font-normal">
              Register as a Student{" "}
              <NavLink
                to="/signup-student"
                className="underline text-red-500 font-bold"
              >
                account
              </NavLink>
              .
            </Typography>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <NavLink
                to="/login-teacher"
                className="underline text-red-500 font-bold"
              >
                Sign In
              </NavLink>
            </Typography>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default RegisterTeacher;

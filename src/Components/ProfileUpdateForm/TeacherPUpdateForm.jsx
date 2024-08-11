import {
  Button,
  Card,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import Container from "../Container/Container";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxios/useAxiosPublic";
import { IoClose } from "react-icons/io5";

const TeacherPUpdateForm = ({ userData, closeModal }) => {
  const axiosPublic = useAxiosPublic();

  const [selectedDepartment, setSelectedDepartment] = useState(
    userData.department
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, phone, dob, bio } = data;

    const userInfo = {
      name,
      phone,
      dob,
      bio,
    };

    try {
      const response = await axiosPublic.patch(
        `/user?email=${userData.email}`,
        userInfo
      );

      // Adjust this to check for the new response message
      if (response.data.message.includes("User updated successfully")) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Update complete",
          showConfirmButton: false,
          timer: 1500,
        });

        closeModal(); // Close the modal after successful update
        await updateProfile(auth.currentUser, { displayName: name });
      }
    } catch (error) {
      console.error("Error updating user:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was a problem updating the user information.",
      });
    }
  };

  return (
    <div className="my-20 relative">
      <Container>
        <div className="flex justify-center gap-8">
          <Card
            color="transparent"
            shadow={false}
            className="border p-10 shadow-xl border-blue-gray-200 bg-[#F4FDFF] w-full max-w-3xl"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <IoClose size={24} />
            </button>

            <Typography
              variant="h4"
              className="text-center text-2xl font-black"
              color="blue-gray"
            >
              Edit Info
            </Typography>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 mb-2 w-full grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
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
                  defaultValue={userData.name}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.name?.type === "required" && (
                  <p className="text-red-600">Name is required</p>
                )}
              </div>
              {/* Bio Input */}
              <div className="col-span-full">
                <Typography variant="h6" color="blue-gray">
                  Bio
                </Typography>
                <Textarea
                  type="text"
                  name="bio"
                  size="lg"
                  defaultValue={userData.bio} // Set the default value to user's bio
                  {...register("bio", { required: true })}
                  placeholder="Enter a short bio"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.bio?.type === "required" && (
                  <p className="text-red-600">Bio is required</p>
                )}
              </div>
              <div className="col-span-full sm:col-span-1">
                <Typography variant="h6" color="blue-gray">
                  Your Phone Number
                </Typography>
                <Input
                  type="text"
                  name="phone"
                  size="lg"
                  defaultValue={userData.phone}
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
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.phone?.type === "required" && (
                  <p className="text-red-600">Phone number is required</p>
                )}
                {errors.phone?.type === "pattern" && (
                  <p className="text-red-600">{errors.phone.message}</p>
                )}
              </div>
              {/* Date of Birth Input */}
              <div className="col-span-full sm:col-span-1">
                <Typography variant="h6" color="blue-gray">
                  Date of Birth
                </Typography>
                <Input
                  type="date"
                  name="dob"
                  size="lg"
                  defaultValue={userData.dob} // Set the default value to user's DOB
                  {...register("dob", { required: true })}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.dob?.type === "required" && (
                  <p className="text-red-600">Date of birth is required</p>
                )}
              </div>
              <div className="col-span-full sm:col-span-2">
                <Typography variant="h6" color="blue-gray">
                  Enter Your Email
                </Typography>
                <Input
                  type="email"
                  name="email"
                  size="lg"
                  defaultValue={userData.email}
                  disabled
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <div className="col-span-full">
                <Button className="mt-6 bg-black" fullWidth type="submit">
                  Update
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default TeacherPUpdateForm;

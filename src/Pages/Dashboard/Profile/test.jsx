import { Button, Card, Input, Typography } from "@material-tailwind/react";
import Container from "../Container/Container";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5"; // Import close icon
import useAxiosPublic from "../../hooks/useAxios/useAxiosPublic";



const UpdateForm = ({ userData, closeModal }) => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, semester, phone, guardianPhone, dob, bio } = data;

    if (phone === guardianPhone) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Phone number and guardian phone number cannot be the same!",
      });
      return;
    }

    const userInfo = {
      name,
      semester,
      phone,
      guardianPhone,
      dob,
      bio,
    };

    try {
      // Update user info in your MongoDB
      const response = await axiosPublic.patch(`/user?email=${userData.email}`, userInfo);

      if (response.data.message === "User updated successfully") {
        // Update Firebase profile
        await updateProfile(auth.currentUser, { displayName: name });

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Update complete",
          showConfirmButton: false,
          timer: 1500,
        });

        closeModal(); // Close the modal after successful update
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
              {/* Existing Input Fields */}
              {/* ... other input fields ... */}

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

              {/* Bio Input */}
              <div className="col-span-full">
                <Typography variant="h6" color="blue-gray">
                  Bio
                </Typography>
                <Input
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

export default UpdateForm;

import { Button, Input, Typography } from "@material-tailwind/react";
import Container from "../../Components/Container/Container";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";

const JoinGuestTeacher = () => {
    const { user } = useContext(AuthContext);
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    const onSubmit = (data) => {
      console.log(data);
      // Implement the form submission logic here
    };
  
    return (
      <div>
        <Helmet>
          <title>EduTechGenius | Join as Guest Teacher</title>
        </Helmet>
        <div className="my-20">
          <Container>
            <>
              <h6 className="text-base text-red-600 font-medium text-center">
                Check everything properly and apply
              </h6>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 mb-2 mx-auto bg-gray-200 px-20 py-10 rounded-lg border-black border shadow-2xl shadow-[#40494b] max-w-screen-md"
              >
                <div className="mb-1 flex flex-col gap-6">
                  <div className="lg:flex gap-4">
                    {/* Name Field */}
                    <div className="flex-1">
                      <Typography variant="h6" color="blue-gray">
                        Your Name
                      </Typography>
                      <Input
                        size="lg"
                        {...register("name")}
                        defaultValue={user?.displayName}
                        readOnly
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>
                    {/* Email Field */}
                    <div className="flex-1">
                      <Typography variant="h6" color="blue-gray">
                        Your Email
                      </Typography>
                      <Input
                        size="lg"
                        {...register("email")}
                        defaultValue={user?.email}
                        readOnly
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>
                  </div>
                  {/* Photo URL */}
                  <Typography variant="h6" color="blue-gray">
                    Photo
                  </Typography>
                  <Input
                    type="url"
                    size="lg"
                    {...register("photoURL", {
                      required: true,
                      pattern: /https?:\/\/.*\.(?:png|jpg|jpeg)/i,
                    })}
                    defaultValue={user?.photoURL}
                    readOnly
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  {errors.photoURL && (
                    <p className="text-red-600">Please provide a valid photo URL.</p>
                  )}
                </div>
                {/* Experience Dropdown */}
                <Typography variant="h6" color="blue-gray" className="mt-3 mb-3">
                  Select Experience
                </Typography>
                <select
                  {...register("experience", { required: true })}
                  className="border px-3 py-2 rounded-lg text-blue-gray-500 border-[#B0BEC5] w-full"
                >
                  <option value="">Select Experience</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Experienced">Experienced</option>
                  <option value="Some Idea">Some Idea</option>
                </select>
                {errors.experience && (
                  <p className="text-red-600">Please select a valid experience level.</p>
                )}
                {/* Category Dropdown */}
                <Typography variant="h6" color="blue-gray" className="mt-3 mb-3">
                  Select Category
                </Typography>
                <select
                  {...register("category", { required: true })}
                  className="border px-3 py-2 rounded-lg text-blue-gray-500 border-[#B0BEC5] w-full"
                >
                  <option value="">Select a Category</option>
                  <option value="Advanced Web Development">
                    Advanced Web Development
                  </option>
                  <option value="Illustration Techniques">
                    Illustration Techniques
                  </option>
                  <option value="Digital Art and Design">
                    Digital Art and Design
                  </option>
                  <option value="Data Science Fundamentals">
                    Data Science Fundamentals
                  </option>
                  <option value="Digital Marketing Mastery">
                    Digital Marketing Mastery
                  </option>
                  <option value="Graphic Design Essentials">
                    Graphic Design Essentials
                  </option>
                  <option value="Web Development Fundamentals">
                    Web Development Fundamentals
                  </option>
                </select>
                {errors.category && (
                  <p className="text-red-600">Please select a valid category.</p>
                )}
                <Button className="mt-6" type="submit" fullWidth>
                  Submit for Review
                </Button>
              </form>
            </>
          </Container>
        </div>
      </div>
    );
  };
  
  export default JoinGuestTeacher;
  
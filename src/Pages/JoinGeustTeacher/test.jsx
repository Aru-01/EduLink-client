import Container from "../../Components/Container/Container";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useState } from "react";

const TeachOnEduTech = () => {
  // console.log(status);

  const { data: teacherRequest = [] } = useQuery({
    queryKey: ["teacherRequest", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/teacherRequest?email=${user.email}`);
      return res.data;
    },
  });
  // console.log(teacherRequest);

  useEffect(() => {
    teacherRequest.map((request) => {
      setStatus(request.status);
      // console.log(request.status);
    });
  }, [teacherRequest]);

  return (
    <>
      <Card color="transparent" shadow={false}>
        <h4 className="text-center text-2xl font-bold text-[#000]">
          Tech on EduTech Genius
        </h4>
        {status === "pending" ? (
          <div className="">
            <h2 className="text-center font-lora mt-4 text-green-600">
              Please wait, your request has been sent to admin. Will update very
              soon.
            </h2>
          </div>
        ) : status === "Accepted" ? (
          <>
            {" "}
            <h2 className="text-center font-lora text-xl font-bold mt-4 text-green-600 lg:w-[750px] mx-auto">
              Your request has been successful, and you have been assigned as a
              teacher on our team. <br /> thank you 🖤
            </h2>
          </>
        ) : (
          
        )}
      </Card>
    </>
  );
};

export default TeachOnEduTech;

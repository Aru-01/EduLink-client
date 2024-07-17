import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import Container from "../../../Components/Container/Container";
import img from "../../../assets/Teacher-benifits/teacher-benifits.jpg";
const Teacher_Benifits = () => {
  return (
    <div>
      <Container className="py-12">
        <Typography
          variant="h3"
          color="blue-gray"
          className="text-center mt-20 text-2xl md:text-3xl lg:text-5xl font-extrabold font-inria-serif"
        >
          Teacher Benefits
        </Typography>
        <div className="flex justify-center my-4">
          <div className="w-20 h-1 bg-[#BF1A2F] rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 items-center">
          <div className="order-1 lg:order-1">
            <Card className="shadow-lg p-6 font-inria-sans">
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4">
                  Enhanced Teaching Tools
                </Typography>
                <Typography color="gray" className="mb-4">
                  Access a variety of digital tools to create engaging and
                  interactive quizzes, assignments, and assessments, making the
                  learning process more dynamic and effective.
                </Typography>
                <Typography variant="h5" color="blue-gray" className="mb-4">
                  Efficient Student Assessment
                </Typography>
                <Typography color="gray" className="mb-4">
                  Utilize automated grading and AI-driven analytics to quickly
                  assess student performance, identify areas for improvement,
                  and provide personalized feedback.
                </Typography>
                <Typography variant="h5" color="blue-gray" className="mb-4">
                  Improved Communication
                </Typography>
                <Typography color="gray" className="mb-4">
                  Enhance communication with students through integrated
                  messaging and discussion boards, providing a seamless way to
                  address questions and provide support.
                </Typography>
                <Button color="blue-gray" className="mt-4 bg-black">
                  Learn More
                </Button>
              </CardBody>
            </Card>
          </div>
          <div className="order-2 lg:order-2">
            <img
              src={img}
              alt="Teacher Benefits"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Teacher_Benifits;

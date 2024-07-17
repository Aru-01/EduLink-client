import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import Container from "../../../Components/Container/Container";
import img from "../../../assets/why-student-use/why_student.jpg";
const Why_student = () => {
  return (
    <div>
      <Container className="py-12 ">
        <Typography
          variant="h3"
          color="blue-gray"
          className="text-center mt-20 text-2xl md:text-3xl lg:text-5xl font-extrabold font-inria-serif"
        >
          Why Students Use This
        </Typography>
        <div className="flex justify-center my-4 mb-12">
          <div className="w-20 h-1 bg-[#BF1A2F] rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center font-inria-sans">
          <div className="order-2 lg:order-1">
            <img
              src={img}
              alt="Student choice"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="order-1 lg:order-2">
            <Card className="shadow-lg p-6">
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4">
                  Enhance Your Skills
                </Typography>
                <Typography color="gray" className="mb-4">
                  Discover a variety of skill-building opportunities through our
                  platform. Whether you're interested in coding, graphic design,
                  or public speaking, you'll find resources and courses to help
                  you grow and excel.
                </Typography>
                <Typography variant="h5" color="blue-gray" className="mb-4">
                  Showcase Your Projects
                </Typography>
                <Typography color="gray" className="mb-4">
                  Share your projects with the community and get valuable
                  feedback. Gain recognition for your hard work and inspire
                  others by displaying your achievements.
                </Typography>
                <Typography variant="h5" color="blue-gray" className="mb-4">
                  Collaborate with Peers
                </Typography>
                <Typography color="gray" className="mb-4">
                  Connect with fellow students who share your interests.
                  Collaborate on projects, form study groups, and learn from
                  each other in a supportive environment.
                </Typography>
                <Button color="blue-gray" className="mt-4 bg-black">
                  Learn More
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Why_student;

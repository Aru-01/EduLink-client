import { Helmet } from "react-helmet";
import Projects from "../../../Components/Projects/Projects";
import Banner from "../Banner/Banner";
import Teacher_Benifits from "../Teacher_Benifits/Teacher_Benifits";
import Why_student from "../why_student/Why_student";
const Home = () => {
  return (
    <div className="relative">
      <Helmet>
        <title>EduLink | </title>
      </Helmet>

      <Banner />
      <Projects />
      <Why_student />
      <Teacher_Benifits />
    </div>
  );
};

export default Home;

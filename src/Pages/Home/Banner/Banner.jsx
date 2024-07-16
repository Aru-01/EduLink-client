// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

import banner1 from "../../../assets/banner/Banner1.jpg";
import banner2 from "../../../assets/banner/Banner2.jpg";
import banner3 from "../../../assets/banner/Banner3.jpg";
import { Link } from "react-router-dom";
import Container from "../../../Components/Container/Container";

const Banner = () => {
  const bannerBtn = (
    <>
      <Link to="/explore">
        <button className="bg-[#0F4C81] text-white py-4 md:py-6 px-4 md:mt-6 md:px-6  hover:bg-slate-500  cursor-pointer rounded-lg md:rounded-xl md:text-lg text-sm font-bold">
          Explore More
        </button>
      </Link>
    </>
  );
  return (
    <Container className="">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper "
      >
        {/* slider-1  */}
        <SwiperSlide>
          <div className=" h-[250px] lg:h-[650px] flex justify-center">
            <img
              className="w-full lg:object-cover rounded-lg"
              src={banner1}
              alt=""
            />
            <div className="absolute flex items-center h-full left-0 top-0 rounded-xl bg-gradient-to-r from-[#151515] to-rgba(21, 21, 21, 0.00)  ">
              <div className="text-white md:w-1/2 py-4 pl-8 md:space-y-7 md:pl-20">
                <h2 className="text-xl md:text-4xl lg:text-6xl font-bold">
                  Transforming Education Together
                </h2>
                <p className="text-xs lg:text-lg font-normal my-2">
                  Discover how our platform revolutionizes learning through
                  interactive quizzes and student-driven projects
                </p>
                {bannerBtn}
              </div>
            </div>
          </div>
        </SwiperSlide>
        {/* slider 2 */}
        <SwiperSlide>
          <div className="h-[250px] lg:h-[650px] flex justify-center">
            <img className="w-full rounded-lg" src={banner2} alt="" />
            <div className="absolute flex items-center h-full left-0 top-0 rounded-xl bg-gradient-to-r from-[#151515] to-rgba(21, 21, 21, 0.00)  ">
              <div className="text-white md:w-1/2 py-4 pl-8 md:space-y-7 md:pl-20">
                <h2 className="text-xl md:text-4xl lg:text-6xl font-bold">
                  Empowering Students Through Innovation
                </h2>
                <p className="text-xs lg:text-lg font-normal my-2">
                  Explore a new era of education with advanced tools and
                  personalized learning experiences
                </p>
                {bannerBtn}
              </div>
            </div>
          </div>
        </SwiperSlide>
        {/* slider 3 */}
        <SwiperSlide>
          <div className="h-[250px] lg:h-[650px] flex justify-center">
            <img className="w-full  rounded-lg" src={banner3} alt="" />
            <div className="absolute flex items-center h-full left-0 top-0 rounded-xl bg-gradient-to-r from-[#151515] to-rgba(21, 21, 21, 0.00)  ">
              <div className="text-white md:w-1/2 py-4 pl-8 md:space-y-7 md:pl-20">
                <h2 className="text-xl md:text-4xl lg:text-6xl font-bold">
                  Building a Brighter Future with Education
                </h2>
                <p className="text-xs lg:text-lg font-normal my-2">
                  Join us in shaping the future of education with cutting-edge
                  technologies and global collaboration
                </p>
                {bannerBtn}
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </Container>
  );
};

export default Banner;

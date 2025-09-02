import { Swiper, SwiperSlide } from "swiper/react";
import { Queries } from "../../Api";
import { useNavigate } from "react-router-dom";
import { RouteList } from "../../Constant";

export const AboutCourseSliderSetting = {
  spaceBetween: 24,
  slidesPerView: 1,
  loop: true,
  breakpoints: {
    640: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 24 },
  },
};

const Course = () => {
  const navigate = useNavigate();

  const { data: Course, isLoading } = Queries.useGetCourse({ featureFilter: true, actionFilter: true, lockFilter: true });
  const CourseData = Course?.data;

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        CourseData?.course_data?.length > 0 && (
          <section className="row_am pricing_section white_text">
            <div className="pricing_inner">
              {/* container start */}
              <div className="container">
                <div className="section_title">
                  <h2>Your Courses</h2>
                </div>

                {/* Pricing Plans */}
                <div className="pricing_pannel">
                  <Swiper {...AboutCourseSliderSetting} className="courses-swiper">
                    {CourseData?.course_data?.map((item, index) => (
                      <SwiperSlide key={index}>
                        <div className={`pointer pannel_block ${index % 2 ? "highlited_block" : ""}`} onClick={() => navigate(`${RouteList.Lecture}/${item._id}`)}>
                          <div className="image d-block img-style">
                            <img src={item.image ?? ""} alt={item.name} className="lazyload" />
                          </div>
                          <div className="heading">
                            <h3>{item.name}</h3>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="text-center view-all">
                  <button className="tf-btn btn-white" onClick={() => navigate(RouteList.Course)}>
                    View all
                  </button>
                </div>
              </div>
            </div>
          </section>
        )
      )}
    </>
  );
};

export default Course;

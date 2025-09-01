import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Queries } from "../../Api";
import { Link } from "react-router-dom";
import { RouteList } from "../../Constant";

const Blog = () => {
  const { data: Blog, isLoading } = Queries.useGetBlog({});
  const BlogData = Blog?.data?.blog_data || [];

  return (
    <main className="page-content">
      {isLoading ? (
        <></>
      ) : BlogData.length > 0 ? (
        <div className="">
          <div className="flat-title wow fadeInUp">
            <div className="title display-lg-3 fw-normal">Blog</div>
            <p className="desc text-main text-md">Our latest blog post</p>
          </div>
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
          >
            {BlogData.map((item, index) => (
              <SwiperSlide key={index}>
                <Link to={`${RouteList.BlogDescription}/${item._id}`}>
                  <div
                    className="cards"
                    style={{
                      backgroundImage: `url(${item.thumbnail})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="content">
                      <h2 className="title">{item.title}</h2>
                      <p className="copy">{item.subtitle}</p>
                      <button className="btn">Read More</button>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : null}
    </main>
  );
};

export default Blog;

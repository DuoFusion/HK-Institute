import { Swiper, SwiperSlide } from "swiper/react";
import { Queries } from "../../Api";

const LatestNews = () => {
  const { data: LatestNews, isLoading } = Queries.useGetLatestNews({});
  const LatestNewsData = LatestNews?.data;

  return (
    <main className="page-content">
      {isLoading ? (
        <></>
      ) : LatestNewsData?.latestNews_data.length > 0 ? (
        <div className="">
          <div className="flat-title wow fadeInUp">
            <div className="title display-lg-3 fw-normal">Latest News</div>
            <p className="desc text-main text-md">Our latest Latest News post</p>
          </div>
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
          >
            {LatestNewsData?.latestNews_data.map((item, index) => (
              <SwiperSlide key={index}>
                <div >
                  <div
                    className="card"
                    style={{
                      backgroundImage: `url(${item.thumbnail})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div className="latest-news-text text-center">
                    <h2 className="title">{item.title}</h2>
                    <p className="copy">{item.subtitle}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : null}
    </main>
  );
};

export default LatestNews;

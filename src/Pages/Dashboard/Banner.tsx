import { EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Queries } from "../../Api";
import { Link } from "react-router-dom";
import { Href } from "../../Constant";

const Banner = () => {
  const { data: bannerRes, isLoading } = Queries.useGetBanner({ actionFilter: true });
  const bannerData = bannerRes?.data;
  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        bannerData?.banner_data?.length > 0 && (
          <div className="banner-container">
            <Swiper modules={[Pagination, EffectFade]} loop effect={"fade"} rewind={true} speed={800} pagination={{ clickable: true }} className="banner-swiper">
              {bannerData?.banner_data?.map((item, index) => (
                <SwiperSlide key={index}>
                  <Link to={item?.youtubeLink || Href} target="_blank">
                    <div className="slider-wrap">
                      <div className="image">
                        <img src={item.image} alt={item.title || "banner"} className="lazyload" />
                      </div>
                      <div className="box-content">
                        <div className="content-slider">
                          <div className="box-title-slider">
                            {/* <div className="sub">{item.subTitle || "WELCOME TO VINETA"}</div> */}
                            {item.title && <div className="heading">{item.title}</div>}
                          </div>
                          {/* {item.buttonText && (
                    <div className="box-btn-slider">
                      <a href={item.buttonLink || "/shop-default"} className="tf-btn">
                        {item.buttonText}
                      </a>
                    </div>
                  )} */}
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )
      )}
    </>
  );
};

export default Banner;

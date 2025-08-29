import { Link } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Queries } from "../../Api";
import { RouteList } from "../../Constant";

const Category = () => {
  const { data: Category, isLoading } = Queries.useGetCategory({ featureFilter: true, actionFilter: true });
  const CategoryData = Category?.data;

  return (
    <div className="flat-spacing">
      {isLoading ? (
        <></>
      ) : (
        CategoryData?.category_data?.length > 0 && (
          <section className="pt-0">
            {/* Section Title */}
            <div className="flat-title wow fadeInUp">
              <div className="title display-lg-3 fw-normal">Category</div>
              <p className="desc text-main text-md">Discover expert advice, style inspiration, and product updates on our blog.</p>
            </div>

            {/* Category Swiper */}
            <div className="container">
              <Swiper
                modules={[Pagination]}
                spaceBetween={24}
                slidesPerView={1}
                loop
                pagination={{ clickable: true }}
                breakpoints={{
                  640: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 3, spaceBetween: 24 },
                }}
                className="category-swiper"
              >
                {CategoryData?.category_data?.map((cat, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="wg-offer hover-img">
                      <Link to={RouteList.Category}>
                        {/* Image */}
                        <div className="image d-block img-style">
                          <img src={cat.image} alt={cat.name} className="lazyload" />
                        </div>

                        {/* Overlay Button */}
                      </Link>

                      {/* Title */}
                      <div className="content text-center">
                        <div className="box-title gap-4">
                          <Link to={RouteList.Category} className="link text-xl fw-medium">
                            {cat.name}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="text-center">
              <button className="tf-btn btn-white">View all</button>
            </div>
          </section>
        )
      )}
    </div>
  );
};

export default Category;

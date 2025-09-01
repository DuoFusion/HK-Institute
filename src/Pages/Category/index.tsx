import { Image, Pagination } from "antd";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import { Queries } from "../../Api";
import { Href } from "../../Constant";
import { useBasicTableFilterHelper } from "../../Utils/hook";
import Breadcrumbs from "../../CoreComponents/Breadcrumbs";

const Category = () => {
  const { pageNumber, pageSize, params, handlePaginationChange } = useBasicTableFilterHelper({
    initialParams: { page: 1, limit: 8 },
    debounceDelay: 500,
  });

  const { data: Category, isLoading } = Queries.useGetCategory({ ...params, featureFilter: true, actionFilter: true });
  const CategoryData = Category?.data;
  return (
    <>
      <Breadcrumbs mainTitle="Category" parent="Course" />
      <main className="page-content">
        {isLoading ? (
          <></>
        ) : CategoryData?.category_data?.length > 0 ? (
          <div className="">
            <Row>
              {CategoryData?.category_data.map((item, index) => (
                <Col md="6" lg="4" xl="3" key={index}>
                  <Card className="shadow border-0">
                    <CardBody>
                      <Link to={Href}>
                        {/* <div
                    className="card"
                    style={{
                      backgroundImage: `url(${item.thumbnail})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div> */}
                        <Image className="img-fluid w-100 rounded" preview={false} src={item?.image} alt="Category-main" />
                        <div className="latest-news-text mt-3 p-0">
                          {/* <h2 className="text-center">{item.name}</h2> */}
                          <p className="copy text-center">{item.name}</p>
                          {/* <div className="line-clamp" dangerouslySetInnerHTML={{ __html: item?.description || "" }} /> */}
                        </div>
                      </Link>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
            <Pagination total={CategoryData?.totalData} pageSize={pageSize} current={pageNumber} align="center" showSizeChanger={true} onChange={handlePaginationChange} />
          </div>
        ) : null}
      </main>
    </>
  );
};

export default Category;

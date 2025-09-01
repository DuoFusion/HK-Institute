import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import { Queries } from "../../Api";
import { RouteList } from "../../Constant";
import { Image, Pagination } from "antd";
import { useBasicTableFilterHelper } from "../../Utils/hook";
import Breadcrumbs from "../../CoreComponents/Breadcrumbs";

const LatestNews = () => {
  const { pageNumber, pageSize, params, handlePaginationChange } = useBasicTableFilterHelper({
    initialParams: { page: 1, limit: 6 },
    debounceDelay: 500,
  });

  const { data: LatestNews, isLoading } = Queries.useGetLatestNews(params);
  const LatestNewsData = LatestNews?.data;
  return (
    <>
      <Breadcrumbs mainTitle="Latest News" parent="Pages" />
      <main className="page-content">
        {isLoading ? (
          <></>
        ) : LatestNewsData?.latestNews_data?.length > 0 ? (
          <div className="">
            <Row>
              {LatestNewsData?.latestNews_data?.map((item, index) => (
                <Col lg="6" xl="4" key={index}>
                  <Card className="shadow border-0">
                    <CardBody>
                      <Link to={`${RouteList.LatestNewsDescription}/${item._id}`}>
                        {/* <div
                        className="card"
                        style={{
                          backgroundImage: `url(${item.thumbnail})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          height: "200px",
                        }}
                      ></div> */}
                        <Image className="img-fluid w-100 rounded" preview={false} src={item?.thumbnail} alt="blog-main" />
                        <div className="latest-news-text mt-3">
                          <h2 className="title text-center">{item.title}</h2>
                          <p className="copy text-center">{item.subtitle}</p>
                          <div className="line-clamp" dangerouslySetInnerHTML={{ __html: item?.description || "" }} />
                        </div>
                      </Link>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
            <Pagination total={LatestNewsData?.totalData} pageSize={pageSize} current={pageNumber} align="center" showSizeChanger={true} onChange={handlePaginationChange} />
          </div>
        ) : null}
      </main>
    </>
  );
};

export default LatestNews;

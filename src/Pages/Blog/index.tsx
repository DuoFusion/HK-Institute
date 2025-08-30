import React from "react";
import { Queries } from "../../Api";
import { Col, Row } from "reactstrap";

const Blog = () => {
  const { data: Blog, isLoading } = Queries.useGetBlog({});
  const BlogData = Blog?.data?.blog_data || [];
  return (
    <main className="page-content">
      {isLoading ? (
        <></>
      ) : BlogData?.length > 0 ? (
        <div className="">
          <Row>
            {BlogData?.map((item, index) => (
              <Col md="4" key={index}>
                <div>
                  <div
                    className="card"
                    style={{
                      backgroundImage: `url(${item.thumbnail})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div className="latest-news-text =">
                    <h2 className="title text-center">{item.title}</h2>
                    <p className="copy text-center">{item.subtitle}</p>
                    <div dangerouslySetInnerHTML={{ __html: item?.description || "" }}/>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      ) : null}
    </main>
  );
};

export default Blog;

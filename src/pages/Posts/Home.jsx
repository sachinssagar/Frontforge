import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import { Container, Card, Button, Row, Col } from "react-bootstrap"; // Import Row and Col from react-bootstrap
import { VITE_API } from "../../App.jsx";

export const HomePost = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${VITE_API}/posts`)
      .then((res) => {
        setPosts(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        alert("Something went wrong");
        console.log(err);
      });
  }, []);

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return `${description.slice(0, maxLength)}...`;
    }
    return description;
  };

  return (
    <div style={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
      <Container className="my-4">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="text-3xl text-primary">Posts List</h1>
          <Link to="/posts/create">
            <Button className="btn btn-light">
              <MdOutlineAddBox className="text-primary" /> Add Post
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <Spinner />
        ) : (
          <Row className="g-4 mt-4">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <Col key={post._id} xs={12}>
                  <Card
                    className="border-0"
                    style={{ backgroundColor: "white" }}
                  >
                    <Card.Body>
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <div>
                            <h5>{post.title}</h5>
                            <p className="text-muted mb-2">
                              {new Intl.DateTimeFormat("en-US", {
                                month: "short",
                                day: "numeric",
                              }).format(new Date(post.createdAt))}
                            </p>
                            <p>{truncateDescription(post.description, 150)}</p>
                            <Link
                              to={`/posts/${post._id}`}
                              className="btn btn-primary"
                            >
                              READ MORE
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <div>
                <p>No Posts Found</p>
              </div>
            )}
          </Row>
        )}
      </Container>
    </div>
  );
};

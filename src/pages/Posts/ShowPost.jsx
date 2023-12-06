import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import { VITE_API } from "../../App.jsx";

export const ShowPost = () => {
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${VITE_API}/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        alert("Something went wrong");
        console.log(err);
      });
  }, []);

  return (
    <Container className="my-4">
      <BackButton />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="mt-4 ">
            <Row className="text-center">
              <Col>
                <h5>{new Date(post.createdAt).toLocaleDateString()}</h5>
                <h1>{post.title}</h1>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <p>{post.description}</p>
              </Col>
            </Row>
          </div>
          <div className="mt-4">
            <Row>
              <Col>
                <Link to={`/posts/edit/${id}`}>
                  <Button variant="outline-primary" className="me-2">
                    Edit
                  </Button>
                </Link>
                <Link to={`/posts/delete/${id}`}>
                  <Button variant="outline-danger">Delete</Button>
                </Link>
              </Col>
            </Row>
          </div>
        </>
      )}
    </Container>
  );
};

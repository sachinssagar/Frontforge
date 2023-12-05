import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import { VITE_API } from "../../App.jsx";
import { Container, Form, Button } from "react-bootstrap";

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
      <h1 className="text-center display-4 text-primary mb-4">Post Details</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <Form className="border border-primary rounded p-4">
          <Form.Group controlId="formId" className="mb-4">
            <Form.Label className="text-xl text-primary">
              <strong>Id:</strong>
            </Form.Label>
            <Form.Control
              type="text"
              value={post._id}
              readOnly
              className="border border-primary p-2"
            />
          </Form.Group>
          <Form.Group controlId="formTitle" className="mb-4">
            <Form.Label className="text-xl text-primary">
              <strong>Title:</strong>
            </Form.Label>
            <Form.Control
              type="text"
              value={post.title}
              readOnly
              className="border border-primary p-2"
            />
          </Form.Group>
          <Form.Group controlId="formDescription" className="mb-4">
            <Form.Label className="text-xl text-primary">
              <strong>Description:</strong>
            </Form.Label>
            <Form.Control
              type="text"
              value={post.description}
              readOnly
              className="border border-primary p-2"
            />
          </Form.Group>
          <Form.Group controlId="formCreateTime" className="mb-4">
            <Form.Label className="text-xl text-primary">
              <strong>Create Time:</strong>
            </Form.Label>
            <Form.Control
              type="text"
              value={new Date(post.createdAt).toLocaleString()}
              readOnly
              className="border border-primary p-2"
            />
          </Form.Group>
          <Form.Group controlId="formUpdateTime" className="mb-4">
            <Form.Label className="text-xl text-primary">
              <strong>Last Update Time:</strong>
            </Form.Label>
            <Form.Control
              type="text"
              value={new Date(post.updatedAt).toLocaleString()}
              readOnly
              className="border border-primary p-2"
            />
          </Form.Group>
          <Link to={`/posts/edit/${post._id}`}>
            <Button variant="primary" className="w-100">
              Edit Post
            </Button>
          </Link>
        </Form>
      )}
    </Container>
  );
};

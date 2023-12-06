import { useState, useEffect } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { VITE_API } from "../../App.jsx";
import { Button, Container, Form, Row, Col } from "react-bootstrap";

export const EditPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${VITE_API}/posts/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        alert("Something went wrong");
        console.log(err);
      });
  }, [id]);

  const handleEdit = () => {
    const data = {
      title,
      description,
    };
    setIsLoading(true);

    axios
      .put(`${VITE_API}/posts/${id}`, data)
      .then(() => {
        setIsLoading(false);
        navigate("/posts");
      })
      .catch((err) => {
        setIsLoading(false);
        alert("Something went wrong");
        console.log(err);
      });
  };

  return (
    <Container className="my-4">
      <BackButton />
      <h1 className="text-center display-4 text-success mb-4">Edit Post</h1>
      {isLoading ? <Spinner /> : ""}
      <Row>
        <Col md={12} className="mx-auto">
          <Form className="border border-success rounded p-4">
            <Form.Group controlId="formTitle" className="mb-4">
              <Form.Label className="text-xl text-gray-500">Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-500 px-4 py-2"
              />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mb-4">
              <Form.Label className="text-xl text-gray-500">
                Description
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-500 px-4 py-2"
              />
            </Form.Group>
            <Button
              variant="success"
              className="p-2 m-8 w-100"
              onClick={handleEdit}
            >
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

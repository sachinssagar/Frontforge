import { useState } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { VITE_API } from "../../App.jsx";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post(`${VITE_API}/books`, data)
      .then(() => {
        setLoading(false);
        navigate("/books");
      })
      .catch((err) => {
        setLoading(false);
        alert("Something went wrong");
        console.log(err);
      });
  };

  return (
    <Container className="my-4">
      <BackButton />
      <h1 className="text-center display-4 text-primary mb-4">Create Book</h1>
      {loading ? <Spinner /> : ""}
      <Form className="border border-primary rounded p-4">
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="formTitle">
              <Form.Label className="text-xl text-gray-500">Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-500 px-4 py-2"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formAuthor">
              <Form.Label className="text-xl text-gray-500">Author</Form.Label>
              <Form.Control
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="border border-gray-500 px-4 py-2"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="formPublishYear">
              <Form.Label className="text-xl text-gray-500">
                Publish Year
              </Form.Label>
              <Form.Control
                type="number"
                value={publishYear}
                onChange={(e) => setPublishYear(e.target.value)}
                className="border border-gray-500 px-4 py-2"
              />
            </Form.Group>
          </Col>
        </Row>
        <Button
          variant="primary"
          className="p-2 m-8 w-100"
          onClick={handleSaveBook}
        >
          Save
        </Button>
      </Form>
    </Container>
  );
};

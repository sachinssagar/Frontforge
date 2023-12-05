import { useState, useEffect } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { VITE_API } from "../../App.jsx";
import { Button, Container, Form } from "react-bootstrap";

export const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${VITE_API}/books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert("Something went wrong");
        console.log(err);
      });
  }, []);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`${VITE_API}/books/${id}`, data)
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
      <h1 className="text-center display-4 text-success mb-4">Edit Book</h1>
      {loading ? <Spinner /> : ""}
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
        <Form.Group controlId="formAuthor" className="mb-4">
          <Form.Label className="text-xl text-gray-500">Author</Form.Label>
          <Form.Control
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border border-gray-500 px-4 py-2"
          />
        </Form.Group>
        <Form.Group controlId="formPublishYear" className="mb-4">
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
        <Button
          variant="success"
          className="p-2 m-8 w-100"
          onClick={handleEditBook}
        >
          Save
        </Button>
      </Form>
    </Container>
  );
};

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import { VITE_API } from "../../App.jsx";
import { Container, Form, Button } from "react-bootstrap";

export const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${VITE_API}/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="my-4">
      <BackButton />
      <h1 className="text-center display-4 text-primary mb-4">Book Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <Form className="border border-primary rounded p-3">
          <Form.Group controlId="formId" className="mb-3">
            <Form.Label className="text-xl text-primary">
              <strong>Id:</strong>
            </Form.Label>
            <Form.Control
              type="text"
              value={book._id}
              readOnly
              className="border border-primary p-2"
            />
          </Form.Group>
          <Form.Group controlId="formTitle" className="mb-3">
            <Form.Label className="text-xl text-primary">
              <strong>Title:</strong>
            </Form.Label>
            <Form.Control
              type="text"
              value={book.title}
              readOnly
              className="border border-primary p-2"
            />
          </Form.Group>
          <Form.Group controlId="formAuthor" className="mb-3">
            <Form.Label className="text-xl text-primary">
              <strong>Author:</strong>
            </Form.Label>
            <Form.Control
              type="text"
              value={book.author}
              readOnly
              className="border border-primary p-2"
            />
          </Form.Group>
          <Form.Group controlId="formPublishYear" className="mb-3">
            <Form.Label className="text-xl text-primary">
              <strong>Publish Year:</strong>
            </Form.Label>
            <Form.Control
              type="text"
              value={book.publishYear}
              readOnly
              className="border border-primary p-2"
            />
          </Form.Group>
          <Form.Group controlId="formCreateTime" className="mb-3">
            <Form.Label className="text-xl text-primary">
              <strong>Create Time:</strong>
            </Form.Label>
            <Form.Control
              type="text"
              value={new Date(book.createdAt).toLocaleString()}
              readOnly
              className="border border-primary p-2"
            />
          </Form.Group>
          <Form.Group controlId="formUpdateTime" className="mb-3">
            <Form.Label className="text-xl text-primary">
              <strong>Last Update Time:</strong>
            </Form.Label>
            <Form.Control
              type="text"
              value={new Date(book.updatedAt).toLocaleString()}
              readOnly
              className="border border-primary p-2"
            />
          </Form.Group>
          <Link to={`/books/edit/${book._id}`}>
            <Button variant="primary" className="w-100">
              Edit Book
            </Button>
          </Link>
        </Form>
      )}
    </Container>
  );
};

import { useState } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { VITE_API } from "../../App.jsx";
import { Button, Container, Row, Col } from "react-bootstrap";

export const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`${VITE_API}/books/${id}`)
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
      <h1 className="text-center display-4 text-danger mb-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="border border-danger rounded p-4 text-center">
        <h3 className="text-2xl mb-4">
          Are You Sure You want to delete this book?
        </h3>
        <Button
          variant="danger"
          className="p-4 text-white m-8 w-100"
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </Button>
      </div>
    </Container>
  );
};

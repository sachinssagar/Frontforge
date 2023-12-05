import { useState } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { VITE_API } from "../../App.jsx";
import { Button, Container } from "react-bootstrap";

export const DeletePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = () => {
    setIsLoading(true);
    axios
      .delete(`${VITE_API}/posts/${id}`)
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
      <h1 className="text-center display-4 text-danger mb-4">Delete Post</h1>
      {isLoading ? <Spinner /> : ""}
      <div className="border border-danger rounded p-4 text-center">
        <h3 className="text-2xl mb-4">
          Are you sure you want to delete this post?
        </h3>
        <Button
          variant="danger"
          className="p-4 text-white m-8 w-100"
          onClick={handleDelete}
        >
          Yes, Delete it
        </Button>
      </div>
    </Container>
  );
};

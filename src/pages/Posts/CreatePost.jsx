import { useState } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { VITE_API } from "../../App.jsx";
import { Form, Button } from "react-bootstrap";

export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title,
      description,
    };
    setIsLoading(true);
    axios
      .post(`${VITE_API}/posts`, data)
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
    <div className="d-flex flex-column align-items-center my-5">
      <BackButton />
      <h1 className="display-4 font-weight-bold text-primary mb-4">
        Create Post
      </h1>
      {isLoading && <Spinner />}
      {!isLoading && (
        <Form onSubmit={handleSubmit} className="w-75">
          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-primary rounded-md p-3 w-100"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-primary rounded-md p-3 w-100"
            />
          </Form.Group>
          <Button
            type="submit"
            className="btn btn-primary rounded-md py-2 px-4 my-4 w-100"
          >
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
};

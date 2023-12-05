import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { VITE_API } from "../../App.jsx";
import { Container, Table, Button } from "react-bootstrap";

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

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="text-3xl text-primary">Posts List</h1>
        <Link to="/posts/create">
          <Button variant="outline-primary" className="rounded-pill">
            <MdOutlineAddBox className="text-primary" /> Add Post
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr className="text-center">
              <th>No</th>
              <th>Title</th>
              <th className="d-none d-md-table-cell">Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts && posts.length > 0 ? (
              posts.map((post, index) => (
                <tr key={post._id}>
                  <td>{index + 1}</td>
                  <td>{post.title}</td>
                  <td className="d-none d-md-table-cell">{post.description}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Link to={`/posts/${post._id}`}>
                        <Button variant="success" className="rounded-pill">
                          <BsInfoCircle /> View
                        </Button>
                      </Link>
                      <Link to={`/posts/edit/${post._id}`}>
                        <Button variant="warning" className="rounded-pill">
                          <AiOutlineEdit /> Edit
                        </Button>
                      </Link>
                      <Link to={`/posts/delete/${post._id}`}>
                        <Button variant="danger" className="rounded-pill">
                          <MdOutlineDelete /> Delete
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No Posts Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

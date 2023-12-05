import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { VITE_API } from "../../App.jsx";
import { Container, Table, Button } from "react-bootstrap";

export const Homebook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${VITE_API}/books`)
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="text-3xl text-primary">Books List</h1>
        <Link to="/books/create">
          <Button variant="outline-primary" className="rounded-pill">
            <MdOutlineAddBox className="text-primary" /> Add Book
          </Button>
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr className="text-center">
              <th>No</th>
              <th>Title</th>
              <th className="d-none d-md-table-cell">Author</th>
              <th className="d-none d-md-table-cell">Publish Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books && books.length > 0 ? (
              books.map((book, index) => (
                <tr key={book._id}>
                  <td>{index + 1}</td>
                  <td>{book.title}</td>
                  <td className="d-none d-md-table-cell">{book.author}</td>
                  <td className="d-none d-md-table-cell">{book.publishYear}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Link to={`/books/${book._id}`}>
                        <Button variant="success" className="rounded-pill">
                          <BsInfoCircle /> View
                        </Button>
                      </Link>
                      <Link to={`/books/edit/${book._id}`}>
                        <Button variant="warning" className="rounded-pill">
                          <AiOutlineEdit /> Edit
                        </Button>
                      </Link>
                      <Link to={`/books/delete/${book._id}`}>
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
                <td colSpan="5" className="text-center">
                  No Books Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

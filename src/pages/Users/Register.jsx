import { useState } from "react";
import Spinner from "../../components/Spinner.jsx";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { VITE_API } from "../../App.jsx";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
    };
    setIsLoading(true);
    axios
      .post(`${VITE_API}/auth/register`, data)
      .then(() => {
        setIsLoading(false);
        navigate("/profile");
      })
      .catch((err) => {
        setIsLoading(false);
        alert("Something went wrong");
        console.log(err);
      });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className="p-4 shadow-lg rounded">
            <h2 className="text-center text-2xl font-bold mb-4 text-primary">
              Register
            </h2>
            {isLoading && <Spinner />}
            {!isLoading && (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName" className="mb-4">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-4">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  style={{
                    backgroundColor: "#4158D0",
                    backgroundImage:
                      "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
                    border: "none",
                  }}
                >
                  Register
                </Button>

                <p className="text-center mt-2">
                  Already have an account?
                  <Link
                    to="/login"
                    className="text-primary font-weight-bold ml-1"
                  >
                    Login Here
                  </Link>
                </p>
              </Form>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

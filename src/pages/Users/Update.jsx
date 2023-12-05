import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import { VITE_API } from "../../App.jsx";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    axios
      .get(`${VITE_API}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setName(res.data.user.name);
        setEmail(res.data.user.email);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    const token = localStorage.getItem("token");
    const data = {
      name,
      email,
      password,
      confirmPassword,
    };
    setIsLoading(true);

    axios
      .put(`${VITE_API}/auth/profile`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setIsLoading(false);
        navigate("/profile");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <div className="max-w-md mx-auto mt-8 p-4 border rounded bg-white">
            <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
            {isLoading ? (
              <Spinner />
            ) : (
              <Form onSubmit={handleUpdate}>
                <Form.Group controlId="formName" className="mb-4">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-4">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                </Form.Group>

                <Form.Group controlId="formConfirmPassword" className="mb-4">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Confirm password"
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
                  Update Profile
                </Button>
              </Form>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

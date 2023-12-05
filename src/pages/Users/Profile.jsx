import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/Spinner.jsx";
import { VITE_API } from "../../App.jsx";
import { Button, Card, Container } from "react-bootstrap";

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [login, setLogin] = useState(false);
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
        setUser(res.data.user);
        setLogin(true);
      })
      .catch((err) => {
        setIsLoading(false);
        setLogin(false);
        console.log(err);
      });
  }, [navigate]);

  return (
    <Container className="mt-5">
      <Card
        className="mx-auto p-4 shadow"
        style={{ backgroundColor: "#f4f4f4" }}
      >
        <Card.Title className="text-center text-2xl font-bold mb-4">
          User Profile
        </Card.Title>
        {isLoading ? (
          <Spinner />
        ) : login ? (
          <div>
            <Card.Text
              className="mb-2"
              style={{ fontFamily: "Arial, sans-serif", fontSize: "18px" }}
            >
              <span className="font-bold">Name:</span> {user.name}
            </Card.Text>
            <Card.Text
              className="mb-2"
              style={{ fontFamily: "Arial, sans-serif", fontSize: "18px" }}
            >
              <span className="font-bold">Email:</span> {user.email}
            </Card.Text>
            <Link to="/update">
              <Button
                variant="primary"
                className="w-100 mb-3"
                style={{
                  backgroundColor: "#ffa600",
                  border: "none",
                }}
              >
                Update Profile
              </Button>
            </Link>
          </div>
        ) : (
          <div>
            <Card.Text
              style={{ fontFamily: "Arial, sans-serif", fontSize: "18px" }}
            >
              You are not logged in
            </Card.Text>
            <Link to="/login">
              <Button
                variant="primary"
                className="w-100"
                style={{
                  backgroundColor: "#ffa600",
                  border: "none",
                }}
              >
                Login
              </Button>
            </Link>
          </div>
        )}
      </Card>
    </Container>
  );
};

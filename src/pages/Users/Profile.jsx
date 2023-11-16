import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/Spinner.jsx";
import { VITE_API } from "../../App.jsx";

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
  }, []);

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded bg-white">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      {isLoading ? (
        <Spinner />
      ) : login ? (
        <div>
          <p className="mb-2">
            <span className="font-bold">Name:</span> {user.name}
          </p>
          <p className="mb-2">
            <span className="font-bold">Email:</span> {user.email}
          </p>
          <Link to="/update">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Update Profile
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <p>You are not logged in</p>
          <Link to="/login">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

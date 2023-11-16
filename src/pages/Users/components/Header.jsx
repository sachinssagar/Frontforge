import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { VITE_API } from "../../../App.jsx";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [user, setuser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${VITE_API}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setuser(res.data.user);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setIsLoggedIn(false);
        console.log(err);
      });
  }, []);

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          Your Logo
        </Link>
        <nav>
          <ul className="flex space-x-4">
            {isLoggedIn ? (
              <>
                <li>Hi {user.name}</li>

                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

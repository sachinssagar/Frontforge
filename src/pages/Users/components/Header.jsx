import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import { VITE_API } from "../../../App.jsx";

export const Header = () => {
  const [user, setuser] = useState(null);
  const isLoggedIn = user !== null;
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear("token");
    setuser(null);
    navigate("/login");
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await fetch(`${VITE_API}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const userData = await response.json();
          setuser(userData.user);
        } else {
          navigate("/login");
        }
      }
    };
    checkAuth();
  }, [navigate]);

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
                <li>Hi {user.name} </li>

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

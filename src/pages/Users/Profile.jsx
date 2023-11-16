import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/Spinner.jsx";
import { VITE_API } from "../../App.jsx";

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }

    axios
      .get(`${VITE_API}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setUser(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        alert("Something went wrong");
        console.log(err);
      });
  }, []);

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded bg-white">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        user && (
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
        )
      )}
    </div>
  );
};

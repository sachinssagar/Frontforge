import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import { VITE_API } from "../../App.jsx";

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
    <div className="max-w-md mx-auto mt-8 p-4 border rounded bg-white">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <form className="max-w-md mx-auto" onSubmit={handleUpdate}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm password"
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Update Profile
          </button>
        </form>
      )}
    </div>
  );
};

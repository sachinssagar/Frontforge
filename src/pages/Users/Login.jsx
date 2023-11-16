import { useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner.jsx";
import { Link, useNavigate } from "react-router-dom";
import { VITE_API } from "../../App.jsx";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };
    setIsLoading(true);
    axios
      .post(`${VITE_API}/auth/login`, data)
      .then((res) => {
        setIsLoading(false);
        localStorage.setItem("token", res.data.token);
        navigate("/profile");
      })
      .catch((err) => {
        setIsLoading(false);
        alert("Something went wrong");
        console.log(err);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded bg-white">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {isLoading && <Spinner />}
      {!isLoading && (
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
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
              required
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
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800  cursor-pointer"
              to="/register"
            >
              Register
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          Your Logo
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

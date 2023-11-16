import { Link } from "react-router-dom";

export const MainPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to the Main Page!</h1>
        <nav className="flex items-center justify-center">
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/books"
                className="text-blue-500 hover:underline transition duration-300"
              >
                Go to Books
              </Link>
            </li>
            <li>
              <Link
                to="/posts"
                className="text-green-500 hover:underline transition duration-300"
              >
                Go to Postsasa
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

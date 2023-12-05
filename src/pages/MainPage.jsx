import { Link } from "react-router-dom";

export const MainPage = () => {
  return (
    <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center">
        <h1 className="display-4 font-weight-bold text-primary mb-4">
          Welcome to the Main Page!
        </h1>
        <nav className="d-flex justify-content-center">
          <ul className="nav">
            <li className="nav-item">
              <Link to="/books" className="nav-link text-primary">
                Explore Books
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/posts" className="nav-link text-success">
                Discover Posts
              </Link>
            </li>
          </ul>
        </nav>
        <p className="mt-4 text-muted">
          Dive into the world of knowledge and creativity.
        </p>
      </div>
    </div>
  );
};

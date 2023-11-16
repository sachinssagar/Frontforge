import { Link } from "react-router-dom";

export const Profile = () => {
  // Replace this with actual user data from your authentication context
  const user = {
    displayName: "John Doe",
    email: "john.doe@example.com",
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded bg-white">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Display Name:
        </label>
        <p>{user.displayName}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email Address:
        </label>
        <p>{user.email}</p>
      </div>
      <Link to="/update">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Update Profile
        </button>
      </Link>
    </div>
  );
};

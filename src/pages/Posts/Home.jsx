import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { VITE_API } from "../../App.jsx";

export const HomePost = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${VITE_API}/posts`)
      .then((res) => {
        setPosts(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        alert("Something went wrong");
        console.log(err);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Posts List</h1>
        <Link to="/posts/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Title</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Description
              </th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {posts && posts.length > 0 ? (
              posts.map((post, index) => (
                <tr key={post._id} className="h-8">
                  <td className="border border-slate-700 rounded-md text-center">
                    {index + 1}
                  </td>
                  <td className="border border-slate-700 rounded-md">
                    {post.title}
                  </td>
                  <td className="border border-slate-700 rounded-md max-md:hidden">
                    {post.description}
                  </td>
                  <td className="border border-slate-700 rounded-md">
                    <Link to={`/posts/${post._id}`}>
                      <BsInfoCircle className="text-sky-800 text-2xl mr-2" />
                    </Link>
                    <Link to={`/posts/edit/${post._id}`}>
                      <AiOutlineEdit className="text-sky-800 text-2xl mr-2" />
                    </Link>
                    <Link to={`/posts/delete${post._id}`}>
                      <MdOutlineDelete className="text-sky-800 text-2xl mr-2" />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No Post Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

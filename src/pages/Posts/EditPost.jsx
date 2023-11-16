import { useState, useEffect } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { VITE_API } from "../../App.jsx";

export const EditPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${VITE_API}/posts/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        alert("Something went wrong");
        console.log(err);
      });
  }, [id]);

  const handleEdit = () => {
    const data = {
      title,
      description,
    };
    setIsLoading(true);

    axios
      .put(`${VITE_API}/posts/${id}`, data)
      .then(() => {
        console.log(data);
        setIsLoading(false);
        navigate("/posts");
      })
      .catch((err) => {
        setIsLoading(false);
        alert("Something went wrong");
        console.log(err);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Post</h1>
      {isLoading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />

          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-fulll"
            />
          </div>
        </div>

        <button className="p-2 bg-sky-300 m-8" onClick={handleEdit}>
          Edit Post
        </button>
      </div>
    </div>
  );
};

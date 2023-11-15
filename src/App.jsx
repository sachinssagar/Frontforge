import { Route, Routes } from "react-router-dom";
import {
  Homebook,
  CreateBook,
  ShowBook,
  EditBook,
  DeleteBook,
  HomePost,
  CreatePost,
  ShowPost,
  EditPost,
  DeletePost,
} from "./routes/AllRoutes";
import { MainPage } from "./pages/MainPage";

export const { VITE_SOME_KEY } = import.meta.env;
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/books" element={<Homebook />} />
      <Route path="/books/create" element={<CreateBook />} />
      <Route path="/books/:id" element={<ShowBook />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
      <Route path="/books/delete/:id" element={<DeleteBook />} />
      <Route path="/posts" element={<HomePost />} />
      <Route path="/posts/create" element={<CreatePost />} />
      <Route path="/posts/:id" element={<ShowPost />} />
      <Route path="/posts/edit/:id" element={<EditPost />} />
      <Route path="/posts/delete/:id" element={<DeletePost />} />
    </Routes>
  );
};

export default App;

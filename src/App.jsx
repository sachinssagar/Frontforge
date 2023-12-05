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
  Login,
  Register,
  Update,
  Profile,
  Header,
} from "./routes/AllRoutes";
import { MainPage } from "./pages/MainPage";

export const { VITE_API } = import.meta.env;

const App = () => {
  return (
    <>
      <Header />
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update" element={<Update />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/logout" element={<Logout />} /> */}
        <Route path="/header" element={<Header />} />
      </Routes>
    </>
  );
};

export default App;

import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import PostsPage from './pages/PostsPage';
import PostDetailPage from "./pages/PostDetailPage";
import ContactPage from "./pages/ContactPage";


export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PostsPage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  );
}
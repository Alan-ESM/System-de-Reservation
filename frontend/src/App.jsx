import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import GuestsList from './pages/GuestsList';
import PhotosCarousel from './pages/PhotosCarousel';
import './styles/globals.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inscription" element={<Register />} />
        <Route path="/invites" element={<GuestsList />} />
        <Route path="/galerie" element={<PhotosCarousel />} />
        <Route path="/register" element={<Register />} />
        <Route path="/guests" element={<GuestsList />} />
        <Route path="/photos" element={<PhotosCarousel />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

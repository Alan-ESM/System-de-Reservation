import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/globals.css';

const Home = lazy(() => import('./pages/Home'));
const Register = lazy(() => import('./pages/Register'));
const GuestsList = lazy(() => import('./pages/GuestsList'));
const PhotosCarousel = lazy(() => import('./pages/PhotosCarousel'));

const PageLoader = () => (
  <div className='flex h-screen items-center justify-center bg-dark-gray text-gold'>
    <div className='text-xl font-bold animate-pulse'>Chargement...</div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/inscription' element={<Register />} />
          <Route path='/invites' element={<GuestsList />} />
          <Route path='/galerie' element={<PhotosCarousel />} />
          <Route path='/register' element={<Register />} />
          <Route path='/guests' element={<GuestsList />} />
          <Route path='/photos' element={<PhotosCarousel />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

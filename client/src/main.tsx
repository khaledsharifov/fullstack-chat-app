import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';

import { Routes } from './routes/index.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes />
    <Toaster
      toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
        },
      }}
    />
  </BrowserRouter>
);

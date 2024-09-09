import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CatalogPage from './pages/CatelogPage/CatalogPage.tsx';
import CartPage from './pages/CartPage/CartPage.tsx';
import PaymentPage from './pages/PaymentPage/PaymentPage.tsx';
import ImportPage from './pages/ImportPage/ImportPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <CatalogPage /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/payment', element: <PaymentPage /> },
      { path: '/import', element: <ImportPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

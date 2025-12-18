import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { router } from './Router/Router';
import { ToastContainer } from 'react-toastify';
import BloodAppProvider from './Context/BloodAppProvider';

createRoot(document.getElementById('root')).render(
  <BloodAppProvider>
    <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
  <ToastContainer></ToastContainer>
  </BloodAppProvider>
)

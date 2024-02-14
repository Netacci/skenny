import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from '@material-tailwind/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage.jsx';
import AllProperties from './pages/Properties/AllProperties.jsx';
import Property from './pages/Properties/Property.jsx';
import Contact from './pages/Contact/Contact.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'properties',
    element: <AllProperties />,
  },
  {
    path: 'properties/:propertyId',
    element: <Property />,
  },
  {
    path: 'contact',
    element: <Contact />,
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

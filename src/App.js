import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Checkout from './component/Checkout/Checkout';
import Login from './component/Login/Login';
import Orders from './component/Orders/Orders';
import Products from './component/Products/Products';
import Register from './component/Register/Register';
import Update from './component/Update/Update';
import Main from './Layout/Main';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <Products />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/orders",
          element: <PrivateRoute> <Orders /> </PrivateRoute>
        },
        {
          path: "/checkout/:id",
          loader: ({ params }) => fetch(`https://mongo-crud-db.vercel.app/products/${params.id}`),
          element: <PrivateRoute> <Checkout /> </PrivateRoute>
        },
        {
          path: "/update/:id",
          loader: ({ params }) => fetch(`https://mongo-crud-db.vercel.app/orders/${params.id}`),
          element: <Update />
        },
      ]
    }
  ])
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

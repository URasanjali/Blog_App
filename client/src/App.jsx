/*import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { Children } from "react";
import { Outlet } from "react-router-dom";


const Layout = ()=>{
  return(
    <>
      <Navbar/>
      <Outlet />
      <Footer/>
    </>
  );
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    Children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/single",
        element:<Single/>
      },
      {
        path:"/write",
        element:<Write/>
      }
    ]
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);
function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  
  );
}

export default App;*/
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from  "./pages/Write";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
 import "./style.scss";

const Layout = ()=>{
  return(
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  );
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/post/:id",
        element: <Single/>
      },
      {
        path: "/write",
        element: <Write/>
      },
    ]
  },

  {
    path: "/register",
    element: <Register/>,
  },

  {
    path: "/login",
    element: <Login/>,
  },

  {
    path: "/write",
    element: <Write/>,
  },

  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/single",
    element: <Single/>,
  },
]);

function App() {
  return <div className="app">
    <div className="container">
    <RouterProvider router={router}/>
    </div>
  </div>;
}



export default App;


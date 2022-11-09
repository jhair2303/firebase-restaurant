import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { IoRestaurantSharp, IoMenu } from "react-icons/io5";

interface Props {
  isLogin: boolean;
  logoutSesion(): void;
}

const Navbar = ({ isLogin, logoutSesion }: Props) => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const { logout, userRol } = useAuth();

  const SignOut = () => {
    try {
      logout();
      logoutSesion();
    } catch (error) {
      console.log(error);
    }
  };

  let buttons;

  if (isLogin) {
    if (userRol.rol === "Usuario") {
      buttons = (
        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
          <li className="nav-item">
            <Link
              className="px-3 py-2 flex items-center font-sans leading-snug text-white hover:opacity-80"
              to="/products"
            >
              <i className="text-lg leading-lg text-white opacity-80"></i>
              <span className="ml-2">Productos</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              onClick={SignOut}
              className="px-3 py-2 flex items-center font-sans leading-snug text-white hover:opacity-80"
              to="/login"
            >
              <i className="text-lg leading-lg text-white opacity-80"></i>
              <span className="ml-2">Salir</span>
            </Link>
          </li>
        </ul>
      );
    } else {
      buttons = (
        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
          <li className="nav-item">
            <Link
              className="px-3 py-2 flex items-center font-sans leading-snug text-white hover:opacity-80"
              to="/create-product-by-admin-of-page"
            >
              <i className="text-lg leading-lg text-white opacity-80"></i>
              <span className="ml-2">Añadir</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="px-3 py-2 flex items-center font-sans leading-snug text-white hover:opacity-80"
              to="/products"
            >
              <i className="text-lg leading-lg text-white opacity-80"></i>
              <span className="ml-2">Productos</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              onClick={SignOut}
              className="px-3 py-2 flex items-center font-sans leading-snug text-white hover:opacity-80"
              to="/login"
            >
              <i className="text-lg leading-lg text-white opacity-80"></i>
              <span className="ml-2">Salir</span>
            </Link>
          </li>
        </ul>
      );
    }
  } else {
    buttons = (
      <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
        <li className="nav-item">
          <Link
            className="px-3 py-2 flex items-center font-sans leading-snug text-white hover:opacity-80"
            to="/login"
          >
            <i className="text-lg leading-lg text-white opacity-80"></i>
            <span className="ml-2">Iniciar sesión</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="px-3 py-2 flex items-center font-sans leading-snug text-white hover:opacity-80"
            to="/register"
          >
            <i className="text-lg leading-lg text-white opacity-80"></i>
            <span className="ml-2">Registrarme</span>
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <nav className="relative flex flex-wrap items-center justify-between py-3 bg-slate-900">
      <div className="w-11/12 md:w-10/12 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link
            className="text-2xl font-roboto leading-relaxed flex mr-4 py-2 whitespace-nowrap uppercase text-white"
            to="/"
          >
            <span className="my-auto text-3xl mr-2">
              {<IoRestaurantSharp />}
            </span>
            Restaurante
          </Link>
          <button
            className="text-white cursor-pointer text-3xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <IoMenu />
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
          id="example-navbar-danger"
        >
          {buttons}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

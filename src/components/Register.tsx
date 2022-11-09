import { ChangeEvent, useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IRegister } from "../interfaces/auth";

interface Props {
  loginSesion(): void;
}


const Register = ({loginSesion}: Props) => {
  const [user, setUser] = useState<IRegister>({
    email: "",
    password: "",
    name: "",
    lastname: "",
    cellphone: "",
    rol: ""
  });

  const { signUp } = useAuth();

  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmitForm = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signUp(user);
      toast.error(`🦄 You have registered`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "dark",
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      loginSesion();
        localStorage.setItem("isLogin", "Inicio de sesión");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(`🦄 ${error}`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "dark",
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <form
          onSubmit={handleSubmitForm}
          className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="text-2xl font-semibold mb-3">Registro</h1>
          <div className="md:flex">
            <div className="mb-4 md:mr-3">
              <label
                htmlFor="email"
                className="block text-gray-700 text-md font-bold mb-2"
              >
                Nombre
              </label>
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-md font-bold mb-2"
              >
                Apellido
              </label>
              <input
                type="text"
                name="lastname"
                placeholder="Apellido"
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="md:flex">
          <div className="mb-4 md:mr-3">
            <label
              htmlFor="email"
              className="block text-gray-700 text-md font-bold mb-2"
            >
              Correo
            </label>
            <input
              type="email"
              name="email"
              placeholder="Correo"
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-md font-bold mb-2"
            >
              Celular
            </label>
            <input
            minLength={10}
            maxLength={10}
              type="tel"
              name="cellphone"
              placeholder="Celular"
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          </div>
          <div className="md:flex justify-between">
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-md font-bold mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="text-md flex justify-between md:w-36">
            <button className="bg-blue-700 hover:bg-blue-800 w-full md:h-10 md:mt-8 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Registro
            </button>
          </div>
          </div>
        </form>
        <p className="my-2 text-md flex justify-evenly px-3">
          Ya tengo una cuenta{" "}
          <Link
            to="/login"
            className="text-blue-700 hover:text-blue-900 font-semibold"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

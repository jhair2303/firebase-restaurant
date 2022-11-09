import { ChangeEvent, useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Google from "../public/img/Google.png";
import ReCaptcha from "react-google-recaptcha";
import { ILogin } from "../interfaces/auth";

interface Props {
  loginSesion(): void;
}

const Login = ({ loginSesion }: Props) => {
  const [userForm, setUser] = useState<ILogin>({
    email: "",
    password: "",
  });

  const [verified, setVerified] = useState(false);

  const { signIn, signInGoogle, resetPassword } = useAuth();

  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...userForm, [name]: value });
  };

  const handleSubmitForm = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (verified) {
        await signIn(userForm.email, userForm.password);
        loginSesion();
        localStorage.setItem("isLogin", "Inicio de sesión");
        return navigate("/");
      }
      toast.error(`🦄 Llena el recaptcha`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "dark",
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
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

  const handleGoogleLogin = async () => {
    try {
      await signInGoogle();
      loginSesion();
      localStorage.setItem("isLogin", "Inicio de sesión");
      navigate("/");
    } catch (error) {
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

  const handleResetPassword = async () => {
    if (!userForm.email)
      return toast.error(`🦄 Input your email`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "dark",
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    try {
      await resetPassword(userForm.email);
      toast.success(`🦄 We have sent an email to reset your password`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "dark",
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
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
          <h1 className="text-2xl font-semibold mb-3">Iniciar sesión</h1>
          <div className="mb-4">
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
          <div className="mt-4 text-md md:flex flex flex-col md:justify-between">
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Inciar sesión
            </button>
            <a
              href="#!"
              onClick={handleResetPassword}
              className="text-center mt-4 font-semibold text-md text-blue-700 hover:text-blue-900"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>
        <div className="flex justify-center">
          <ReCaptcha
            sitekey="6LduDPggAAAAAC_2QVW-5tnU-k0MBbbRAZWJ2HV_"
            onChange={() => setVerified(true)}
          />
        </div>
        <p className="my-4 text-md flex justify-between px-3">
          No tengo una cuenta{" "}
          <Link
            to="/register"
            className="text-blue-700 hover:text-blue-900 font-semibold"
          >
            Registro
          </Link>
        </p>
        <button
          className="flex bg-gray-200 w-full justify-center hover:bg-gray-300 font-semibold text-gray-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline m-auto items-center"
          onClick={handleGoogleLogin}
        >
          <img src={Google} alt="Not found" className="w-8" />
          Google
        </button>
      </div>
    </div>
  );
};

export default Login;

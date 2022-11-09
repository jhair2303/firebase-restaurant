import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Register from "./components/Register";
import { AuthProvider } from "./context/authContext";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import ProductForm from "./components/ProductForm";
import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("isLogin");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const loginSesion = () => {
    setIsLogin(true);
  };

  const logoutSesion = () => {
    localStorage.removeItem("isLogin");
    setIsLogin(false);
  };

  return (
    <div className="bg-gray-100 h-full text-black">
      <AuthProvider>
        <Navbar isLogin={isLogin} logoutSesion={logoutSesion} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-product-by-admin-of-page"
            element={
              <ProtectedRoute>
                <ProductForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              localStorage.getItem("isLogin") ? (
                <Navigate to="/" />
              ) : (
                <Register loginSesion={loginSesion} />
              )
            }
          />
          <Route
            path="/login"
            element={
              localStorage.getItem("isLogin") ? (
                <Navigate to="/" />
              ) : (
                <Login loginSesion={loginSesion} />
              )
            }
          />
        </Routes>
      </AuthProvider>
      <ToastContainer />
    </div>
  );
};

export default App;

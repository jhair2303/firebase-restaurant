import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
}

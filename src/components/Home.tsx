import { useAuth } from "../context/authContext";
import NoImage from "../public/img/no-image.png";
import Loading from "./Loading";

const Home = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />; 
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-11/12 h-64 flex flex-col items-center justify-center md:max-w-lg shadow-lg rounded-sm bg-white">
        <div className="w-full text-center mb-4">
          <h1 className="text-4xl font-mono">Bienvenid@</h1>
        </div>
        <div className="flex justify-around w-full">
          <h1 className="text-2xl font-mono">
            {user?.displayName || user?.email}
          </h1>
          {user?.photoURL ? (
            <img
              className="object-contain rounde-full"
              src={user.photoURL}
              alt="not found"
              width="45px"
            />
          ) : (
            <img
              className="object-contain rounde-full"
              src={NoImage}
              alt="not found"
              width="45px"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
  User,
} from "firebase/auth";
import { doc, setDoc, getDoc, DocumentData } from "firebase/firestore";
import { auth, firestore } from "../firebase";

interface IContext {
  user: User | null;
  userRol: DocumentData;
  signUp: (userData: IUser) => void;
  signIn: (email: string, password: string) => void;
  logout: () => void;
  signInGoogle: () => void;
  resetPassword: (email: string) => void;
  loading: boolean;
}

interface IUser {
  email: string;
  password: string;
  name: string;
  lastname: string;
  cellphone: string;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const authContext = createContext<IContext | null>(null);

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("No tienes un provider");
  return context;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [userRol, setUserRol] = useState<DocumentData>({
    email: "",
    name: "",
    lastname: "",
    cellphone: "",
    rol: "",
  });

  const signUp = async (userData: IUser) => {
    const userInfo = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );

    const ref = doc(firestore, `/user/${userInfo.user.uid}`);
    await setDoc(ref, {
      email: userData.email,
      rol: "Usuario",
      cellphone: userData.cellphone,
      name: userData.name,
      lastname: userData.lastname,
    });
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signInGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    const userInfo = await signInWithPopup(auth, googleProvider);
    const ref = doc(firestore, `/user/${userInfo.user.uid}`);
    await setDoc(ref, {
      email: userInfo.user.email,
      rol: "Usuario",
      cellphone: userInfo.user.phoneNumber,
      name: userInfo.user.displayName,
      lastname: null,
    });
  };

  const logout = () => {
    signOut(auth);
  };

  const resetPassword = (email: string) => {
    sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (currentUser) => {
      const rolUser = async () => {
        const docRef = doc(firestore, `user/${currentUser?.uid}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser(currentUser);
          setLoading(false);
          setUserRol(docSnap.data());
        }
      };
      rolUser();
    });
    return () => unSubcribe();
  }, []);

  return (
    <authContext.Provider
      value={{
        signUp,
        signIn,
        logout,
        user,
        loading,
        userRol,
        signInGoogle,
        resetPassword,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

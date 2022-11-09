import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAH2P6BndI1oj9bs-J9p2XznDsmVq3dBX4",
  authDomain: "react-fb-auth-51f7b.firebaseapp.com",
  projectId: "react-fb-auth-51f7b",
  storageBucket: "react-fb-auth-51f7b.appspot.com",
  messagingSenderId: "752774481844",
  appId: "1:752774481844:web:5cc8e201a21b91e6f394e1",
  measurementId: "G-P35G2733P1",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

/**
 * 
 * @param {File} file 
 * @returns {Promise<string>} url, file uploaded 
 */

export async function uploadFile(file: File) {
  const date = await Date.now();
  const name = file.name.substr(0, file.name.lastIndexOf("."));
  const storageRef = ref(storage, `products/${date + "-" + name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef)
  return url;
}

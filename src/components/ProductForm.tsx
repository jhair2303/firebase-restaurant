import { doc, setDoc } from "firebase/firestore";
import { ChangeEvent, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { firestore, uploadFile } from "../firebase";
import { IProduct } from "../interfaces/product";

const ProductForm = () => {
  const [product, setProduct] = useState<IProduct>({
    name: "",
    category: "",
    price: 0,
    imageURL: "",
  });
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState<string>();

  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleInputChange = function (e: ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    if (!fileList) return;
    setFile(fileList[0]);
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    try {
      await uploadFile(file).then(async (f) => {
        if (f) {
          try {
            const date = await Date.now();
            const docRef = doc(firestore, `product/${date}`);
            await setDoc(docRef, {
              name: product.name,
              category: product.category,
              price: product.price,
              imageURL: f,
            });
            toast.success(`🦄 Se creo el producto correctamente`, {
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
            toast.error(`🦄 Error del servidor, intentalo más tarde`, {
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
        }
      });
    } catch (error) {
      toast.error(`🦄 Error al subir imagen, intenta más tarde`, {
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
    <div className="w-full max-w-xs m-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <h1 className="text-2xl font-semibold mb-3">Agregar producto</h1>
        </div>
        {preview && (
          <div className="flex justify-center mb-4">
            <img
              src={preview}
              className="object-contain w-full h-40"
              alt="not-found"
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block">
            <span className="sr-only">Elegir archivo</span>
            <input
              type="file"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={(e) => handleInputChange(e)}
            />
          </label>
        </div>
        <div className="mb-4">
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
            Precio
          </label>
          <input
            type="text"
            name="price"
            placeholder="Precio"
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-md font-bold mb-2"
          >
            Categoría
          </label>
          <input
            type="text"
            name="category"
            placeholder="Categoría"
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Agregar
        </button>
      </form>
    </div>
  );
};

export default ProductForm;

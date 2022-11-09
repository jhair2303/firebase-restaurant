import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase";
import Loading from "./Loading";

interface IProduct {
  name: string;
  price: number;
  category: string;
  imageURL: string;
  id: string;
}

const ProductList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([
    {
      name: "",
      price: 0,
      category: "",
      imageURL: "",
      id: "",
    },
  ]);

  const getProducts = async () => {
    setIsLoading(true);
    const querySnapshot = await getDocs(collection(firestore, "product"));
    const docs: any = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    setProducts(docs);
    setIsLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="md:w-10/12 w-11/12 mx-auto h-full py-3">
      <div className="md:grid md:grid-cols-4 md:gap-4 w-full">
        {products.map((product) => {
          return (
            <div
              key={product.id}
              className="w-full rounded overflow-hidden shadow-lg"
            >
              <img
                className="w-full"
                src={product.imageURL}
                alt="Sunset in the mountains"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.name}</div>
                <p className="text-gray-700 text-base">{product.category}</p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  $ {product.price}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;

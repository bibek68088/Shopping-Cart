import { useState } from "react";
import { Rating, Typography } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/16/solid";
import { details } from "../data";

type ProductType = {
  id: number;
  productName: string;
  productPrice: number;
  productRating: number;
  productImage: string;
  desc: string;
};

type CartItem = ProductType & { quantity: number };

type StoreProps = {
  cart: CartItem[];
  addToCart: (product: ProductType) => void;
};

const Store = ({ cart, addToCart }: StoreProps) => {
  const [successMessages, setSuccessMessages] = useState<{ [key: number]: boolean }>({});

  const handleAddToCart = (product: ProductType) => {
    addToCart(product);
    setSuccessMessages((prevMessages) => ({
      ...prevMessages,
      [product.id]: true,
    }));
    setTimeout(() => {
      setSuccessMessages((prevMessages) => ({
        ...prevMessages,
        [product.id]: false,
      }));
    }, 2000);
  };

  return (
    <div>
      <div className="flex justify-center p-4">
        <h1 className="font-bold md:text-4xl text-3xl">Shopping List Cart</h1>
      </div>
      <section
        id="cart"
        className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center lg:mx-8 xl:mx-32 2xl:mx-[20%] my-10"
      >
        {details.map((product: ProductType, index: number) => (
          <div
            key={index}
            className="border p-6 w-11/12 mx-auto md:w-11/12 lg:w-11/12 xl:w-full shadow-2xl rounded-xl"
          >
            <div className="flex justify-center items-center lg:w-2/3 xl:w-10/12">
              <img
                src={product.productImage}
                alt="img"
                className="md:w-1/2 w-full h-full"
              />
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h1 className="font-medium text-2xl pt-4">
                  {product.productName}
                </h1>
                <p className="font-medium text-lg">${product.productPrice}</p>
                <p className="text-gray-500 text-justify md:truncate">
                  {product.desc}
                </p>
              </div>
              <div className="xl:flex items-center gap-32">
                <Rating
                  value={product.productRating}
                  className="flex items-center text-amber-500 w-6"
                  readonly
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
                <Typography
                  className="font-medium text-md text-gray-500 pt-2 md:pt-3 lg:pt-2 xl:pt-0"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {product.productRating}.0/5 (100 reviews)
                </Typography>
              </div>
              <div className="flex gap-6">
                <div className="border bg-black w-32 rounded-lg">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex mx-auto uppercase p-3 text-white font-medium text-xs"
                  >
                    Add To Cart
                  </button>
                </div>
                <div className="flex justify-center items-center">
                  <button className="hover:bg-gray-300 ease-in-out rounded-sm">
                    <HeartIcon className="w-8 h-8" />
                  </button>
                </div>
              </div>
              {successMessages[product.id] && (
                <div className="flex justify-center p-2 bg-green-600 text-white text-md font-medium mt-2">
                  Added to cart successfully!
                </div>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Store;

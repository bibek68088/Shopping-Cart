import { useState } from "react";
import { Rating, Typography } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/16/solid";
import { details } from "../data";

type Product = {
  id: number;
  productName: string;
  productPrice: number;
  productRating: number;
  productImage: string;
  desc: string;
};

type CartItem = Product & { quantity: number };

const Store = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const decreaseQuantity = (productId: number) => {
    const updatedCart = cart
      .map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
  };

  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, item) =>
        total + item.quantity * parseFloat(item.productPrice.toString()),
      0
    );
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 justify-center lg:mx-8 xl:mx-32 2xl:mx-[20%] my-10">
      {details.map((product: Product, index: number) => (
        <div key={index} className="border p-6 w-11/12 md:w-11/12 lg:w-11/12 xl:w-full">
          <div className="flex justify-center items-center lg:w-2/3 xl:w-10/12 ">
            <img
              src={product.productImage}
              alt="img"
              className="md:w-1/2 w-full h-full"
            />
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="font-medium text-2xl">{product.productName}</h1>
              <p className="font-medium text-lg">${product.productPrice}</p>
              <p className="text-gray-500 text-justify md:truncate">
                {product.desc}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Rating
                value={product.productRating}
                className="text-amber-500"
                readonly
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
              <Typography
                className="font-medium text-md text-gray-500"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {product.productRating}.0/5 (100 reviews)
              </Typography>
            </div>
            <div>
              {cart.find((item) => item.id === product.id) ? (
                <div className="flex flex-col items-start gap-4">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => decreaseQuantity(product.id)}
                      className="flex items-center border p-2 bg-blue-600 w-7 h-8 text-white rounded"
                    >
                      -
                    </button>
                    <div>
                      <span className="text-lg font-medium mr-1">
                        {cart.find((item) => item.id === product.id)!.quantity}
                      </span>
                      in cart
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="flex items-center border p-2 bg-blue-600 w-7 h-8 text-white rounded"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="flex mx-10 border p-1 text-sm bg-red-600 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-6">
                  <div className="border bg-black w-32 rounded-lg">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex mx-auto uppercase p-3 text-white font-medium text-xs"
                    >
                      Add To Cart
                    </button>
                  </div>
                  <div className="flex justify-center items-center">
                    <button className="hover:bg-gray-300 ease-in-out rounded-sm">
                      <HeartIcon className="w-8 h-8 " />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      <div className="md:col-span-3 fixed bottom-0 right-0 p-4 bg-white shadow-md">
        <p>Total Items: {calculateTotalQuantity()}</p>
        <p>Total Price: ${calculateTotalPrice().toFixed(2)}</p>
      </div>
    </section>
  );
};

export default Store;

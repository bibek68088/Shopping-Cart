import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import Product from "./pages/Product";
import Store from "./pages/Store";

type ProductType = {
  id: number;
  productName: string;
  productPrice: number;
  productRating: number;
  productImage: string;
  desc: string;
};

type CartItem = ProductType & { quantity: number };

const App = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: ProductType) => {
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

  const clearCart = () => {
    setCart([]);
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
    <div>
      <NavBar totalQuantity={calculateTotalQuantity()} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/store"
          element={<Store cart={cart} addToCart={addToCart} />}
        />
        <Route
          path="/product"
          element={
            <Product
              cart={cart}
              addToCart={addToCart}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
              totalQuantity={calculateTotalQuantity()}
              totalPrice={calculateTotalPrice()}
              clearCart={clearCart}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;

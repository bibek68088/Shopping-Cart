type ProductType = {
  id: number;
  productName: string;
  productPrice: number;
  productRating: number;
  productImage: string;
  desc: string;
};

type CartItem = ProductType & { quantity: number };

type ProductProps = {
  cart: CartItem[];
  addToCart: (product: ProductType) => void;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  totalQuantity: number;
  totalPrice: number;
  clearCart: () => void;
};

const Product = ({
  cart,
  addToCart,
  decreaseQuantity,
  removeFromCart,
  totalQuantity,
  totalPrice,
  clearCart,
}: ProductProps) => {
  return (
    <div id="product">
      <section className="p-10">
        <div className="flex justify-center">
          <h1 className="font-medium text-4xl">This is product section</h1>
        </div>
        <div className="container w-8/12 mx-auto mt-10 p-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center border-2 border-blue-200 p-4 gap-20 mb-4 shadow-xl"
              >
                <div className="w-1/5">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col w-3/4 gap-3">
                  <div className="text-2xl font-medium">
                    <p>{item.productName}</p>
                  </div>
                  <div className="text-lg">${item.productPrice}</div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="flex items-center border p-2 bg-blue-600 w-7 h-8 text-white rounded"
                    >
                      -
                    </button>
                    <div className="text-2xl font-bold ">{item.quantity}</div>
                    <button
                      onClick={() => addToCart(item)}
                      className="flex items-center border p-2 bg-blue-600 w-7 h-8 text-white rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex mx-10 border p-1 text-sm bg-red-600 text-white rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No items in the cart.</p>
          )}
        </div>
      </section>
      <div className="fixed top-40 right-0 p-4 bg-white shadow-md w-2/12">
        <h2 className="text-2xl font-medium pb-8">Order Summary</h2>
        <div className="w-10/12">
          <div className="flex justify-between">
            <p>Total Items:</p> {totalQuantity}
          </div>
          <div className="flex justify-between">
            <p className="pb-6">Total Price: </p>${totalPrice.toFixed(2)}
          </div>
        </div>
        <button
          onClick={() => clearCart()}
          className="w-full p-2 text-white bg-blue-600"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Product;

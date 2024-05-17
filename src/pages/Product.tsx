import trash from "../images/recycle-bin.png";

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
      <div className="flex justify-center  pt-12">
        <h1 className="font-medium md:text-4xl text-2xl">Items in the cart</h1>
      </div>
      <section className="md:flex mt-16 xl:gap-6">
        <div className="container md:w-7/12 xl:w-8/12 mx-auto">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center border-2 border-blue-200 p-4 lg:gap-20 md:gap-10 gap-6 mb-4 shadow-xl"
              >
                <div className="xl:w-1/5 md:w-2/5 w-24">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col w-1/2 lg:w-3/4 gap-3">
                  <div className="lg:text-2xl font-medium">
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
                      className="flex justify-center  w-10 md:p-2 p-1 bg-red-600 rounded-lg"
                    >
                      <img src={trash} alt="trash" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No items in the cart.</p>
          )}
        </div>
        <div className="p-4 bg-white shadow-md lg:w-1/3 md:w-72 xl:w-3/12 shadow-2xl">
          <div className="flex justify-center">
            <h2 className="text-2xl font-medium pb-8">Order Summary</h2>
          </div>
          <div className="flex flex-col justify-center mx-auto w-10/12">
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
      </section>
    </div>
  );
};

export default Product;

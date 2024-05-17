import { Link } from "react-router-dom";
import homeImage from "../images/ecommerce_20shopping_20cart.png";
const HomePage = () => {
  return (
    <section className="pt-1">
      <div className="flex justify-center">
        <div className="">
          <img
            src={homeImage}
            className="h-[700px] w-[1920px] object-cover "
            alt="home-image"
          />
        </div>
        <div className="absolute flex flex-col gap-20 top-80 w-10/12">
          <div className="">
            <p className="text-3xl font-medium pb-4">Shopping Cart</p>
            <p className="font-medium md:font-light text-lg md:w-4/12 text-white md:text-black">
              Enjoy shopping and get anything you want
            </p>
          </div>

          <Link to="/store">
            <button className="p-2 bg-orange-400 rounded-md text-white font-medium w-32 md:w-1/6 2xl:w-1/12 ease-in-out duration-300">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomePage;

import shop from '../images/shopping-bag.png';
import { Link } from 'react-router-dom';

type ProductProps = {
  totalQuantity: number;
};

const NavBar = ({totalQuantity}:ProductProps) => {
  return (
    <nav className="sticky top-0 bg-white p-3 border-b w-full">
      <div className="flex justify-around">
        <ul className="flex md:gap-20 gap-10">
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/store'>Store</Link>
          </li>
          <li>
            <Link to='/product'>Product</Link>
          </li>
        </ul>
        <Link to='/product'>
        <div className='w-6 cursor-pointer'>
          <a href="#"><img  src= {shop} alt="shop-icon" /></a>
          <div className='bg-red-500 rounded-full w-4 absolute top-6'>
            <p className='text-center text-white text-xs'>{totalQuantity}</p>
          </div>
        </div>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;

import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function Navbar() {
    const { cart } = useCart();

    // Calculate total items in cart
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">ShopCart</Link>

                <div className="flex gap-6">
                    <Link to="/" className="hover:text-gray-300">Products</Link>
                    <Link to="/cart" className="hover:text-gray-300 relative">
                        Cart
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
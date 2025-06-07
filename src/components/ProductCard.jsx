import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function ProductCard({ product }) {
    const { addToCart } = useCart();
    const { id, name, image, price, category } = product;
    const [imageError, setImageError] = useState(false);

    // Fallback image handling
    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div className="border rounded-lg overflow-hidden shadow-md bg-white">
            <Link to={`/products/${id}`} className="block h-48 overflow-hidden bg-gray-100">
                {imageError ? (
                    <div className="w-full h-48 flex items-center justify-center bg-gray-200 text-gray-500">
                        {name}
                    </div>
                ) : (
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-48 object-cover"
                        onError={handleImageError}
                    />
                )}
            </Link>

            <div className="p-4">
                <Link to={`/products/${id}`}>
                    <h3 className="text-lg font-semibold mb-1">{name}</h3>
                </Link>
                <p className="text-gray-500 text-sm mb-2">{category}</p>
                <p className="text-gray-900 font-bold mb-3">${price.toFixed(2)}</p>

                <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700 w-full"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
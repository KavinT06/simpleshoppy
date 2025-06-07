import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products'; // Import the static data
import { useCart } from '../contexts/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        // Find the product from static data
        const foundProduct = products.find(p => p.id === parseInt(id));
        if (foundProduct) {
            setProduct(foundProduct);
        } else {
            setError('Product not found');
        }
        setLoading(false);
    }, [id]);

    const handleImageError = () => {
        setImageError(true);
    };

    if (loading) return <LoadingSpinner />;

    if (error || !product) {
        return (
            <div className="container mx-auto p-4">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <p>{error || 'Product not found'}</p>
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Back to Products
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/2 bg-gray-100">
                        {imageError ? (
                            <div className="w-full h-64 md:h-96 flex items-center justify-center bg-gray-200 text-gray-500 text-xl">
                                {product.name}
                            </div>
                        ) : (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-64 md:h-96 object-contain"
                                onError={handleImageError}
                            />
                        )}
                    </div>

                    <div className="p-6 md:w-1/2">
                        <div className="text-sm text-gray-500 mb-2">{product.category}</div>
                        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                        <div className="text-xl font-bold text-blue-600 mb-4">${product.price.toFixed(2)}</div>

                        <p className="text-gray-700 mb-6">{product.description}</p>

                        <button
                            onClick={() => addToCart(product)}
                            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <button
                    onClick={() => navigate('/')}
                    className="text-blue-600 hover:underline"
                >
                    &larr; Back to Products
                </button>
            </div>
        </div>
    );
}

export default ProductDetail;
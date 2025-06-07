import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function Cart() {
    const { cart, updateQuantity, removeFromCart, getTotal } = useCart();
    const [imageErrors, setImageErrors] = useState({});

    const handleImageError = (itemId) => {
        setImageErrors(prev => ({
            ...prev,
            [itemId]: true
        }));
    };

    if (cart.length === 0) {
        return (
            <div className="container mx-auto p-4 text-center">
                <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
                <div className="bg-gray-100 rounded-lg p-8">
                    <p className="mb-4">Your cart is empty.</p>
                    <Link
                        to="/"
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-left">Product</th>
                            <th className="py-3 px-4 text-center">Quantity</th>
                            <th className="py-3 px-4 text-right">Price</th>
                            <th className="py-3 px-4 text-right">Total</th>
                            <th className="py-3 px-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(item => (
                            <tr key={item.id} className="border-t">
                                <td className="py-4 px-4">
                                    <div className="flex items-center">
                                        {imageErrors[item.id] ? (
                                            <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-xs text-gray-500 mr-4">
                                                {item.name}
                                            </div>
                                        ) : (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover mr-4"
                                                onError={() => handleImageError(item.id)}
                                            />
                                        )}
                                        <div>
                                            <Link to={`/products/${item.id}`} className="text-blue-600 hover:underline">
                                                {item.name}
                                            </Link>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <div className="flex items-center justify-center">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="bg-gray-200 text-gray-700 px-2 rounded"
                                        >
                                            -
                                        </button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="bg-gray-200 text-gray-700 px-2 rounded"
                                        >
                                            +
                                        </button>
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-right">${item.price.toFixed(2)}</td>
                                <td className="py-4 px-4 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                                <td className="py-4 px-4 text-right">
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <Link
                    to="/"
                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 mb-4 md:mb-0"
                >
                    Continue Shopping
                </Link>

                <div className="bg-gray-100 p-4 rounded">
                    <div className="flex justify-between mb-2">
                        <span className="font-medium">Subtotal:</span>
                        <span>${getTotal().toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                        <span>Total:</span>
                        <span>${getTotal().toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className="text-right">
                <Link
                    to="/checkout"
                    className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
                >
                    Proceed to Checkout
                </Link>
            </div>
        </div>
    );
}

export default Cart;
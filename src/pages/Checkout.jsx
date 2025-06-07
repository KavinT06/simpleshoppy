import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';

function Checkout() {
    const navigate = useNavigate();
    const { cart, getTotal, clearCart } = useCart();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ success: false, error: null });

    // Redirect if cart is empty
    if (cart.length === 0 && !submitStatus.success) {
        navigate('/');
        return null;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));

        // Clear error for this field if user starts typing
        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: null
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Validate name
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        // Validate email
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Validate address
        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setLoading(true);
        
        try {
            // Simulate API call with a timeout
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            setSubmitStatus({ success: true, error: null });
            clearCart();
        } catch (err) {
            console.error('Error submitting order:', err);
            setSubmitStatus({ 
                success: false, 
                error: 'There was a problem processing your order. Please try again.' 
            });
        } finally {
            setLoading(false);
        }
    };

    if (submitStatus.success) {
        return (
            <div className="container mx-auto p-4">
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                    <p className="font-bold">Order Placed Successfully!</p>
                    <p>Thank you for your purchase.</p>
                </div>

                <button
                    onClick={() => navigate('/')}
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>

            {submitStatus.error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    <p>{submitStatus.error}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.name && <p className="text-red-500 mt-1 text-sm">{errors.name}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email}</p>}
                        </div>

                        <div className="mb-6">
                            <label htmlFor="address" className="block text-gray-700 mb-2">Shipping Address</label>
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows="3"
                                className={`w-full p-2 border rounded ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                            ></textarea>
                            {errors.address && <p className="text-red-500 mt-1 text-sm">{errors.address}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 disabled:bg-blue-300 w-full"
                        >
                            {loading ? <LoadingSpinner /> : 'Place Order'}
                        </button>
                    </form>
                </div>

                <div className="bg-gray-50 p-6 rounded">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                    <div className="divide-y">
                        {cart.map(item => (
                            <div key={item.id} className="py-3 flex justify-between">
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-gray-500 text-sm">{item.quantity} x ${item.price.toFixed(2)}</p>
                                </div>
                                <p className="font-medium">${(item.quantity * item.price).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between font-bold">
                            <span>Total:</span>
                            <span>${getTotal().toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
import { useCart } from '../contexts/CartContext';

function Notification() {
    const { notification } = useCart();

    if (!notification.show) return null;

    return (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded shadow-lg z-50 animate-fade-in-out">
            {notification.message}
        </div>
    );
}

export default Notification;
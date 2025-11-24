
import React, { useState } from 'react';
import { useBooking } from '../context/CartContext';

const BookingPage: React.FC = () => {
    const { bookingItems, removeFromBooking, updateQuantity, bookingTotal } = useBooking();
    const [notification, setNotification] = useState<string | null>(null);

    const handleCheckout = () => {
        setNotification('Платежный шлюз не подключен. Оплата невозможна.');
        setTimeout(() => setNotification(null), 4000);
    };

    if (bookingItems.length === 0) {
        return (
            <div className="text-center py-20">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="mt-2 text-xl font-medium text-gray-900 dark:text-white">У вас пока нет бронирований</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Выберите тур из каталога, чтобы начать путешествие.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            {notification && (
                 <div className="fixed top-20 right-5 bg-yellow-500 text-black py-2 px-4 rounded-lg shadow-lg z-50">
                    {notification}
                </div>
            )}
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Ваши бронирования</h1>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 md:p-6">
                <div className="space-y-4">
                    {bookingItems.map(item => (
                        <div key={item.id} className="flex flex-col md:flex-row items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                            <div className="flex items-center mb-4 md:mb-0 flex-grow">
                                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4"/>
                                <div>
                                    <h3 className="font-semibold text-lg">{item.name}</h3>
                                    <p className="text-gray-500 dark:text-gray-400">{item.price.toLocaleString('ru-RU')} ₽ / чел.</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 md:space-x-4">
                                <div className="flex items-center border rounded-md">
                                     <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-lg font-bold hover:bg-gray-200 dark:hover:bg-gray-700 rounded-l-md transition-colors">-</button>
                                     <span className="px-4 py-1 w-12 text-center" title="Количество человек">{item.quantity}</span>
                                     <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-lg font-bold hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-md transition-colors">+</button>
                                </div>
                                <p className="font-semibold w-32 text-right text-lg">{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</p>
                                 <button onClick={() => removeFromBooking(item.id)} className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                 </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 flex flex-col items-end">
                    <p className="text-2xl font-bold">Итого: {bookingTotal.toLocaleString('ru-RU')} ₽</p>
                    <button 
                        onClick={handleCheckout}
                        className="mt-4 px-6 py-3 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                    >
                        Перейти к оплате
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;

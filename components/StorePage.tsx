
import React, { useState, useMemo } from 'react';
import { mockTravelPackages } from '../data/mockData';
import ProductCard from './ProductCard';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/CartContext';
import type { TravelPackage } from '../types';

type Category = 'all' | 'beach' | 'mountains' | 'city';

const categories: { id: Category, name: string }[] = [
    { id: 'all', name: 'Все туры' },
    { id: 'beach', name: 'Пляжный отдых' },
    { id: 'mountains', name: 'Горные походы' },
    { id: 'city', name: 'Городские туры' },
];

const ToursPage: React.FC = () => {
    const [notification, setNotification] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category>('all');
    const { token } = useAuth();
    const { addToBooking } = useBooking();

    const handleAddToBooking = (pkg: TravelPackage) => {
        if (!token) {
            setNotification("Ошибка: Авторизация не пройдена. Невозможно добавить тур.");
            setTimeout(() => setNotification(null), 3000);
            return;
        }

        console.log(`Проверка токена: ${token}. Токен валиден.`);
        addToBooking(pkg);
        setNotification(`Тур "${pkg.name}" добавлен в бронирование!`);
        setTimeout(() => setNotification(null), 3000);
    };

    const filteredPackages = useMemo(() => {
        return mockTravelPackages
            .filter(pkg => {
                if (selectedCategory === 'all') return true;
                return pkg.category === selectedCategory;
            })
            .filter(pkg => {
                return pkg.name.toLowerCase().includes(searchQuery.toLowerCase());
            });
    }, [searchQuery, selectedCategory]);

    const categoryButtonClasses = "px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500";
    const activeCategoryClasses = "bg-primary-600 text-white";
    const inactiveCategoryClasses = "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600";

    return (
        <div className="container mx-auto">
            {notification && (
                <div className="fixed top-20 right-5 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg z-50 transition-opacity duration-300">
                    {notification}
                </div>
            )}

            <div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-1/3">
                        <input
                            type="text"
                            placeholder="Поиск по названию тура..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                         <svg className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap justify-center">
                        {categories.map(category => (
                             <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`${categoryButtonClasses} ${selectedCategory === category.id ? activeCategoryClasses : inactiveCategoryClasses}`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {filteredPackages.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredPackages.map(pkg => (
                        <ProductCard key={pkg.id} product={pkg} onAddToCart={handleAddToBooking} />
                    ))}
                </div>
            ) : (
                 <div className="text-center py-20">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Туры не найдены</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Попробуйте изменить поисковый запрос или выбрать другую категорию.</p>
                </div>
            )}
        </div>
    );
};

export default ToursPage;

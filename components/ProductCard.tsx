
import React from 'react';
import type { TravelPackage } from '../types';

interface TravelPackageCardProps {
    product: TravelPackage;
    onAddToCart: (product: TravelPackage) => void;
}

const TravelPackageCard: React.FC<TravelPackageCardProps> = ({ product, onAddToCart }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img className="w-full h-56 object-cover" src={product.imageUrl} alt={product.name} />
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 h-14">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 h-12">{product.description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary-500">{product.price.toLocaleString('ru-RU')} ₽</span>
                    <button 
                        onClick={() => onAddToCart(product)}
                        className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                    >
                        Забронировать
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TravelPackageCard;


import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/CartContext';

interface NavbarProps {
    currentPage: 'tours' | 'profile' | 'booking';
    setPage: (page: 'tours' | 'profile' | 'booking') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setPage }) => {
    const { user, logout } = useAuth();
    const { bookingCount } = useBooking();

    const navItemClasses = "px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors duration-200";
    const activeClasses = "bg-primary-600 text-white";
    const inactiveClasses = "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700";

    return (
        <nav className="bg-white dark:bg-gray-800 shadow sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                             <svg className="h-8 w-8 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 10V7m0 0L5.447 4.276A1 1 0 003 5.17v13.66a1 1 0 001.447.894L9 17m6-10v10" />
                            </svg>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <a
                                    onClick={() => setPage('tours')}
                                    className={`${navItemClasses} ${currentPage === 'tours' ? activeClasses : inactiveClasses}`}
                                >
                                    Туры
                                </a>
                                <a
                                    onClick={() => setPage('profile')}
                                    className={`${navItemClasses} ${currentPage === 'profile' ? activeClasses : inactiveClasses}`}
                                >
                                    Профиль и Токены
                                </a>
                                <a
                                    onClick={() => setPage('booking')}
                                    className={`${navItemClasses} ${currentPage === 'booking' ? activeClasses : inactiveClasses} relative`}
                                >
                                    Бронирование
                                    {bookingCount > 0 && (
                                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">{bookingCount}</span>
                                    )}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                             <span className="text-gray-600 dark:text-gray-400 text-sm mr-4">
                                Здравствуйте, <strong>{user?.login}</strong>
                            </span>
                            <button
                                onClick={logout}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            >
                                Выйти
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

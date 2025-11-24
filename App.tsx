
import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BookingProvider } from './context/CartContext';
import LoginPage from './components/LoginPage';
import StorePage from './components/StorePage';
import ProfilePage from './components/ProfilePage';
import Navbar from './components/Navbar';
import CartPage from './components/CartPage';

type Page = 'tours' | 'profile' | 'booking';

const AppContent: React.FC = () => {
    const { user } = useAuth();
    const [page, setPage] = React.useState<Page>('tours');

    if (!user) {
        return <LoginPage />;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Navbar currentPage={page} setPage={setPage} />
            <main className="p-4 sm:p-6 lg:p-8">
                {page === 'tours' && <StorePage />}
                {page === 'profile' && <ProfilePage />}
                {page === 'booking' && <CartPage />}
            </main>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <BookingProvider>
                <AppContent />
            </BookingProvider>
        </AuthProvider>
    );
};

export default App;


import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { TravelPackage, BookingItem } from '../types';

interface BookingContextType {
    bookingItems: BookingItem[];
    addToBooking: (pkg: TravelPackage) => void;
    removeFromBooking: (pkgId: number) => void;
    updateQuantity: (pkgId: number, quantity: number) => void;
    clearBooking: () => void;
    bookingTotal: number;
    bookingCount: number;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [bookingItems, setBookingItems] = useState<BookingItem[]>([]);

    const addToBooking = (pkg: TravelPackage) => {
        setBookingItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === pkg.id);
            if (existingItem) {
                // For travel packages, typically quantity is 1, but we'll allow it for multiple people/rooms
                return prevItems.map(item =>
                    item.id === pkg.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...pkg, quantity: 1 }];
        });
    };

    const removeFromBooking = (pkgId: number) => {
        setBookingItems(prevItems => prevItems.filter(item => item.id !== pkgId));
    };

    const updateQuantity = (pkgId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromBooking(pkgId);
        } else {
            setBookingItems(prevItems =>
                prevItems.map(item =>
                    item.id === pkgId ? { ...item, quantity } : item
                )
            );
        }
    };

    const clearBooking = () => {
        setBookingItems([]);
    };

    const bookingTotal = bookingItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const bookingCount = bookingItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <BookingContext.Provider value={{ bookingItems, addToBooking, removeFromBooking, updateQuantity, clearBooking, bookingTotal, bookingCount }}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = (): BookingContextType => {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
};

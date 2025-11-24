
export interface User {
    userId: number;
    login: string;
    passwordHash: string; // In a real app, this would never be on the client
    email: string | null;
    phoneNumber: string | null;
    accountStatus: string | null;
}

export interface AuthSession {
    sessionId: number;
    userId: number;
    creationTime: string;
    sessionStatus: string | null;
    ipAddress: string | null;
}

export interface AccessToken {
    userId: number;
    channelType: string;
    name: string | null;
    status: string | null;
    generationTime: string | null;
}

export interface AuthLog {
    tokenId: number;
    userId: number;
    channelId: number | null;
    tokenValue: string | null;
    generationTime: string | null;
    expiryTime: string | null;
}

export interface TravelPackage {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: 'beach' | 'mountains' | 'city';
}

export interface BookingItem extends TravelPackage {
  quantity: number;
}


import type { User, AuthSession, AccessToken, AuthLog, TravelPackage } from '../types';

export const mockUsers: User[] = [
    {
        userId: 1,
        login: 'user',
        passwordHash: '123', // Plaintext for demo purposes. DO NOT DO THIS IN PRODUCTION.
        email: 'testuser@example.com',
        phoneNumber: '+79991234567',
        accountStatus: 'Активен',
    },
];

export const mockSessions: AuthSession[] = [
    {
        sessionId: 101,
        userId: 1,
        creationTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        sessionStatus: 'Активна',
        ipAddress: '192.168.1.1',
    },
    {
        sessionId: 102,
        userId: 1,
        creationTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        sessionStatus: 'Завершена',
        ipAddress: '8.8.8.8',
    },
];

export const mockTokens: AccessToken[] = [
    {
        userId: 1,
        channelType: 'WEB',
        name: 'Браузер Chrome на ПК',
        status: 'Активен',
        generationTime: new Date().toISOString(),
    },
    {
        userId: 1,
        channelType: 'MOBILE',
        name: 'Мобильное приложение Android',
        status: 'Неактивен',
        generationTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
];

export const mockAuthLogs: AuthLog[] = [
    {
        tokenId: 1001,
        userId: 1,
        channelId: 1,
        tokenValue: 'WEB...xyz',
        generationTime: new Date().toISOString(),
        expiryTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        tokenId: 1002,
        userId: 1,
        channelId: 2,
        tokenValue: 'MOB...abc',
        generationTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        expiryTime: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    },
];

const generateTravelPackages = (): TravelPackage[] => {
    const packages: TravelPackage[] = [];
    let idCounter = 1;

    const beachDestinations = ['Мальдивы', 'Бора-Бора', 'Бали', 'Сейшелы'];
    const beachTypes = ['Все включено', 'Тропический рай', 'Лагуна Блю', 'Сансет'];
    for (let i = 1; i <= 20; i++) {
        const currentId = idCounter++;
        packages.push({
            id: currentId,
            name: `Тур на ${beachDestinations[i % 4]}: ${beachTypes[Math.floor(i/4) % 4]}`,
            price: 120000 + Math.floor(Math.random() * 250000),
            imageUrl: `https://picsum.photos/seed/${currentId}_beach/400/400`,
            description: 'Незабываемый отдых на лучших пляжах мира с кристально чистой водой.',
            category: 'beach',
        });
    }

    const mountainDestinations = ['Альпы', 'Гималаи', 'Кавказ', 'Анды'];
    const mountainTypes = ['Восхождение', 'Треккинг', 'Лыжный курорт', 'Эко-тур'];
    for (let i = 1; i <= 20; i++) {
        const currentId = idCounter++;
        packages.push({
            id: currentId,
            name: `Поход в ${mountainDestinations[i % 4]}: ${mountainTypes[Math.floor(i/4) % 4]}`,
            price: 80000 + Math.floor(Math.random() * 150000),
            imageUrl: `https://picsum.photos/seed/${currentId}_mountain/400/400`,
            description: 'Покорите величественные вершины и насладитесь захватывающими видами.',
            category: 'mountains',
        });
    }
    
    const cityDestinations = ['Париж', 'Рим', 'Токио', 'Нью-Йорк'];
    const cityTypes = ['Романтический уикенд', 'Историческое наследие', 'Мегаполис', 'Гастро-тур'];
    for (let i = 1; i <= 20; i++) {
        const currentId = idCounter++;
        packages.push({
            id: currentId,
            name: `Тур в ${cityDestinations[i % 4]}: ${cityTypes[Math.floor(i/4) % 4]}`,
            price: 60000 + Math.floor(Math.random() * 100000),
            imageUrl: `https://picsum.photos/seed/${currentId}_city/400/400`,
            description: 'Погрузитесь в атмосферу самых знаменитых городов мира.',
            category: 'city',
        });
    }

    return packages;
}


export const mockTravelPackages: TravelPackage[] = generateTravelPackages();

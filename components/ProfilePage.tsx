
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { mockSessions, mockTokens, mockAuthLogs } from '../data/mockData';
import type { AuthSession, AccessToken, AuthLog } from '../types';

const InfoCard: React.FC = () => {
    const { user, token } = useAuth();

    if (!user) return null;

    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">Профиль пользователя (Пользователь)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                <p><strong>ID:</strong> {user.userId}</p>
                <p><strong>Логин:</strong> {user.login}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Телефон:</strong> {user.phoneNumber}</p>
                <p><strong>Статус:</strong> <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full dark:bg-green-700 dark:text-green-200">{user.accountStatus}</span></p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Текущий токен сессии:</strong></p>
                <p className="text-xs text-primary-500 dark:text-primary-400 break-all font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded-md">{token}</p>
            </div>
        </div>
    );
};

const DataTable = <T,>({ title, data, columns }: { title: string; data: T[]; columns: { key: keyof T; header: string }[] }) => {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">{title}</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            {columns.map(col => (
                                <th key={String(col.key)} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {data.map((item, index) => (
                            <tr key={index}>
                                {columns.map(col => (
                                    <td key={String(col.key)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                                        {String(item[col.key] ?? 'N/A')}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


const ProfilePage: React.FC = () => {
    const sessionColumns: { key: keyof AuthSession; header: string }[] = [
        { key: 'sessionId', header: 'ID Сессии' },
        { key: 'creationTime', header: 'Время Создания' },
        { key: 'sessionStatus', header: 'Статус' },
        { key: 'ipAddress', header: 'IP Адрес' },
    ];

    const tokenColumns: { key: keyof AccessToken; header: string }[] = [
        { key: 'channelType', header: 'Тип Канала' },
        { key: 'name', header: 'Название' },
        { key: 'status', header: 'Статус' },
        { key: 'generationTime', header: 'Время Генерации' },
    ];

    const logColumns: { key: keyof AuthLog; header: string }[] = [
        { key: 'tokenId', header: 'ID Токена' },
        { key: 'tokenValue', header: 'Значение Токена' },
        { key: 'generationTime', header: 'Время Генерации' },
        { key: 'expiryTime', header: 'Срок Действия' },
    ];

    return (
        <div className="container mx-auto">
            <InfoCard />
            <DataTable<AuthSession> title="Сессии аутентификации (Сессия_аутентификации)" data={mockSessions} columns={sessionColumns} />
            <DataTable<AccessToken> title="Токены доступа (Токен_доступа)" data={mockTokens} columns={tokenColumns} />
            <DataTable<AuthLog> title="Журнал авторизации (Журнал_авторизации)" data={mockAuthLogs} columns={logColumns} />
        </div>
    );
};

export default ProfilePage;

import axios from 'axios';
import type { Account, CreateAccountData, UpdateAccountData } from '../types';

const API_BASE = 'http://localhost:3001';

export async function getAccounts(): Promise<Account[]> {
    const response = await axios.get<Account[]>(`${API_BASE}/accounts`);
    return response.data;
}

export async function getAccount(id: number): Promise<Account> {
    const response = await axios.get<Account>(`${API_BASE}/accounts/${id}`);
    return response.data;
}

export async function createAccount(data: CreateAccountData): Promise<Account> {
    const response = await axios.post<Account>(`${API_BASE}/accounts`, data);
    return response.data;
}

export async function updateAccount(
    id: number,
    data: UpdateAccountData,
): Promise<Account> {
    const response = await axios.patch<Account>(
        `${API_BASE}/accounts/${id}`,
        data,
    );
    return response.data;
}

export async function deleteAccount(id: number): Promise<void> {
    await axios.delete(`${API_BASE}/accounts/${id}`);
}

export interface Account {
    id: number;
    name: string;
    branch?: string;
    balance: number;
}

export type CreateAccountData = Omit<Account, 'id'>;

export type UpdateAccountData = Partial<Omit<Account, 'id'>>;

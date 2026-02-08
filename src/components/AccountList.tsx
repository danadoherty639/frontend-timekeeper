import { useState } from 'react';
import type { Account } from '../types';
import { useAccounts } from '../hooks/useAccounts';

interface AccountListProps {
    selectedAccountId?: number;
    onSelectAccount: (account: Account) => void;
}

const AccountList = ({
    selectedAccountId,
    onSelectAccount,
}: AccountListProps) => {
    const {data : accounts, isLoading, error } = useAccounts();

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Accounts</h2>

            {!isLoading && accounts?.length === 0 ? (
                <p className="text-gray-500">No accounts found</p>
            ) : (
                <ul className="space-y-2">
                    {accounts?.map((account) => (
                        <li key={account.id}>
                            <button
                                onClick={() => onSelectAccount(account)}
                                className={`w-full text-left p-2 rounded ${
                                    selectedAccountId === account.id
                                        ? 'bg-blue-100'
                                        : 'hover:bg-gray-100'
                                }`}
                            >
                                {account.name}
                                {account.branch && ` - ${account.branch}`}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AccountList;

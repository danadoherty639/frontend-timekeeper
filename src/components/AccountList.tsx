import type { Account } from '../types';

interface AccountListProps {
    accounts: Account[];
    selectedAccountId?: number;
    onSelectAccount: (account: Account) => void;
}

const AccountList = ({
    accounts,
    selectedAccountId,
    onSelectAccount,
}: AccountListProps) => {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Accounts</h2>

            {accounts.length === 0 ? (
                <p className="text-gray-500">No accounts found</p>
            ) : (
                <ul className="space-y-2">
                    {accounts.map((account) => (
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

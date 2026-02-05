import type { Account } from './types';
import AccountList from './components/AccountList';
import AccountDetails from './components/AccountDetails';
import AccountForm from './components/AccountForm';
import TransactionForm from './components/TransactionForm';

const SAMPLE_ACCOUNTS: Account[] = [
    { id: 1, name: 'John Doe', branch: 'Downtown', balance: 1000 },
    { id: 2, name: 'Alice Smith', branch: 'Uptown', balance: 5000 },
    { id: 3, name: 'Bob Johnson', balance: 2500 },
];

const App = () => {
    const accounts: Account[] = SAMPLE_ACCOUNTS;
    const selectedAccount: Account | null = SAMPLE_ACCOUNTS[0];
    const showCreateForm = false;

    const handleSelectAccount = (account: Account) => {
        console.log('Selected account:', account);
    };

    const handleCreateAccount = (data: {
        name: string;
        branch?: string;
        balance: number;
    }) => {
        console.log('Create account:', data);
    };

    const handleDeposit = (amount: number) => {
        console.log('Deposit:', amount);
    };

    const handleWithdraw = (amount: number) => {
        console.log('Withdraw:', amount);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b px-6 py-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">TimeKeeper Bank</h1>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        + New Account
                    </button>
                </div>
            </header>

            <main className="flex">
                <aside className="w-64 bg-white border-r min-h-[calc(100vh-73px)] p-4">
                    <AccountList
                        accounts={accounts}
                        selectedAccountId={selectedAccount?.id}
                        onSelectAccount={handleSelectAccount}
                    />
                </aside>

                <section className="flex-1 p-6">
                    {showCreateForm ? (
                        <AccountForm
                            onSubmit={handleCreateAccount}
                            onCancel={() => {}}
                        />
                    ) : (
                        <div className="space-y-6">
                            <AccountDetails account={selectedAccount} />

                            {selectedAccount && (
                                <div className="border-t pt-6">
                                    <TransactionForm
                                        currentBalance={selectedAccount.balance}
                                        onDeposit={handleDeposit}
                                        onWithdraw={handleWithdraw}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default App;

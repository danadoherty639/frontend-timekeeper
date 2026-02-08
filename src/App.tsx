import { useState } from 'react';
import type { Account } from './types';
import AccountList from './components/AccountList';
import AccountDetails from './components/AccountDetails';
import AccountForm from './components/AccountForm';
import TransactionForm from './components/TransactionForm';
import { useAccount } from './hooks/useAccounts';



const App = () => {
    const [selectedAccount, setSelectedAccount] = useState<Account | undefined>()
    const [showCreateForm, setShowCreateAccountForm] = useState(false);
     const { data: account, isLoading } = useAccount(selectedAccount?.id as number);

    const handleSelectAccount = (account: Account) => {
        console.log('Selected account:', account);
        setSelectedAccount(account)
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b px-6 py-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">TimeKeeper Bank</h1>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => setShowCreateAccountForm(!showCreateForm)}>
                        + New Account
                    </button>
                </div>
            </header>

            <main className="flex">
                <aside className="w-64 bg-white border-r min-h-[calc(100vh-73px)] p-4">
                    <AccountList
                        selectedAccountId={selectedAccount?.id}
                        onSelectAccount={handleSelectAccount}
                    />
                </aside>

                <section className="flex-1 p-6">
                    {showCreateForm ? (
                        <AccountForm
                            // onSubmit={handleCreateAccount}
                            onSelectAccount={handleSelectAccount}
                            onCancel={() => setShowCreateAccountForm(!showCreateForm)}
                        />
                    ) : (
                        <div className="space-y-6">
                            <AccountDetails account={account}  onClearSelection={() => setSelectedAccount(undefined)}/>

                            {selectedAccount && (
                                <div className="border-t pt-6">
                                    <TransactionForm
                                        selectedAccountId={selectedAccount.id}
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

import type { Account } from '../types';
import { useDeleteAccount } from '../hooks/useAccounts';
import toast from 'react-hot-toast';

interface AccountDetailsProps {
    account: Account | undefined;
    onClearSelection: () => void;
}

const AccountDetails = ({ account, onClearSelection }: AccountDetailsProps) => {
    const deleteAccount = useDeleteAccount();
    if (!account) {
        return (
            <div className="text-gray-500">
                Select an account to view details
            </div>
        );
    }

    const handleDeleteAccount = (id: number) => {
        deleteAccount.mutate(id, {
            onSuccess: () => {
                onClearSelection()
            },
            onError: (error) => {
                toast.error(`Failed to delete account: ${error.message}`)
            }
        })
    }

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Account Details</h2>
               <button className="fixed right-0 mr-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={() => handleDeleteAccount(account.id)}>Delete Account</button>
            <div className="space-y-2">
                <p>
                    <span className="font-medium">Name:</span> {account.name}
                </p>
                <p>
                    <span className="font-medium">Branch:</span>{' '}
                    {account.branch || 'N/A'}
                </p>
                <p>
                    <span className="font-medium">Balance:</span> £
                    {account.balance.toFixed(2)}
                </p>
            </div>
        </div>
    );
};

export default AccountDetails;

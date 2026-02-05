import type { Account } from '../types';

interface AccountDetailsProps {
    account: Account | null;
}

const AccountDetails = ({ account }: AccountDetailsProps) => {
    if (!account) {
        return (
            <div className="text-gray-500">
                Select an account to view details
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Account Details</h2>

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

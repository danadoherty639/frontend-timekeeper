import { useState } from "react";
import { UpdateAccountData } from "../types";
import { useAccount, useUpdateAccount } from "../hooks/useAccounts";

interface TransactionFormProps {
    selectedAccountId: number;
}

const TransactionForm = ({
    selectedAccountId,
}: TransactionFormProps) => {
    const [amount, setAmount] = useState('')
    const updateAccount = useUpdateAccount();
     const { data: account, isLoading } = useAccount(selectedAccountId);
    
    if (isLoading) return <div>Loading...</div>;
    if (!account) return null;

    const handleDeposit = () => {

        const updatedAccount : UpdateAccountData = {
            balance: account.balance + parseInt(amount)
        }

        updateAccount.mutate(({ id: selectedAccountId, data: updatedAccount}), {
            onSuccess: () => {
                setAmount('')
            }
        });
    };

    const handleWithdraw = () => {
        const updatedAccount : UpdateAccountData = {
            balance: account.balance - parseInt(amount)
        }

           updateAccount.mutate(({ id: selectedAccountId, data: updatedAccount}), {
            onSuccess: () => {
                setAmount('')
            }
        });
    };

    return (
        <div>
            <h3 className="text-md font-semibold mb-3">Make a Transaction</h3>

            <p className="text-sm text-gray-600 mb-3">
                Current Balance: £{account.balance.toFixed(2)}
            </p>

            <div className="space-y-3">
                <div>
                    <label
                        htmlFor="amount"
                        className="block text-sm font-medium mb-1"
                    >
                        Amount
                    </label>
                    <input
                        type="number"
                        id="amount"
                        min="0.01"
                        step="0.01"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full border rounded p-2"
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={handleDeposit}
                        className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Deposit
                    </button>
                    <button
                        type="button"
                        onClick={handleWithdraw}
                        className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Withdraw
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionForm;

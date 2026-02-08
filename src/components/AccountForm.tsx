import { useState } from "react";
import { useCreateAccount } from "../hooks/useAccounts";
import { Account, CreateAccountData } from "../types";
import toast from "react-hot-toast";

interface AccountFormProps {
    onSelectAccount: (account: Account ) => void;
    onCancel?: () => void;
}

const AccountForm = ({ onSelectAccount,onCancel }:  AccountFormProps) => {
    const [name, setName] = useState('')
    const [branch, setBranch] = useState('')
    const [balance, setBalance] = useState('')
    const [nameValidationError, setNameValidationError] = useState('')
    const [balanceValidationError, setBalanceValidationError] = useState('')
    const createAccount = useCreateAccount()

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();

        console.log('hanlde submit', balance)
        if (!name.trim()) {
            setNameValidationError('Name is required');
            return;
        }

        if (!balance || parseFloat(balance) < 0) {
            setBalanceValidationError('Balance must be a positive number');
            return;
        }
        const account : CreateAccountData = {
            name,
            branch,
            balance: parseFloat(balance)
        }
        createAccount.mutate({data: account}, {
            onSuccess: (newAccount) => {
                setName('')
                setBranch('')
                setBalance('')
                setNameValidationError('')
                setBalanceValidationError('')

                onCancel?.()

                onSelectAccount(newAccount)
                toast.success('Accoubt created scuccessfully')

            },
            onError: (error) => {
                toast.error(`The following error occured: ${error.message}`)
            }
        })
    };

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4" data-testid="create-account-testId">Create Account</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-1"
                    >
                        Customer Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                            if(nameValidationError && e.target.value) {
                                setNameValidationError('');
                            }
                        }}
                        required
                        minLength={2}
                        className="w-full border rounded p-2"
                        data-testid="customer-name-testId"
                    />
                    {nameValidationError && (
                         <span className="bg-red-100">{nameValidationError}</span>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="branch"
                        className="block text-sm font-medium mb-1"
                    >
                        Branch (optional)
                    </label>
                    <input
                        type="text"
                        id="branch"
                        name="branch"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        className="w-full border rounded p-2"
                        data-testid="customer-branch-testId"
                    />
                </div>

                <div>
                    <label
                        htmlFor="balance"
                        className="block text-sm font-medium mb-1"
                    >
                        Initial Balance
                    </label>
                    <input
                        type="number"
                        id="balance"
                        name="balance"
                        value={balance}
                        onChange={(e) => {
                            setBalance(e.target.value)
                            if (balanceValidationError && e.target.value && parseFloat(e.target.value) >= 0) {
                                setBalanceValidationError('');
                            }
                        }}
                        min="0"
                        step="0.01"
                        defaultValue="0"
                        className="w-full border rounded p-2"
                        data-testid="customer-balance-testId"
                    />
                    {balanceValidationError && (
                            <span className="bg-red-100">{balanceValidationError}</span>
                    )}
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        disabled={createAccount.isPending}
                    >
                        {createAccount.isPending ? 'Creating Account' : 'Create Account'}
                    </button>
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="border px-4 py-2 rounded hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AccountForm;

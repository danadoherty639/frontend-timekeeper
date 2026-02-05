interface TransactionFormProps {
    currentBalance: number;
    onDeposit: (amount: number) => void;
    onWithdraw: (amount: number) => void;
}

const TransactionForm = ({
    currentBalance,
    onDeposit,
    onWithdraw,
}: TransactionFormProps) => {
    const handleDeposit = () => {
        onDeposit(0);
    };

    const handleWithdraw = () => {
        onWithdraw(0);
    };

    return (
        <div>
            <h3 className="text-md font-semibold mb-3">Make a Transaction</h3>

            <p className="text-sm text-gray-600 mb-3">
                Current Balance: £{currentBalance.toFixed(2)}
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

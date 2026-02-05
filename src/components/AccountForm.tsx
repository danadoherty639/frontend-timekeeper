interface AccountFormProps {
    onSubmit: (data: { name: string; branch?: string; balance: number }) => void;
    onCancel?: () => void;
}

const AccountForm = ({ onSubmit, onCancel }: AccountFormProps) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name: '', balance: 0 });
    };

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Create Account</h2>

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
                        required
                        className="w-full border rounded p-2"
                    />
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
                        className="w-full border rounded p-2"
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
                        min="0"
                        step="0.01"
                        defaultValue="0"
                        className="w-full border rounded p-2"
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Create Account
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

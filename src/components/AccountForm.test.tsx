import { describe, it, expect, vi, beforeEach, afterEach} from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AccountForm from './AccountForm';
import { useCreateAccount } from '../hooks/useAccounts';
import toast from 'react-hot-toast';

vi.mock('../hooks/useAccounts');
vi.mock('react-hot-toast');

const mockUseCreateAccount = useCreateAccount as ReturnType<typeof vi.fn>;
const mockToast = toast as any;

expect.extend(matchers);

describe('Account Form', () => {
    let queryClient: QueryClient;
    const mockOnSelectAccount = vi.fn();
    const mockOnCancel = vi.fn();
    const mockMutate = vi.fn();


    beforeEach(() => {
        queryClient = new QueryClient();

        vi.clearAllMocks();

        mockUseCreateAccount.mockReturnValue({
            mutate: mockMutate,
            isPending: false,
            isError: false,
            isSuccess: false,
            error: null
        } as any)
    });

    afterEach(() => {
        cleanup();
    });

    const renderAccountForm = (props = {}) => {
        return render(
               <QueryClientProvider client={queryClient}>
                <AccountForm
                    onSelectAccount={mockOnSelectAccount}
                    onCancel={mockOnCancel}
                    {...props}
                />
            </QueryClientProvider>
        );
    };

      it('renders account form with all fields', () => {
        renderAccountForm();

         expect(screen.getByTestId('create-account-testId')).toBeInTheDocument();
        expect(screen.getByTestId('customer-name-testId')).toBeInTheDocument();
        expect(screen.getByTestId('customer-branch-testId')).toBeInTheDocument();
        expect(screen.getByTestId('customer-branch-testId')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Create Account/i })).toBeInTheDocument();
    });

    it('updates input values when when user types', () => {
        renderAccountForm();

        const nameInput = screen.getByTestId('customer-name-testId') as HTMLInputElement;
        const branchInput = screen.getByTestId('customer-branch-testId') as HTMLInputElement;
        const balanceInput = screen.getByTestId('customer-balance-testId') as HTMLInputElement;

        fireEvent.change(nameInput, {target: {value: 'John Doe'}})
        fireEvent.change(branchInput, {target: {value: 'Downtown'}});
        fireEvent.change(balanceInput, {target: {value: 5000}});

        expect(nameInput.value).toBe('John Doe');
        expect(branchInput.value).toBe('Downtown');
        expect(balanceInput.value).toBe('5000');
    });

    it('submits form with correct data', () => {
        renderAccountForm();

        const nameInput = screen.getByTestId('customer-name-testId') as HTMLInputElement;
        const branchInput = screen.getByTestId('customer-branch-testId') as HTMLInputElement;
        const balanceInput = screen.getByTestId('customer-balance-testId') as HTMLInputElement;
        const submitButton = screen.getByRole('button', { name: /create account/i });

        fireEvent.change(nameInput, {target: {value: 'John Doe'}});
        fireEvent.change(branchInput, {target: {value: 'Downtown'}});
        fireEvent.change(balanceInput, {target: {value: '5000'}});
        fireEvent.click(submitButton);

        expect(mockMutate).toHaveBeenCalledWith(
            {
                data: {
                    name: 'John Doe',
                    branch: 'Downtown',
                    balance: 5000
                },
            },
            expect.objectContaining({
                onSuccess: expect.any(Function)
            })
        );
    });

    it('does not sumbit form when name is empty', () => {
        renderAccountForm();

        const submitButton = screen.getByRole('button', { name: /create account/i });
        const balanceInput = screen.getByTestId('customer-balance-testId') as HTMLInputElement;

        fireEvent.change(balanceInput, {target: { value: '5000'}});
        fireEvent.click(submitButton);

        expect(mockMutate).not.toHaveBeenCalled();
    })

})

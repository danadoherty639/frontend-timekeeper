import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Account, CreateAccountData, UpdateAccountData } from '../types';
import * as accountsApi from '../api/accounts';

export const useAccounts = () => {
    return useQuery({
        queryKey: ['accounts'],
        queryFn: accountsApi.getAccounts
    });
}

export const useAccount = (id: number) => {
    return useQuery({
        queryKey: ['account', id],
        queryFn: () => accountsApi.getAccount(id),
        enabled: !!id
    });
}

export const useCreateAccount = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({data}:{data: CreateAccountData}) => accountsApi.createAccount(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['accounts']});
        },
    });
}

export const useUpdateAccount = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, data} : {id: number, data: UpdateAccountData}) => accountsApi.updateAccount(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ['accounts']});
            queryClient.invalidateQueries({queryKey: ['account', variables.id]});
        },
    })
}

export const useDeleteAccount = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: accountsApi.deleteAccount,
        onSuccess: () => { 
            queryClient.invalidateQueries({queryKey: ['accounts']});
        },
    })
}


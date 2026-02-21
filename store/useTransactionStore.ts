import { addTransaction, deleteTransaction, fetchTransactions, TransactionInsert, TransactionUpdate, updateTransaction } from '@/api/supabase/TransactionsTable';
import { create } from 'zustand';

// Define the shape of a single transaction based on the DB schema
export interface Transaction {
    //비즈니스 로직 State
    id: string;
    user_id: string;
    amount: number;
    category: string;
    type: 'income' | 'expense';
    date: string;
    description: string | null;
    created_at: string;
    //시스템 로직 State
    _isTransactionsTableLoading: boolean;
    _error: string | null;
}

interface TransactionState {
    transactions: Transaction[];
}


interface TransactionActions {
    loadTransactions: () => Promise<void>;
    createNewTransaction: (transaction: Omit<TransactionInsert, 'user_id'>) => Promise<void>;
    editTransaction: (id: string, updates: TransactionUpdate) => Promise<void>;
    removeTransaction: (id: string) => Promise<void>;
    clearTransactions: () => void;
}

interface TransactionStore {
    State: TransactionState;
    Actions: TransactionActions;
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
    // State
    State: {
        // 비즈니스 로직 State
        transactions: [],
        // 시스템 로직 State
        _isTransactionsTableLoading: false,
        _error: null,
    },


    // Actions
    Actions: {
        loadTransactions: async () => {
            set((store) => ({ State: { ...store.State, _isTransactionsTableLoading: true, _error: null } }));
            try {
                const data = await fetchTransactions();
                set((store) => ({
                    State: { ...store.State, transactions: data as Transaction[], _isTransactionsTableLoading: false }
                }));
            } catch (error: any) {
                console.error("loadTransactions Error:", error);
                set((store) => ({ State: { ...store.State, _error: error.message, _isTransactionsTableLoading: false } }));
            }
        },

        createNewTransaction: async (transaction: Omit<TransactionInsert, 'user_id'>) => {
            set((store) => ({ State: { ...store.State, _isTransactionsTableLoading: true, _error: null } }));
            try {
                const newTx = await addTransaction(transaction);
                set((store) => ({
                    State: { ...store.State, transactions: [newTx as Transaction, ...store.State.transactions], _isTransactionsTableLoading: false }
                }));
            } catch (error: any) {
                console.error("createNewTransaction Error:", error);
                set((store) => ({ State: { ...store.State, _error: error.message, _isTransactionsTableLoading: false } }));
                throw error;
            }
        },

        editTransaction: async (id: string, updates: TransactionUpdate) => {
            set((store) => ({ State: { ...store.State, _isTransactionsTableLoading: true, _error: null } }));
            try {
                const updatedTx = await updateTransaction(id, updates);
                set((store) => ({
                    State: {
                        ...store.State,
                        transactions: store.State.transactions.map(tx =>
                            tx.id === id ? (updatedTx as Transaction) : tx
                        ),
                        _isTransactionsTableLoading: false
                    }
                }));
            } catch (error: any) {
                console.error("editTransaction Error:", error);
                set((store) => ({ State: { ...store.State, _error: error.message, _isTransactionsTableLoading: false } }));
                throw error;
            }
        },

        removeTransaction: async (id: string) => {
            set((store) => ({ State: { ...store.State, _isTransactionsTableLoading: true, _error: null } }));
            try {
                await deleteTransaction(id);
                set((store) => ({
                    State: {
                        ...store.State,
                        transactions: store.State.transactions.filter(tx => tx.id !== id),
                        _isTransactionsTableLoading: false
                    }
                }));
            } catch (error: any) {
                console.error("removeTransaction Error:", error);
                set((store) => ({ State: { ...store.State, _error: error.message, _isTransactionsTableLoading: false } }));
                throw error;
            }
        },

        clearTransactions: () => {
            set((store) => ({
                State: { ...store.State, transactions: [], _error: null }
            }));
        }
    }
}));

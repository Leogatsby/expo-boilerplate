import { supabase } from './Config';

export interface TransactionInsert {
    user_id: string;
    amount: number;
    category: string;
    type: 'income' | 'expense';
    date?: string;
    description?: string;
}

export interface TransactionUpdate {
    amount?: number;
    category?: string;
    type?: 'income' | 'expense';
    date?: string;
    description?: string;
}

// Fetch all transactions for the current user
export const fetchTransactions = async () => {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error('User not authenticated');

    console.log(`[Supabase DB] Fetching transactions for user_id: ${user.id}`);
    const { data, error } = await supabase
        .from('TransactionsTable')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

    if (error) {
        console.error(`[Supabase DB] Failed to fetch transactions:`, error.message);
        throw error;
    }
    return data;
};

// Add a new transaction
export const addTransaction = async (transaction: Omit<TransactionInsert, 'user_id'>) => {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error('User not authenticated');

    console.log(`[Supabase DB] Adding transaction for user:`, transaction);
    const { data, error } = await supabase
        .from('TransactionsTable')
        .insert([{ ...transaction, user_id: user.id }])
        .select()
        .single();

    if (error) {
        console.error(`[Supabase DB] Failed to add transaction:`, error.message);
        throw error;
    }
    return data;
};

// Update an existing transaction
export const updateTransaction = async (id: string, updates: TransactionUpdate) => {
    console.log(`[Supabase DB] Updating transaction ${id} with:`, updates);
    const { data, error } = await supabase
        .from('TransactionsTable')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error(`[Supabase DB] Failed to update transaction:`, error.message);
        throw error;
    }
    return data;
};

// Delete a transaction
export const deleteTransaction = async (id: string) => {
    console.log(`[Supabase DB] Deleting transaction ${id}`);
    const { error } = await supabase
        .from('TransactionsTable')
        .delete()
        .eq('id', id);

    if (error) {
        console.error(`[Supabase DB] Failed to delete transaction:`, error.message);
        throw error;
    }
    return true;
};

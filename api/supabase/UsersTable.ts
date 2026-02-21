import { supabase } from './Config';

export interface UserProfileUpdate {
    avatar_url?: string;
    // 추후 추가될 컬럼들
}

// Fetch user profile
export const fetchUserProfile = async (userId: string) => {
    console.log(`[Supabase DB] Fetching user profile for: ${userId}`);
    const { data, error } = await supabase
        .from('UsersTable')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) {
        console.error(`[Supabase DB] Failed to fetch user profile:`, error.message);
        throw error;
    }
    return data;
};

// Update user profile
export const updateUserProfile = async (userId: string, updates: UserProfileUpdate) => {
    console.log(`[Supabase DB] Updating user profile ${userId} with:`, updates);
    const { data, error } = await supabase
        .from('UsersTable')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

    if (error) {
        console.error(`[Supabase DB] Failed to update user profile:`, error.message);
        throw error;
    }
    return data;
};

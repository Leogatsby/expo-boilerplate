import { supabase } from './Config';

/**
 * EMAIL AUTHENTICATION
 */

// Sign up a new user with email
export const signUpWithEmail = async (email: string, password: string) => {
    console.log(`[Supabase Auth] Attempting sign up for: ${email}`);
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });
    if (error) {
        console.error(`[Supabase Auth] Sign up failed:`, error.message);
        throw error;
    }
    console.log(`[Supabase Auth] Sign up successful for: ${email}`);
    return data;
};

// Sign in an existing user with email
export const signInWithEmail = async (email: string, password: string) => {
    console.log(`[Supabase Auth] Attempting sign in for: ${email}`);
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) {
        console.error(`[Supabase Auth] Sign in failed:`, error.message);
        throw error;
    }
    console.log(`[Supabase Auth] Sign in successful for: ${email}`);
    return data;
};

/**
 * SOCIAL & PHONE AUTHENTICATION (PLACEHOLDERS)
 */

// Sign in with Google (OAuth)
export const signInWithGoogle = async () => {
    console.log(`[Supabase Auth] Google sign in placeholder`);
    // Example: await supabase.auth.signInWithOAuth({ provider: 'google' })
    throw new Error('Google sign in not implemented yet.');
};

// Sign in with Apple (OAuth)
export const signInWithApple = async () => {
    console.log(`[Supabase Auth] Apple sign in placeholder`);
    // Example: await supabase.auth.signInWithOAuth({ provider: 'apple' })
    throw new Error('Apple sign in not implemented yet.');
};

// Sign in with Kakao (OAuth)
export const signInWithKakao = async () => {
    console.log(`[Supabase Auth] Kakao sign in placeholder`);
    // Example: await supabase.auth.signInWithOAuth({ provider: 'kakao' })
    throw new Error('Kakao sign in not implemented yet.');
};

// Sign in with Phone (OTP)
export const signInWithPhone = async (phone: string) => {
    console.log(`[Supabase Auth] Phone sign in placeholder for: ${phone}`);
    // Example: await supabase.auth.signInWithOtp({ phone })
    throw new Error('Phone auth not implemented yet.');
};

/**
 * SESSION MANAGEMENT
 */

// Sign out the current user
export const signOut = async () => {
    console.log(`[Supabase Auth] Attempting sign out`);
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error(`[Supabase Auth] Sign out failed:`, error.message);
        throw error;
    }
    console.log(`[Supabase Auth] Sign out successful`);
};

// Get the currently authenticated user
export const getCurrentUser = async () => {
    console.log(`[Supabase Auth] Fetching current user...`);
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
        console.error(`[Supabase Auth] Failed to fetch user:`, error.message);
        throw error;
    }
    console.log(`[Supabase Auth] Current user fetched:`, user ? user.email : 'No user logged in');
    return user;
};

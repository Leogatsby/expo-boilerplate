//1-0)시스템로직_라우팅
import { Alert } from 'react-native';
//2.데이터바인딩 로직_zustand
import { create } from 'zustand';
//2.데이터바인딩 로직_supabase 설정,Auth
//2-1)수퍼베이스 인스턴스
import { supabase } from '@/api/supabase/Config';
//2-2)수퍼베이스 Auth
import { signOut as authSignOut, signInWithEmail, signUpWithEmail } from '@/api/supabase/Auth';
//2-3)UserStore
import { useUserStore } from '@/store/useUserStore';


//인터페이스_스토어 (스토어에는 상태와 행동이 들어갑니다.)
interface AuthStore {
    State: AuthState;
    Actions: AuthActions;
}
//인터페이스_States (Domain Data)
interface AuthState {
    // 비즈니스 로직 State
    isLoggedIn: boolean;
    hasOnbordingDone: boolean;
    userSession: any | null; // Stores the Supabase session/auth user object
    // 시스템 로직 State
    _isAuthLoading: boolean;
    _error: string | null;
}
//인터페이스_Actions
interface AuthActions {
    // Auth Actions
    loginWithEmail: (email: string, password: string) => Promise<void>;
    registerWithEmail: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    // UI Actions
    onBoardingDone: () => void;
    // Session Management
    initializeAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    //State (Domain Data)
    State: {
        // 비즈니스 로직 State
        isLoggedIn: false,
        hasOnbordingDone: false,
        userSession: null,
        // 시스템 로직 State
        _isAuthLoading: false,
        _error: null,
    },

    //Actions
    Actions: {
        loginWithEmail: async (email, password) => {
            set((store) => ({ State: { ...store.State, _isAuthLoading: true, _error: null } }));
            try {
                const data = await signInWithEmail(email, password);
                set((store) => ({
                    State: { ...store.State, isLoggedIn: true, userSession: data.user, _isAuthLoading: false }
                }));
                if (data.user) {
                    useUserStore.getState().Actions.fetchProfile(data.user.id);
                }
            } catch (error: any) {
                console.error("Login Error in Store:", error);
                set((store) => ({ State: { ...store.State, _error: error.message, _isAuthLoading: false } }));
                Alert.alert("로그인 실패", error.message || "이메일 또는 비밀번호를 확인해주세요.");
                throw error; // Re-throw to allow component to stop loading state if needed
            }
        },

        registerWithEmail: async (email, password) => {
            set((store) => ({ State: { ...store.State, _isAuthLoading: true, _error: null } }));
            try {
                const data = await signUpWithEmail(email, password);
                // After successful registration, we can automatically log them in
                // Or just alert them to verify email if you turned that back on
                set((store) => ({
                    State: { ...store.State, isLoggedIn: true, userSession: data.user, _isAuthLoading: false }
                }));
                if (data.user) {
                    useUserStore.getState().Actions.fetchProfile(data.user.id);
                }
                Alert.alert("가입 성공", "회원가입이 완료되었습니다.");
            } catch (error: any) {
                console.error("Register Error in Store:", error);
                set((store) => ({ State: { ...store.State, _error: error.message, _isAuthLoading: false } }));
                Alert.alert("가입 실패", error.message || "오류가 발생했습니다.");
                throw error;
            }
        },

        logout: async () => {
            set((store) => ({ State: { ...store.State, _isAuthLoading: true, _error: null } }));
            try {
                await authSignOut();
                set((store) => ({
                    State: { ...store.State, isLoggedIn: false, userSession: null, _isAuthLoading: false }
                }));
                useUserStore.getState().Actions.clearProfile();
            } catch (error: any) {
                console.error("Logout Error:", error);
                set((store) => ({ State: { ...store.State, _error: error.message, _isAuthLoading: false } }));
            }
        },

        onBoardingDone: () => set((store) => ({ State: { ...store.State, hasOnbordingDone: true } })),

        // Call this once when the app starts layout to listen for Supabase session changes
        initializeAuth: () => {
            supabase.auth.onAuthStateChange((event, session) => {
                console.log(`[Supabase Auth Event 시작!] ${event}`);
                if (session?.user) {
                    set((store) => ({ State: { ...store.State, isLoggedIn: true, userSession: session.user } }));
                    useUserStore.getState().Actions.fetchProfile(session.user.id);
                } else {
                    set((store) => ({ State: { ...store.State, isLoggedIn: false, userSession: null } }));
                    useUserStore.getState().Actions.clearProfile();
                }
            });
        }
    }
}));

import { create } from 'zustand';

interface AuthState {
    isLoggedIn: boolean;
    hasOnbordingDone: boolean;
    login: () => void;
    logout: () => void;
    onBoardingDone: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: false,
    hasOnbordingDone: true,
    login: () => set({ isLoggedIn: true }),
    logout: () => set({ isLoggedIn: false }),
    onBoardingDone: () => set({ hasOnbordingDone: true }),
}));

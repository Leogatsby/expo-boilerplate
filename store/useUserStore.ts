//1-0)시스템로직_라우팅
//1-1)퍼블리싱로직_기초엘리먼트 퍼블리싱
//1-2)퍼블리싱로직_콤포넌트UI
//2.데이터바인딩 로직_zustand
import { create } from 'zustand';
//2.데이터바인딩 로직_supabase 설정,Auth
import { supabase } from '@/api/supabase/Config';



//인터페이스_States (Domain Data)
interface UserState {
    // 비즈니스 로직 State
    id: string | null; // auth.users UUID와 매핑
    email: string | null;
    avatar_url: string | null;
    // 시스템 로직 State
    _isUsersTableLoading: boolean;
}

//인터페이스_Actions
interface UserActions {
    fetchProfile: (userId: string) => Promise<void>;
    clearProfile: () => void;
}

//인터페이스_스토어 (스토어에는 상태와 행동이 들어갑니다.)
interface UserStore {
    State: UserState;
    Actions: UserActions;
}

export const useUserStore = create<UserStore>((set) => ({
    //State (Domain Data)
    State: {
        // 비즈니스 로직 State
        id: null,
        email: null,
        avatar_url: null,
        // 시스템 로직 State
        _isUsersTableLoading: false,
    },

    //Actions
    Actions: {
        fetchProfile: async (userId: string) => {
            set((store) => ({ State: { ...store.State, _isUsersTableLoading: true } }));
            try {
                // Supabase의 UsersTable 테이블에서 데이터를 가져옵니다.
                const { data, error } = await supabase
                    .from('UsersTable')
                    .select('*')
                    .eq('id', userId)
                    .single();

                if (error) {
                    throw error;
                }

                set((store) => ({
                    State: {
                        ...store.State,
                        id: data.id,
                        email: data.email,
                        avatar_url: data.avatar_url,
                        _isUsersTableLoading: false
                    }
                }));
            } catch (error) {
                console.error("fetchProfile Error:", error);
                set((store) => ({ State: { ...store.State, _isUsersTableLoading: false } }));
            }
        },

        clearProfile: () => {
            set((store) => ({
                State: {
                    ...store.State,
                    id: null,
                    email: null,
                    avatar_url: null,
                }
            }));
        }
    }
}));

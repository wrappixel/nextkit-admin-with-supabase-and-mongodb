"use client";
import { createContext, useEffect, useReducer, ReactNode } from 'react';
import { useRouter } from 'next/navigation'; 
import { supabase } from '@/app/guards/supabase/supabaseClient';

interface InitialStateType {
    isAuthenticated: boolean;
    isInitialized: boolean;
    user: any | null;
    platform: 'Supabase' | null;
}

const initialState: InitialStateType = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
    platform: 'Supabase',
};

const reducer = (state: InitialStateType, action: any) => {
    switch (action.type) {
        case 'AUTH_STATE_CHANGED':
            return { ...state, ...action.payload, isInitialized: true };
        case 'SET_PLATFORM':
            return { ...state, platform: action.payload };
        default:
            return state;
    }
};

const AuthContext = createContext<any | null>({
    ...initialState,
    signup: () => Promise.resolve(),
    signin: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    setPlatform: () => {},
    loginWithProvider: () => Promise.resolve(),
    loginWithSupabase: () => Promise.resolve(),
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const router = useRouter(); 

    const setPlatform = (platform: 'Supabase') => {
        dispatch({ type: 'SET_PLATFORM', payload: platform });
    };

    useEffect(() => {
        if (state.platform === 'Supabase') {
            const restoreSession = async () => {
                const { data: { session } } = await supabase.auth.getSession();
                if (session?.user) {
                    const fullName = session.user.user_metadata?.full_name || session.user.email;
                    dispatch({
                        type: 'AUTH_STATE_CHANGED',
                        payload: {
                            isAuthenticated: true,
                            user: {
                                id: session.user.id,
                                email: session.user.email,
                                displayName: fullName,
                            },
                            platform: 'Supabase',
                        },
                    });
                } else {
                    dispatch({
                        type: 'AUTH_STATE_CHANGED',
                        payload: { isAuthenticated: false, user: null, platform: 'Supabase' },
                    });
                    router.push('/auth/login');
                }
            };

            restoreSession();

            const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
                if (session?.user) {
                    const fullName = session.user.user_metadata?.full_name || session.user.email;
                    dispatch({
                        type: 'AUTH_STATE_CHANGED',
                        payload: {
                            isAuthenticated: true,
                            user: {
                                id: session.user.id,
                                avatar: session.user.user_metadata?.avatar || "",
                                email: session.user.email,
                                displayName: fullName,
                            },
                            platform: 'Supabase',
                        },
                    });
                } else {
                    dispatch({
                        type: 'AUTH_STATE_CHANGED',
                        payload: { isAuthenticated: false, user: null, platform: 'Supabase' },
                    });
                    router.push('/auth/login');
                }
            });

            return () => {
                authListener?.subscription?.unsubscribe();
            };
        }
    }, [state.platform, router]);

    const loginWithProvider = async (provider: 'google' | 'github') => {
        if (state.platform === 'Supabase') {
            return supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
        }
    };

    const signup = async (email: string, password: string, userName: string) => {
        if (state.platform === 'Supabase') {
            try {
                const { user, error }: any = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: { full_name: userName },
                    },
                });

                if (error) throw error;

                console.log('User registered successfully, confirmation email sent');
            } catch (error: any) {
                console.error('Error signing up with Supabase:', error);
                throw new Error(error.message);
            }
        }
        return null;
    };

    const signin = async (email: string, password: string) => {
        if (state.platform === 'Supabase') {
            try {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
            } catch (error: any) {
                throw new Error(error.message);
            }
        }
        return null;
    };

    const logout = async () => {
        if (state.platform === 'Supabase') {
            await supabase.auth.signOut();
        }
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                setPlatform,
                loginWithProvider,
                signup,
                signin,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { ProfileSchema, PublicUser } from "@/api/interfaces";
import {
  fetchProfile,
  login as apiLogin,
  logout as apiLogout,
  registerUser,
  submitAnswer as apiSubmitAnswer,
  forgotPassword as apiForgotPassword,
  resetPassword as apiResetPassword,
  type AnswerPayload,
  type ForgotPasswordPayload,
  type LoginPayload,
  type RegisterPayload,
  type ResetPasswordPayload,
} from "@/api/fetches";

interface AuthContextValue {
  user: PublicUser | null;
  profile: ProfileSchema | null;
  loading: boolean;
  authReady: boolean;
  error: string | null;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  refreshProfile: () => Promise<void>;
  submitAnswer: (payload: AnswerPayload) => Promise<void>;
  forgotPassword: (payload: ForgotPasswordPayload) => Promise<string>;
  resetPassword: (payload: ResetPasswordPayload) => Promise<string>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [profile, setProfile] = useState<ProfileSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Первичная загрузка профиля по куке (если есть сессия)
  useEffect(() => {
    let cancelled = false;

    async function init() {
      setLoading(true);
      setError(null);
      try {
        const fetchedProfile = await fetchProfile();
        if (cancelled) return;

        if (fetchedProfile) {
          setProfile(fetchedProfile);
          setUser({
            id: fetchedProfile.id,
            name: fetchedProfile.name,
            email: fetchedProfile.email,
            phone: fetchedProfile.phone,
          });
        } else {
          setProfile(null);
          setUser(null);
        }
      } catch (err) {
        if (cancelled) return;
        console.error("Failed to initialize auth", err);
        setError(err instanceof Error ? err.message : "Failed to initialize auth");
      } finally {
        if (!cancelled) {
          setLoading(false);
          setAuthReady(true);
        }
      }
    }

    void init();

    return () => {
      cancelled = true;
    };
  }, []);

  const refreshProfile = useCallback(async () => {
    setError(null);
    try {
      const fetchedProfile = await fetchProfile();
      if (fetchedProfile) {
        setProfile(fetchedProfile);
        setUser({
          id: fetchedProfile.id,
          name: fetchedProfile.name,
          email: fetchedProfile.email,
          phone: fetchedProfile.phone,
        });
      } else {
        setProfile(null);
        setUser(null);
      }
    } catch (err) {
      console.error("Failed to refresh profile", err);
      setError(err instanceof Error ? err.message : "Failed to refresh profile");
      throw err;
    }
  }, []);

  const login = useCallback(
    async (payload: LoginPayload) => {
      setLoading(true);
      setError(null);
      try {
        const loggedInUser = await apiLogin(payload);
        setUser(loggedInUser);

        // После логина пробуем подтянуть профиль со статистикой
        try {
          const fetchedProfile = await fetchProfile();
          if (fetchedProfile) {
            setProfile(fetchedProfile);
          } else {
            setProfile(null);
          }
        } catch (err) {
          console.error("Failed to fetch profile after login", err);
        }
      } catch (err) {
        console.error("Login failed", err);
        const message = err instanceof Error ? err.message : "Failed to login";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await apiLogout();
    } catch (err) {
      console.error("Logout failed", err);
      setError(err instanceof Error ? err.message : "Failed to logout");
    } finally {
      // В любом случае чистим локальное состояние
      setUser(null);
      setProfile(null);
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    setLoading(true);
    setError(null);
    try {
      await registerUser(payload);
      // По умолчанию просто регистрируем.
      // Если захочешь авто-логин после регистрации —
      // можно здесь вызвать login({ name: payload.name, password: payload.password }).
    } catch (err) {
      console.error("Registration failed", err);
      const message = err instanceof Error ? err.message : "Failed to register";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const submitAnswer = useCallback(async (payload: AnswerPayload) => {
    setError(null);
    try {
      const updated = await apiSubmitAnswer(payload);
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              bestStreak: updated.bestStreak,
              currentStreak: updated.currentStreak,
              wrongWords: updated.wrongWords,
            }
          : prev
      );
    } catch (err) {
      console.error("Failed to submit answer", err);
      const message = err instanceof Error ? err.message : "Failed to submit answer";
      setError(message);
      throw err;
    }
  }, []);

  const forgotPassword = useCallback(
    async (payload: ForgotPasswordPayload): Promise<string> => {
      setError(null);
      try {
        const res = await apiForgotPassword(payload);
        return res.message;
      } catch (err) {
        console.error("Failed to start password reset", err);
        const message =
          err instanceof Error ? err.message : "Failed to start password reset";
        setError(message);
        throw err;
      }
    },
    []
  );

  const resetPassword = useCallback(
    async (payload: ResetPasswordPayload): Promise<string> => {
      setError(null);
      try {
        const res = await apiResetPassword(payload);
        return res.message;
      } catch (err) {
        console.error("Failed to reset password", err);
        const message =
          err instanceof Error ? err.message : "Failed to reset password";
        setError(message);
        throw err;
      }
    },
    []
  );

  const value: AuthContextValue = {
    user,
    profile,
    loading,
    authReady,
    error,
    login,
    logout,
    register,
    refreshProfile,
    submitAnswer,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}


import { ProfileSchema, PublicUser, WordsSchema, PasswordResetResponse } from "./interfaces";
import type { CardProps } from "@/interfaces";

// В проде по умолчанию ходим на задеплоенный сервер,
// а локально — на http://localhost:3001.
const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://ege-liart.vercel.app"
    : "http://localhost:3001");

// -------- Words --------

export async function fetchWords(): Promise<WordsSchema> {
  try {
    const res = await fetch(`${BASE_URL}/words`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch words");
    return res.json();
  } catch (err) {
    try {
      const res = await fetch("../..mocks/words.json", {
        cache: "no-store",
      });
      return res.json();
    } catch {
      return { words: [] };
    }
  }
}

export async function addWord(word: CardProps): Promise<WordsSchema> {
  const res = await fetch(`${BASE_URL}/words`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(word),
  });
  if (!res.ok) throw new Error("Failed to add word");
  return res.json();
}

// -------- Auth --------

export interface RegisterPayload {
  name: string;
  password: string;
  email?: string;
  phone?: string;
}

export async function registerUser(payload: RegisterPayload): Promise<PublicUser> {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error || "Failed to register");
  }

  return res.json();
}

export interface LoginPayload {
  name?: string;
  email?: string;
  phone?: string;
  password: string;
}

export async function login(payload: LoginPayload): Promise<PublicUser> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error || "Failed to login");
  }

  return res.json();
}

export async function logout(): Promise<void> {
  const res = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error || "Failed to logout");
  }
}

// -------- Password reset --------

export interface ForgotPasswordPayload {
  email?: string;
  phone?: string;
}

export async function forgotPassword(
  payload: ForgotPasswordPayload
): Promise<PasswordResetResponse> {
  const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error || "Failed to start password reset");
  }

  return res.json();
}

export interface ResetPasswordPayload {
  name: string;
  code: string;
  newPassword: string;
}

export async function resetPassword(
  payload: ResetPasswordPayload
): Promise<PasswordResetResponse> {
  const res = await fetch(`${BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error || "Failed to reset password");
  }

  return res.json();
}

// -------- Profile --------

export async function fetchProfile(): Promise<ProfileSchema | null> {
  const res = await fetch(`${BASE_URL}/profile`, {
    method: "GET",
    credentials: "include",
  });

  if (res.status === 401) {
    return null;
  }

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error || "Failed to fetch profile");
  }

  return res.json();
}

export interface AnswerPayload {
  accent: string;
  correct: boolean;
}

export async function submitAnswer(
  payload: AnswerPayload
): Promise<Pick<ProfileSchema, "bestStreak" | "currentStreak" | "wrongWords">> {
  const res = await fetch(`${BASE_URL}/profile/answer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error || "Failed to submit answer");
  }

  return res.json();
}

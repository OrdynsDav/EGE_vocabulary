import { CardProps } from "@/interfaces";

export interface WordsSchema {
  words: CardProps[];
}

export interface PublicUser {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
}

export interface ProfileSchema extends PublicUser {
  bestStreak: number;
  currentStreak: number;
  wrongWords: string[];
}

export interface PasswordResetResponse {
  message: string;
}
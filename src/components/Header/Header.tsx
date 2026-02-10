'use client';

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/Providers/AuthProvider/AuthProvider";
import { AuthModal } from "@/components/Auth/AuthModal";
import { IconLogo } from "../ICONS/Logo";

export function Header() {
  const { user, authReady, loading } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <header className="mb-4 border-b border-white/10 pb-3">
      <div className="container">
        <div className="flex w-full flex-col items-center gap-3 min-[450px]:flex-row sm:items-center sm:justify-between">
          <Link href={'/'} className="flex items-center gap-3">
            <IconLogo />
          </Link>
          <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
            {authReady && user && (
              <span className="hidden text-sm text-gray-200 sm:inline">
                Привет, <span className="font-semibold">{user.name}</span>
              </span>
            )}

            {!authReady ? (
              <div className="w-full text-center rounded-lg bg-blue-500 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm sm:w-auto">
                Загрузка...
              </div>
            ) : !user ? (
              <button
                type="button"
                onClick={() => setAuthOpen(true)}
                onTouchStart={() => setPressed(true)}
                onTouchEnd={() => setPressed(false)}
                disabled={loading}
                className={`w-full rounded-lg bg-blue-500 p-3 text-xs font-semibold uppercase tracking-wide text-white shadow-sm hover:bg-gray-700 hover:text-gray-100 hover:border-gray-700 ${
                  pressed ? "bg-gray-700 text-gray-100" : ""
                } transition-colors disabled:opacity-60 sm:w-auto`}
              >
                <div className="flex items-center justify-center gap-2">
                  <span>Войти</span>
                  <span className="h-4 w-px bg-white/70" aria-hidden="true" />
                  <span>Регистрация</span>
                </div>
              </button>
            ) : (
              <Link
                href="/profile"
                className="w-full rounded-lg bg-blue-500 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm hover:bg-gray-700 hover:text-gray-100 hover:border-gray-700 transition-colors sm:w-auto text-center"
              >
                Профиль
              </Link>
            )}
          </div>
        </div>
      </div>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </header>
  );
}

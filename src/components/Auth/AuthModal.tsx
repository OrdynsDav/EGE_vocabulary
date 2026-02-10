"use client";

import { useState, FormEvent, ChangeEvent, useRef, useEffect } from "react";
import { useAuth } from "@/components/Providers/AuthProvider/AuthProvider";

type Mode = "login" | "register" | "forgot" | "reset";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export function AuthModal({ open, onClose }: AuthModalProps) {
  const { login, register, forgotPassword, resetPassword, error, loading } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [pressed, setPressed] = useState(false)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+7");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [localMessage, setLocalMessage] = useState<string | null>(null);

  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const phonePrevRef = useRef<string>("+7");
  const [mounted, setMounted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const frame = setTimeout(() => setAnimateIn(true), 0);
      return () => clearTimeout(frame);
    } else {
      setAnimateIn(false);
      const timer = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!mounted) return null;

  const resetLocalState = () => {
    setLocalMessage(null);
  };

  const formatPhoneFromDigits = (digitsInput: string) => {
    const digits = digitsInput.replace(/\D/g, "");

    // Гарантируем, что номер всегда начинается с 7
    const withoutCountry = digits.startsWith("7")
      ? digits.slice(1)
      : digits.replace(/^8/, "");

    const limited = withoutCountry.slice(0, 10);

    let result = "+7";
    if (limited.length > 0) {
      result += " (" + limited.slice(0, 3);
    }
    if (limited.length >= 3) {
      result += ") " + limited.slice(3, 6);
    }
    if (limited.length >= 6) {
      result += "-" + limited.slice(6, 8);
    }
    if (limited.length >= 8) {
      result += "-" + limited.slice(8, 10);
    }

    return result;
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.currentTarget.value || "";
    const prev = phonePrevRef.current;

    let digits = raw.replace(/\D/g, "");
    const prevDigits = prev.replace(/\D/g, "");

    const removedOneChar = prev.length - raw.length === 1;

    // Если удалили ровно один символ и количество цифр не изменилось,
    // значит пользователь стёр только маску (пробел, дефис, скобку и т.п.).
    // В этом случае дополнительно "откусываем" одну цифру с конца,
    // чтобы визуально стирались именно цифры, а маска перестраивалась сама.
    if (removedOneChar && digits.length === prevDigits.length && digits.length > 1) {
      digits = digits.slice(0, -1);
    }

    const formatted = formatPhoneFromDigits(digits);
    const next = formatted || "+7";
    phonePrevRef.current = next;
    setPhone(next);
  };

  const normalizePhoneForApi = (value: string): string | undefined => {
    const digits = value.replace(/\D/g, "");
    if (!digits) return undefined;
    return `+${digits}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalMessage(null);

    try {
      const phoneForApi = normalizePhoneForApi(phone);

      if (mode === "login") {
        await login({
          name: name || undefined,
          email: email || undefined,
          phone: phoneForApi,
          password,
        });
        onClose();
      } else if (mode === "register") {
        await register({
          name,
          password,
          email: email || undefined,
          phone: phoneForApi,
        });
        setLocalMessage("Успешная регистрация. Теперь можно войти.");
        setMode("login");
      } else if (mode === "forgot") {
        const message = await forgotPassword({
          email: email || undefined,
          phone: phoneForApi,
        });
        setLocalMessage(message);
      } else if (mode === "reset") {
        const message = await resetPassword({
          name,
          code,
          newPassword,
        });
        setLocalMessage(message);
        setMode("login");
      }
    } catch {
      // Ошибка уже сохранена в глобальном error
    }
  };

  const commonInputClasses =
    "w-full rounded-lg border border-neutral-600 bg-neutral-700 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-400 focus:outline-none focus:border-blue-500";

  const labelClasses = "block text-xs font-medium text-gray-300 mb-1";

  const switchMode = (next: Mode) => {
    setMode(next);
    resetLocalState();
  };

  const titleByMode: Record<Mode, string> = {
    login: "Вход",
    register: "Регистрация",
    forgot: "Восстановление пароля",
    reset: "Сброс пароля по коду",
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 transition-opacity duration-300 ease-out ${
        animateIn ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`w-full max-w-md rounded-xl bg-neutral-800 p-6 shadow-xl transform transition-all duration-300 ease-out ${
          animateIn ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{
          fontFamily:
            '"Roboto", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-100">
            {titleByMode[mode]}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className={`rounded-lg p-1 w-8 text-gray-400 transition hover:bg-neutral-700 hover:text-gray-100 ${pressed ? 'bg-neutral-700  text-gray-100' : ''}`}
            onTouchStart={() => setPressed(true)}
            onTouchEnd={() => setPressed(false)}
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {(mode === "login" || mode === "register" || mode === "reset") && (
            <div className="custom-input">
              <label className={labelClasses} htmlFor="name">
                Имя пользователя
              </label>
              <input
                className={commonInputClasses}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Например, mari-ege"
                id="name"
              />
            </div>
          )}

          {(mode === "login" || mode === "register" || mode === "forgot") && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="custom-input">
                <label className={labelClasses} htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  className={commonInputClasses}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  id="email"
                />
              </div>
              <div className="custom-input">
                <label className={labelClasses} htmlFor="phone">
                  Телефон
                </label>
                <input
                  ref={phoneInputRef}
                  className={commonInputClasses}
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="+7 (999) 123-45-67"
                  id="phone"
                />
              </div>
            </div>
          )}

          {(mode === "login" || mode === "register") && (
            <div className="custom-input">
              <label className={labelClasses} htmlFor="password">
                Пароль
              </label>
              <input
                type="password"
                className={commonInputClasses}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Минимум 6 символов"
                id="password"
              />
            </div>
          )}

          {mode === "reset" && (
            <>
              <div className="custom-input">
                <label className={labelClasses} htmlFor="code">
                  Код из письма / SMS
                </label>
                <input
                  className={commonInputClasses}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="6-значный код"
                  id="code"
                />
              </div>
              <div className="custom-input">
                <label className={labelClasses} htmlFor="new-password">
                  Новый пароль
                </label>
                <input
                  type="password"
                  className={commonInputClasses}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Минимум 6 символов"
                  id="new-password"
                />
              </div>
            </>
          )}

          {(error || localMessage) && (
            <p
              className={`text-xs ${
                error ? "text-red-400" : "text-emerald-400"
              }`}
            >
              {error || localMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 disabled:opacity-60"
          >
            {loading ? "Загрузка..." : titleByMode[mode]}
          </button>
        </form>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400">
          <div className="space-x-2">
            {mode !== "login" && (
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => switchMode("login")}
              >
                Уже есть аккаунт
              </button>
            )}
            {mode !== "register" && (
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => switchMode("register")}
              >
                Создать аккаунт
              </button>
            )}
          </div>
          <div>
            {mode !== "forgot" && (
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => switchMode("forgot")}
              >
                Забыли пароль?
              </button>
            )}
            {mode !== "reset" && (
              <button
                type="button"
                className="ml-2 text-blue-500 hover:underline"
                onClick={() => switchMode("reset")}
              >
                Ввести код
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type Toast = {
  id: number;
  message: string;
};

type ToastContextValue = {
  notify: (message: string) => void;
};

type AuthContextValue = {
  isAuthenticated: boolean;
  isReady: boolean;
  login: (email: string, password: string, remember: boolean) => boolean;
  demoLogin: () => void;
  logout: () => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);
const AuthContext = createContext<AuthContextValue | null>(null);

const AUTH_KEY = "smart-marine-authenticated";
const DEMO_EMAIL = "demo@marineai.com";
const DEMO_PASSWORD = "password123";

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = useCallback((message: string) => {
    const id = Date.now();
    setToasts((current) => [...current, { id, message }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3200);
  }, []);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="rounded-lg border border-cyan-200 bg-white px-4 py-3 text-sm font-semibold text-marine-navy shadow-soft"
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(window.localStorage.getItem(AUTH_KEY) === "true");
    setIsReady(true);
  }, []);

  const setAuth = useCallback((value: boolean, remember = true) => {
    setIsAuthenticated(value);
    if (value && remember) {
      window.localStorage.setItem(AUTH_KEY, "true");
    } else {
      window.localStorage.removeItem(AUTH_KEY);
    }
  }, []);

  const login = useCallback(
    (email: string, password: string, remember: boolean) => {
      const success = email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD;
      if (success) {
        setAuth(true, remember);
      }
      return success;
    },
    [setAuth]
  );

  const demoLogin = useCallback(() => {
    setAuth(true, true);
  }, [setAuth]);

  const logout = useCallback(() => {
    setAuth(false, false);
  }, [setAuth]);

  const value = useMemo(
    () => ({ isAuthenticated, isReady, login, demoLogin, logout }),
    [demoLogin, isAuthenticated, isReady, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within Providers");
  }
  return context;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within Providers");
  }
  return context;
}

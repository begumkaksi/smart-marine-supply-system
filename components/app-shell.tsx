"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Bell, Command, LogOut, Menu, Search, ShipWheel } from "lucide-react";
import { motion } from "framer-motion";

import { useAuth, useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { navItems } from "@/lib/data";
import { cn } from "@/lib/utils";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isReady, logout } = useAuth();
  const { notify } = useToast();

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isReady, router]);

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center marine-grid">
        <div className="rounded-lg border bg-white p-5 text-sm font-semibold shadow-soft">Loading secure workspace...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center marine-grid">
        <div className="rounded-lg border bg-white p-5 text-sm font-semibold shadow-soft">Redirecting to login...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen marine-grid">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-white/70 bg-marine-navy text-white shadow-2xl lg:block">
        <div className="flex h-full flex-col">
          <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-marine-navy">
              <ShipWheel className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-100">
                Smart Marine
              </p>
              <p className="text-xs text-slate-300">Supply Optimization</p>
            </div>
          </div>
          <nav className="flex-1 space-y-1 px-4 py-5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white",
                    active && "bg-white/[0.12] text-white"
                  )}
                >
                  {active ? (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-accent"
                    />
                  ) : null}
                  <Icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
          <div className="m-4 rounded-lg border border-white/10 bg-white/[0.08] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan-100">
              AI Control
            </p>
            <p className="mt-2 text-sm text-slate-200">Model confidence is steady across active vessel orders.</p>
            <div className="mt-4 h-2 rounded-full bg-white/10">
              <div className="h-full w-[88%] rounded-full bg-accent" />
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-white/70 bg-white/[0.82] backdrop-blur-xl">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Open navigation"
              onClick={() => notify("Navigation menu is available in the sidebar on desktop.")}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="hidden min-w-0 flex-1 items-center gap-3 rounded-lg border bg-white px-3 py-2 shadow-sm md:flex">
              <Search className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Search vessels, purchase orders, suppliers, ports
              </span>
              <kbd className="ml-auto inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 text-[11px] text-muted-foreground">
                <Command className="h-3 w-3" /> K
              </kbd>
            </div>
            <Button variant="outline" size="icon" aria-label="Notifications" onClick={() => notify("No new procurement alerts.")}>
              <Bell className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Logout"
              onClick={() => {
                logout();
                notify("Logged out successfully.");
                router.push("/login");
              }}
            >
              <LogOut className="h-4 w-4" />
            </Button>
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">Fleet Ops</p>
              <p className="text-xs text-muted-foreground">Northern Europe</p>
            </div>
          </div>
        </header>

        <main className="px-4 py-5 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

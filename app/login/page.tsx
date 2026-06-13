import Link from "next/link";
import { Anchor, Eye, LockKeyhole, Mail, ShipWheel } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-marine-navy text-white">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden p-10 lg:block">
          <div className="absolute inset-0 marine-grid opacity-20" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-marine-navy">
                <ShipWheel className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-100">Smart Marine</p>
                <p className="text-xs text-slate-300">Supply Optimization System</p>
              </div>
            </div>
            <div>
              <Badge variant="info">Commercial maritime procurement</Badge>
              <h1 className="mt-5 max-w-2xl text-5xl font-semibold tracking-normal">
                AI-powered sourcing control for modern ship operators.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-200">
                Upload supply lists, compare suppliers, optimize procurement decisions, and monitor savings from one secure workspace.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                ["1,800+", "suppliers"],
                ["5,200+", "requests"],
                ["15-30%", "cost saving"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg border border-white/10 bg-white/[0.08] p-4">
                  <p className="text-2xl font-semibold">{value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-cyan-100">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-4 py-10 sm:px-6">
          <Card className="w-full max-w-md border-white/70 bg-white text-foreground shadow-2xl">
            <CardHeader>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700">
                <Anchor className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl">Sign in</CardTitle>
              <CardDescription>Use your maritime procurement workspace credentials.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold">Email login</span>
                  <span className="flex items-center gap-2 rounded-md border bg-white px-3 py-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <input
                      className="w-full bg-transparent text-sm outline-none"
                      defaultValue="demo@marineai.com"
                      type="email"
                      aria-label="Email"
                    />
                  </span>
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold">Password login</span>
                  <span className="flex items-center gap-2 rounded-md border bg-white px-3 py-2">
                    <LockKeyhole className="h-4 w-4 text-muted-foreground" />
                    <input
                      className="w-full bg-transparent text-sm outline-none"
                      defaultValue="password123"
                      type="password"
                      aria-label="Password"
                    />
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </span>
                </label>
                <div className="flex items-center justify-between gap-3">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input defaultChecked type="checkbox" className="h-4 w-4 rounded border-input" />
                    Remember me
                  </label>
                  <Link href="/" className="text-sm font-semibold text-cyan-700">
                    Demo account
                  </Link>
                </div>
                <Button asChild className="w-full">
                  <Link href="/">Sign in to dashboard</Link>
                </Button>
              </form>
              <div className="mt-5 rounded-lg border bg-cyan-50 p-4 text-sm">
                <p className="font-semibold">Demo User</p>
                <p className="mt-1 text-muted-foreground">demo@marineai.com</p>
                <p className="text-muted-foreground">password123</p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

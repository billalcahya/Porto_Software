"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginAction } from "@/actions/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@softwarehouse.com");
  const [password, setPassword] = useState("admin123");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const res = await loginAction({ email, password });
    setLoading(false);

    if (res.success) {
      router.push("/admin/dashboard");
      router.refresh();
    } else {
      setErrorMsg(res.error || "Authentication failed.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Image
            src="/logo.PNG"
            alt="DIGITAL THREE Logo"
            width={64}
            height={64}
            className="object-contain mx-auto mb-4 drop-shadow-2xl"
          />
          <h1 className="text-2xl font-bold text-white tracking-tight">DIGITAL THREE CMS Portal</h1>
          <p className="text-xs text-zinc-400 mt-1">Sign in with administrative credentials</p>
        </div>

        <div className="glass-card p-8 rounded-3xl border-zinc-800 bg-zinc-950/80 shadow-2xl">
          {errorMsg && (
            <div className="p-3.5 rounded-xl mb-6 bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-2.5 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-2">Email Address</label>
              <div className="relative">
                <Input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  placeholder="admin@softwarehouse.com"
                />
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-2">Password</label>
              <div className="relative">
                <Input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  placeholder="••••••••"
                />
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
              </div>
            </div>

            <Button type="submit" variant="glow" disabled={loading} className="w-full py-5 font-bold gap-2 text-sm">
              {loading ? "Authenticating..." : "Sign In to CMS"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const sb = createClient();
    if (!sb) {
      toast.info("Connect Supabase to enable sign in.");
      return;
    }
    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) toast.error(error.message);
    else router.push("/admin");
  }
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#0b2239",
        padding: 20,
      }}
    >
      <div
        className="card"
        style={{ width: "100%", maxWidth: 430, padding: 32 }}
      >
        <Link href="/" className="brand">
          <b className="brand-mark">F</b>Findanadvisor
        </Link>
        <h1 style={{ fontSize: 34, marginBottom: 4 }}>Welcome back</h1>
        <p className="muted">
          Sign in to manage profiles or view your saved advisors.
        </p>
        <form
          onSubmit={submit}
          style={{ display: "grid", gap: 15, marginTop: 25 }}
        >
          <div>
            <label className="label">Email address</label>
            <input
              className="field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              className="field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary">Sign in</button>
          <button type="button" className="btn btn-ghost">
            Forgot password?
          </button>
        </form>
      </div>
    </main>
  );
}

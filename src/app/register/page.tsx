"use client";
import api from "@/lib/api";
import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, User, Mail } from "lucide-react";
import { useToast } from "@/components/ToastPopup";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await api.post("/register",
        new URLSearchParams({ username, email, password }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }
      );

      showToast("Account created successfully!", "success");

      // Limpar formulário
      setUsername("");
      setEmail("");
      setPassword("");

      // Redirecionar para login
      router.push("/login");

    } catch (err) {
      const error = err as AxiosError<{ detail: string }>;
      console.error("Erro completo:", error);

      if (error.response) {
        showToast(error.response.data.detail || "Erro no servidor", "error");
      } else if (error.request) {
        showToast("Erro de conexão. Verifique se o servidor está rodando.", "error");
      } else {
        showToast("Erro desconhecido", "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = !username || !email || !password || isSubmitting;

  return (
    <div className="overflow-hidden flex justify-center bg-background px-4 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-panel p-8 rounded-xl shadow-xl border border-muted"
      >
        <h1 className="text-2xl font-bold text-center text-white">Create Account</h1>
        <p className="text-center text-gray-300 mb-6">Register to get started with AtomicStresser.</p>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="flex items-center gap-2 border border-muted rounded px-3 py-2 bg-background">
            <User size={18} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-transparent text-white placeholder-muted-foreground focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 border border-muted rounded px-3 py-2 bg-background">
            <Mail size={18} className="text-muted-foreground" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent text-white placeholder-muted-foreground focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 border border-muted rounded px-3 py-2 bg-background">
            <Lock size={18} className="text-muted-foreground" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent text-white placeholder-muted-foreground focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full py-2 rounded font-semibold transition ${isDisabled
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary/80"
              }`}
          >
            {isSubmitting ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-center text-muted-foreground mt-4">
          Already have an account? <a href="/login" className="text-primary hover:underline">Sign In</a>
        </p>
      </motion.div>
    </div>
  );
}
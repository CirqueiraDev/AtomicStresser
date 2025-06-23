"use client";
import api from "@/lib/api";
import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, User } from "lucide-react";
import { useToast } from "@/components/ToastPopup";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const { login, admin } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await api.post("/login",
        new URLSearchParams({ username, password }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }
      );

      const token = response.data.access_token;
      const isadmin = response.data.admin;
      
      // Usar o contexto de auth para fazer login
      login(token);
      admin(isadmin);
      
      showToast("Logged in successfully!", "success");
      
      // Redirecionar para dashboard
      router.push("/dashboard");

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

  const isDisabled = !username || !password || isSubmitting;

  return (
    <div className="overflow-hidden flex justify-center bg-background px-4 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-panel p-8 rounded-xl shadow-xl border border-muted"
      >
        <h1 className="text-2xl font-bold text-center text-white">Sign In</h1>
        <p className="text-center text-gray-300 mb-6">Sign in to access all features.</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
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
            className={`w-full py-2 rounded font-semibold transition ${
              isDisabled
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary/80"
            }`}
          >
            {isSubmitting ? "Verifying..." : "Login"}
          </button>
        </form>
        
        <p className="text-sm text-center text-muted-foreground mt-4">
          You don't have an account yet?{" "}
          <a href="/register" className="text-primary hover:underline">Sign up</a>
        </p>
      </motion.div>
    </div>
  );
}
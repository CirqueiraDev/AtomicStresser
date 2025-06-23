"use client";
import { useAuth } from '@/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface RouteGuardProps {
  children: React.ReactNode;
}

const publicRoutes = ['/login', '/register', '/'];
const authRoutes = ['/login', '/register'];
const adminRoutes = ['/admin']; // <- restritas para admin

export function RouteGuard({ children }: RouteGuardProps) {
  const { isLogged, isLoading, isAdmin } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // Redireciona admin para dashboard se tentar acessar login/register
    if (isLogged && authRoutes.includes(pathname)) {
      router.push('/dashboard');
      return;
    }

    // Bloqueia usuários não logados em rotas privadas
    if (!isLogged && !publicRoutes.includes(pathname)) {
      router.push('/login');
      return;
    }

    // Bloqueia usuários não-admin tentando acessar rota admin
    if (isLogged && adminRoutes.includes(pathname) && !isAdmin) {
      router.push('/dashboard');
      return;
    }
  }, [isLogged, isLoading, isAdmin, pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-white">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  if (isLogged && authRoutes.includes(pathname)) return null;
  if (!isLogged && !publicRoutes.includes(pathname)) return null;
  if (isLogged && adminRoutes.includes(pathname) && !isAdmin) return null;

  return <>{children}</>;
}

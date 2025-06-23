"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Home, Zap, Code , Blocks, LogIn, UserPlus, User } from "lucide-react";
import Link from "next/link";
import { useSidebar } from "@/contexts/SidebarContext";
import { useAuth } from "@/contexts/AuthContext";
import { X } from "lucide-react";

const items = [
    { href: "/dashboard", icon: <Home size={20} />, label: "Dashboard"},
    { href: "/panel", icon: <Zap size={20} />, label: "Panel" },
    { href: "/api", icon: <Code size={20} />, label: "API"},
    { href: "/profile", icon: <User size={20} />, label: "Profile"},
    { href: "/admin", icon: <Blocks size={20} />, label: "Admin", admin: true },
];

export function Sidebar() {
    const [isClient, setIsClient] = useState(false);
    const { toggleSidebar, sidebarOpen } = useSidebar();
    const { isLogged, isLoading, isAdmin } = useAuth();
    const pathname = usePathname();

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Não renderizar nada durante o loading ou no server-side
    if (!isClient || isLoading) return null;

    // Mobile sidebar
    if (sidebarOpen) {
        return (
            <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-panel border-r border-muted p-4 md:hidden">
                <div className="flex justify-end">
                    <button
                        onClick={toggleSidebar}
                        className="text-text hover:text-primary transition"
                        aria-label="Close menu"
                    >
                        <X size={24} />
                    </button>
                </div>
                <nav className="flex flex-col gap-4 mt-4">
                    {isLogged ? (
                        items.filter(item => !item.admin || isAdmin).map(({ href, icon, label }) => (
                            <Link
                                key={href}
                                href={href}
                                onClick={toggleSidebar} // Fechar sidebar ao clicar em um item
                                className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-muted transition ${pathname === href ? "bg-muted" : ""}`}
                            >
                                {icon}
                                <span className="text-white font-medium">{label}</span>
                            </Link>
                        ))
                    ) : (
                        <>
                            <Link 
                                href="/login" 
                                onClick={toggleSidebar}
                                className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-muted transition ${pathname === "/login" ? "bg-muted" : ""}`}
                            >
                                <LogIn size={20} />
                                <span className="text-white font-medium">Login</span>
                            </Link>
                            <Link 
                                href="/register" 
                                onClick={toggleSidebar}
                                className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-muted transition ${pathname === "/register" ? "bg-muted" : ""}`}
                            >
                                <UserPlus size={20} />
                                <span className="text-white font-medium">Register</span>
                            </Link>
                        </>
                    )}
                </nav>
            </aside>
        );
    }

    // Desktop sidebar - só mostra se o usuário estiver logado
    if (!isLogged) return null;

    return (
        <aside className="hidden md:flex fixed left-0 top-0 z-40 h-full w-16 flex-col items-center bg-panel border-r border-muted pt-16">
            {items.filter(item => !item.admin || isAdmin).map(({ href, icon, label }) => (
                <Link
                    key={href}
                    href={href}
                    className={`group relative flex items-center justify-center w-full h-14 hover:bg-muted transition ${pathname === href ? "bg-muted" : ""}`}
                >
                    <div className="text-white">{icon}</div>
                    <span className="absolute left-16 whitespace-nowrap rounded bg-panel px-2 py-1 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        {label}
                    </span>
                </Link>
            ))}
        </aside>
    );
}
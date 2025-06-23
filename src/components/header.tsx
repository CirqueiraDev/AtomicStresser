"use client";
import Link from "next/link";
import { useState } from "react";
import { useSidebar } from "@/contexts/SidebarContext";

export function Header() {
    const { toggleSidebar } = useSidebar();

    return (
        <header className="sticky top-0 z-50 w-full bg-panel/10 backdrop-blur-md border-b border-muted px-4 md:px-12">
            <div className="flex items-center justify-between md:grid md:grid-cols-3 md:items-center h-14">
                {/* Esquerda */}
                <div className="flex items-center">
                    {/* Mobile: menu button */}
                    <button onClick={toggleSidebar}
                        className="text-text hover:text-primary focus:outline-none md:hidden" aria-label="Open menu">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Desktop: logo img */}
                    <img
                        src="imagens/logo.png"
                        alt="Logo"
                        className="hidden md:block h-12 max-h-12 w-auto object-contain"
                    />
                </div>

                {/* Centro */}
                <div className="flex justify-center items-center">
                    {/* Mobile: logo img */}
                    <img
                        src="imagens/logo.png"
                        alt="Logo"
                        className="block md:hidden h-12 max-h-12 w-auto object-contain"
                    />
                    {/* Desktop: site name */}
                    <Link href="/">
                        <span className="hidden md:block font-bold text-lg tracking-wide text-white">
                            ATOMIC<span className="text-primary">STRESSER</span>
                        </span>
                    </Link>
                </div>

                {/* Direita */}
                <div className="flex justify-end">
                    <Link href="/" className="flex items-center gap-2 hover:text-primary">
                        <img
                            src="https://ext.same-assets.com/2213466344/2335707712.svg"
                            className="h-6 w-6"
                            alt="Telegram"
                        />
                    </Link>
                </div>
            </div>
        </header>
    );
}

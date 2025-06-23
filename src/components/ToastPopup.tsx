"use client";
import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, XCircle, Info } from "lucide-react";

export type ToastType = "success" | "error" | "info";

type Toast = {
    id: number;
    type: ToastType;
    message: string;
};

const ToastContext = createContext<
    | {
        showToast: (message: string, type?: ToastType) => void;
    }
    | undefined
>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = "info") => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, type, message }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 3000);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed top-4 right-4 z-50 space-y-2">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.3 }}
                            className={`flex items-center gap-3 px-4 py-2 rounded shadow border text-sm
                ${toast.type === "success" ? "bg-green-600 border-green-700 text-white" : ""}
                ${toast.type === "error" ? "bg-red-600 border-red-700 text-white" : ""}
                ${toast.type === "info" ? "bg-muted border-muted text-white" : ""}`}
                        >
                            {toast.type === "success" && <CheckCircle size={18} />}
                            {toast.type === "error" && <XCircle size={18} />}
                            {toast.type === "info" && <Info size={18} />}
                            <span>{toast.message}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast must be used within a ToastProvider");
    return context;
}

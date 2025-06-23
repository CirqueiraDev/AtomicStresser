"use client";
import { motion } from "framer-motion";

export function HeroSection() {
    return (
        <section className="relative w-full flex flex-col justify-center items-center min-h-[60vh] text-center mt-6 mb-16 mx-auto max-w-7xl px-4 md:px-8 py-16">
            {/* Fundo decorativo */}
            <img
                src="https://static.vecteezy.com/system/resources/previews/011/461/116/non_2x/freehand-world-map-sketch-on-transparent-background-free-png.png"
                alt="dots-map"
                className="absolute inset-0 w-full h-full object-contain opacity-40 pointer-events-none"
            />

            <div className="relative z-10 flex flex-col items-center gap-6 mt-12">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-white"
                >
                    High-Performance IP Stresser <br /> & Load Testing Tool
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-xl max-w-2xl text-text mb-6"
                >
                    Unlock the full potential of your infrastructure with{" "}<span className="font-semibold">Atomic</span>
                    <span className="text-primary font-semibold">Stresser</span>. Our enterprise-grade stress testing platform delivers unmatched power, real-time control, and precision targeting — built for serious infrastructure testing. No delays, no limits.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex gap-4 justify-center"
                >
                    <a
                        href="/dashboard"
                        className="px-6 py-2 rounded-lg font-semibold border-2 border-primary hover:bg-primary hover:text-white hover:shadow-md hover:scale-105 transition-all duration-300"
                    >
                        Get Started
                    </a>

                </motion.div>
            </div>
        </section>
    );
}

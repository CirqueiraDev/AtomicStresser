"use client";
import { motion } from "framer-motion";

const features = [
  {
    title: "High-Speed Network",
    description: "Our servers run on 1Gbps+ connections with low latency and high availability — no delays.",
    icon: "https://ext.same-assets.com/2213466344/887941114.svg",
  },
  {
    title: "Untraceable Attacks",
    description: "Your tests run through spoofed servers with advanced network masking for anonymity.",
    icon: "https://ext.same-assets.com/2213466344/372705149.svg",
  },
  {
    title: "Advanced Methods",
    description: "Our system supports the most modern L4 and L7 attack vectors with bypass capabilities.",
    icon: "https://ext.same-assets.com/2213466344/2984508998.svg",
  },
  {
    title: "24/7 Support",
    description: "Our staff is available around the clock to help you get the most out of AtomicStresser.",
    icon: "https://ext.same-assets.com/2213466344/2919559522.svg",
  },
];

export function FeaturesSection() {
  return (
    <section
      id="section-features"
      className="w-full max-w-5xl mx-auto py-12 mb-10 min-h-[70vh] flex flex-col px-4 md:px-8"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-10 text-center"
      >
        Our Features
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((feat, idx) => (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-panel border border-primary/20 shadow-lg p-6 rounded-xl flex flex-col items-center text-center hover:shadow-xl transition"
          >
            <img src={feat.icon} className="h-10 mb-3" alt={feat.title} />
            <h3 className="font-bold text-lg mb-2 text-white">{feat.title}</h3>
            <p className="text-sm text-text">{feat.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

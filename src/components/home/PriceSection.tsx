"use client";
import { motion } from "framer-motion";
import { Zap, Clock, Star, Server } from "lucide-react";

const plans = [
  {
    title: "Starter",
    price: "$9.99",
    features: [
      { icon: <Zap size={16} />, label: "1 concurrents" },
      { icon: <Clock size={16} />, label: "120 seconds" },
      { icon: <Star size={16} />, label: "Premium access", included: false },
      { icon: <Server size={16} />, label: "API Access", included: false },
    ],
  },
  {
    title: "Standard",
    price: "$19.99",
    features: [
      { icon: <Zap size={16} />, label: "2 concurrents" },
      { icon: <Clock size={16} />, label: "300 seconds" },
      { icon: <Star size={16} />, label: "Premium access", included: false },
      { icon: <Server size={16} />, label: "API Access", included: true },
    ],
  },
  {
    title: "Advanced",
    price: "$39.99",
    features: [
      { icon: <Zap size={16} />, label: "3 concurrents" },
      { icon: <Clock size={16} />, label: "600 seconds" },
      { icon: <Star size={16} />, label: "Premium access", included: true },
      { icon: <Server size={16} />, label: "API Access", included: true },
    ],
  },
  {
    title: "Enterprise",
    price: "$79.99",
    features: [
      { icon: <Zap size={16} />, label: "6 concurrents" },
      { icon: <Clock size={16} />, label: "1200 seconds" },
      { icon: <Star size={16} />, label: "Premium access", included: true },
      { icon: <Server size={16} />, label: "API Access", included: true },
    ],
  },
];

export function PriceSection() {
  return (
    <section
      id="section-plan"
      className="w-full max-w-6xl mx-auto py-16 px-4 md:px-8"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-12 text-center"
      >
        Choose Your Plan
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-panel border border-primary/20 shadow-lg p-6 rounded-xl text-center hover:shadow-xl transition"
          >
            <h3 className="text-xl font-bold text-white mb-2">{plan.title}</h3>
            <p className="text-3xl font-extrabold text-primary mb-6">{plan.price}</p>
            <ul className="space-y-3 text-sm text-text mb-6">
              {plan.features.map((f, i) => {
                const isSpecial = f.label === "Premium access" || f.label === "API Access";
                let className = "flex items-center justify-center gap-2";

                if (isSpecial) {
                  className += f.included
                    ? " underline decoration-green-500 decoration-2 underline-offset-[6px]"
                    : " line-through decoration-red-500 decoration-2";
                }

                return (
                  <li key={i} className={className}>
                    {f.icon} {f.label}
                  </li>
                );
              })}
            </ul>
            <button className="w-full mt-auto bg-primary text-white font-semibold py-2 rounded-md hover:bg-primary/80 transition">
              Select Plan
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

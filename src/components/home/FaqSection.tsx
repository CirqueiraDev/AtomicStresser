"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is a AtomicStresser app?",
    answer:
      "AtomicStresser is a high-performance stress testing platform that allows you to test the resilience of your infrastructure under intense simulated traffic.",
  },
  {
    question: "What payment methods are available?",
    answer:
      "We accept a wide range of payment methods including cryptocurrency, credit card, and other anonymous options.",
  },
  {
    question: "Will the servers I attack track me?",
    answer:
      "No. Our infrastructure masks all outgoing requests and utilizes anonymized routing to ensure your identity remains protected during testing.",
  },
  {
    question: "What sites can be tested?",
    answer:
      "Only test domains and IP addresses that you own or have explicit permission to test. Unauthorized testing is illegal and against our terms.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="section-faq" className="w-full max-w-4xl mx-auto py-16 px-4 md:px-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-10 text-center"
      >
        Frequently Asked Questions
      </motion.h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-panel border border-muted rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex justify-between items-center px-4 py-4 text-left text-white font-semibold hover:text-primary transition"
              >
                {faq.question}
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180 text-primary" : "text-text"}`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 text-sm text-text">
                  {faq.answer}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

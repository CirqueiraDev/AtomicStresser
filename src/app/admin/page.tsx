"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, CreditCard, Settings, BombIcon } from "lucide-react";
import UserManagement from "@/components/admin/UserManagement";
import PlanManagement from "@/components/admin/PlanManagement";
import StressMethods from "@/components/admin/StressMethods";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("users");

  const tabs = [
    { id: "users", label: "Users", icon: Users },
    { id: "plans", label: "Plans", icon: CreditCard },
    { id: "methods", label: "Methods", icon: BombIcon },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <UserManagement />;
      case "plans":
        return <PlanManagement />;
      case "methods":
        return <StressMethods />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      {/* <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        </div>
      </div> */}

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={18} />
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
}
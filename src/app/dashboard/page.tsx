"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  DatabaseZap,
  Server,
  Users,
  Zap,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  TooltipProps,
} from "recharts";
import api from "@/lib/api";

interface Stat {
  label: string;
  value: number;
  icon: JSX.Element;
  color: string;
}

interface AttackData {
  name: string;
  attacks: number;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg p-3 shadow-xl">
        <p className="text-gray-300 text-sm font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [attacksData, setAttacksData] = useState<AttackData[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/dashboard");
        const data = res.data;

        setAttacksData(data.attacks_last_7_days);

        setStats([
          {
            label: "Active Servers",
            value: data.active_servers,
            icon: <Server size={24} />,
            color: "text-blue-400",
          },
          {
            label: "Total Attacks",
            value: data.total_attacks,
            icon: <DatabaseZap size={24} />,
            color: "text-blue-400",
          },
          {
            label: "Running Attacks",
            value: data.running_attacks,
            icon: <Zap size={24} />,
            color: "text-blue-400",
          },
          {
            label: "Registered Users",
            value: data.registered_users,
            icon: <Users size={24} />,
            color: "text-blue-400",
          },
        ]);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 "
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02, y: -2 }}
              className="relative overflow-hidden backdrop-blur-sm border bg-panel  border-gray-700/50 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-100"
            >
              <div className="absolute inset-0 to-transparent pointer-events-none " />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-3xl font-bold text-white mb-1">
                    {stat.value.toLocaleString("en-US")}
                  </p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-medium ${stat.color}`}>
                    {stat.icon}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="backdrop-blur-sm border bg-panel  border-gray-700/50 p-8 rounded-2xl shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-1">Attacks Chart</h2>
                <p className="text-gray-400 text-sm">Showing total attacks per day for the last 7 days</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-400">Attacks</span>
                </div>
              </div>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attacksData}>
                  <defs>
                    <linearGradient id="attacksGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    stroke="#6b7280"
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#6b7280"
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="attacks"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fill="url(#attacksGradient)"
                    name="Attacks"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Você pode continuar com o gráfico de "Network Load" ou criar algo novo */}
        </div>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Copy, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";

type Profile = {
  id: string;
  username: string;
  email: string;
  plan: string;
  rule: string;
  join_date: string;
  max_concurrents: number;
  max_seconds: number;
  expiration_date: string | null;
  avatar: string;
};

export default function ProfilePage() {
  const [copiedId, setCopiedId] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile");
        const user = response.data;
        setProfile({
          ...user,
          avatar: user.username
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase(),
        });
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
      }
    };
    fetchProfile();
  }, []);

  const copyUserId = () => {
    navigator.clipboard.writeText(profile?.id?.toString() ?? "");
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  if (!profile) return null;

  return (
    <>

      <div className="justify-items-center p-2">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 max-w-300 flex items-center gap-3 text-sm bg-blue-500/10 border border-blue-500/20 rounded-xl px-6 py-4"
        >
          <Info size={20} className="text-blue-400 flex-shrink-0" />
          <p className="text-blue-300">
            We never request sensitive information. Only your User ID or Username is required when purchasing a plan.
          </p>
        </motion.div>
      </div>


      <div className="p-4 max-w-xl mx-auto text-white space-y-6">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-blue-600 mx-auto flex items-center justify-center text-2xl font-bold">
            {profile.avatar}
          </div>
          <h2 className="text-xl font-semibold mt-2">{profile.username}</h2>
          <p className="text-sm text-gray-400">{profile.email}</p>
        </div>

        <div className="bg-panel border border-gray-600 rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">User ID</span>
            <button onClick={copyUserId} className="text-sm hover:text-blue-400">
              {copiedId ? <CheckCircle size={16} className="text-green-400" /> : <Copy size={16} />}
            </button>
          </div>
          <code className="block text-sm text-white break-words">{profile.id}</code>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-panel border border-gray-600 rounded-lg p-4">
            <p className="text-sm text-gray-400">Plan</p>
            <p className="text-white font-semibold">{profile.plan}</p>
          </div>
          <div className="bg-panel border border-gray-600 rounded-lg p-4">
            <p className="text-sm text-gray-400">Role</p>
            <p className="text-white font-semibold">{profile.rule}</p>
          </div>
          <div className="bg-panel border border-gray-600 rounded-lg p-4">
            <p className="text-sm text-gray-400">Member Since</p>
            <p className="text-white font-semibold">{formatDate(profile.join_date)}</p>
          </div>
          <div className="bg-panel border border-gray-600 rounded-lg p-4">
            <p className="text-sm text-gray-400">Max Concurrents</p>
            <p className="text-white font-semibold">{profile.max_concurrents}</p>
          </div>
          <div className="bg-panel border border-gray-600 rounded-lg p-4">
            <p className="text-sm text-gray-400">Max Duration</p>
            <p className="text-white font-semibold">{formatTime(profile.max_seconds)}</p>
          </div>
          <div className="bg-panel border border-gray-600 rounded-lg p-4">
            <p className="text-sm text-gray-400">Expires On</p>
            <p className="text-white font-semibold">
              {profile.expiration_date ? formatDate(profile.expiration_date) : "No expiration"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
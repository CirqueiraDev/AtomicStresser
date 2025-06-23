"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus, Edit3 } from "lucide-react";
import api from "@/lib/api";

interface Plan {
  name: string;
  max_concurrents: number;
  max_seconds: number;
  min_seconds: number;
  premium: boolean;
  api_access: boolean;
}

interface ApiError {
  response?: {
    data?: {
      detail?: string;
    };
  };
}

export default function PlanManagement() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingPlanName, setEditingPlanName] = useState("");

  // Form states
  const [name, setName] = useState("");
  const [maxConcurrents, setMaxConcurrents] = useState(1);
  const [maxSeconds, setMaxSeconds] = useState(60);
  const [minSeconds, setMinSeconds] = useState(10);
  const [premium, setPremium] = useState(false);
  const [apiAccess, setApiAccess] = useState(false);

  const fetchPlans = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await api.get("/plans", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlans(res.data);
    } catch (err) {
      console.error("Failed to fetch plans:", err);
      setError("Failed to load plans");
    }
  };

  const resetForm = () => {
    setName("");
    setMaxConcurrents(1);
    setMaxSeconds(60);
    setMinSeconds(10);
    setPremium(false);
    setApiAccess(false);
    setIsEditing(false);
    setEditingPlanName("");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (minSeconds > maxSeconds) {
      setError("Min seconds cannot be greater than max seconds");
      return;
    }
    if (name.trim() === "") {
      setError("Plan name is required");
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      const planData = {
        name: name.trim(),
        max_concurrents: maxConcurrents,
        max_seconds: maxSeconds,
        min_seconds: minSeconds,
        premium,
        api_access: apiAccess,
      };

      if (isEditing) {
        await api.put(`/plans/${editingPlanName}`, planData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", },
        });
      } else {
        await api.post("/plans", planData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", },

        });
      }

      await fetchPlans();
      resetForm();
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      const msg = apiErr?.response?.data?.detail || "Failed to process plan";
      setError(msg);
    }
  };

  const handleEdit = (plan: Plan) => {
    setName(plan.name);
    setMaxConcurrents(plan.max_concurrents);
    setMaxSeconds(plan.max_seconds);
    setMinSeconds(plan.min_seconds);
    setPremium(plan.premium);
    setApiAccess(plan.api_access);
    setIsEditing(true);
    setEditingPlanName(plan.name);
    setError("");
  };

  const handleDelete = async (planName: string) => {
    if (!confirm(`Are you sure you want to delete the plan "${planName}"?`)) return;

    try {
      const token = localStorage.getItem("access_token");
      await api.delete(`/plans/${planName}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlans(plans.filter((p) => p.name !== planName));
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      const msg = apiErr?.response?.data?.detail || "Failed to delete plan";
      setError(msg);
    }

  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchPlans();
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-white text-lg">Loading plans...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Plan Management</h2>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-600/20 border border-red-600 rounded-lg text-red-400"
        >
          {error}
        </motion.div>
      )}

      {/* Add/Edit Plan Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700"
      >
        <h3 className="text-lg font-medium text-white mb-4">
          {isEditing ? "Edit Plan" : "Add Plan"}
        </h3>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <input
            type="text"
            placeholder="Plan Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isEditing} // name can't be changed on edit (use key)
            className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            placeholder="Max Concurrents"
            value={maxConcurrents}
            min={1}
            onChange={(e) => setMaxConcurrents(Number(e.target.value))}
            required
            className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            placeholder="Max Seconds"
            value={maxSeconds}
            min={1}
            onChange={(e) => setMaxSeconds(Number(e.target.value))}
            required
            className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            placeholder="Min Seconds"
            value={minSeconds}
            min={1}
            onChange={(e) => setMinSeconds(Number(e.target.value))}
            required
            className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={premium}
              onChange={() => setPremium(!premium)}
              className="accent-blue-500"
            />
            Premium
          </label>

          <label className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={apiAccess}
              onChange={() => setApiAccess(!apiAccess)}
              className="accent-blue-500"
            />
            API Access
          </label>

          <div className="flex gap-2 md:col-span-2 lg:col-span-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:bg-blue-700 transition"
            >
              <Plus size={18} />
              {isEditing ? "Update" : "Add"}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </motion.div>

      {/* Plans Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-300 border border-slate-700 rounded-lg">
          <thead className="text-xs uppercase bg-slate-900 border-b border-slate-700">
            <tr>
              <th className="px-4 py-3">Plan Name</th>
              <th className="px-4 py-3">Max Concurrents</th>
              <th className="px-4 py-3">Max Seconds</th>
              <th className="px-4 py-3">Min Seconds</th>
              <th className="px-4 py-3">Premium</th>
              <th className="px-4 py-3">API Access</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-4 text-slate-500">
                  No plans found.
                </td>
              </tr>
            )}
            {plans.map((plan) => (
              <tr
                key={plan.name}
                className="border-b border-slate-700 hover:bg-slate-800"
              >
                <td className="px-4 py-2">{plan.name}</td>
                <td className="px-4 py-2">{plan.max_concurrents}</td>
                <td className="px-4 py-2">{plan.max_seconds}</td>
                <td className="px-4 py-2">{plan.min_seconds}</td>
                <td className="px-4 py-2">{plan.premium ? "Yes" : "No"}</td>
                <td className="px-4 py-2">{plan.api_access ? "Yes" : "No"}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(plan)}
                    className="p-1 rounded hover:bg-slate-700"
                    title="Edit plan"
                    type="button"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(plan.name)}
                    className="p-1 rounded hover:bg-red-700 text-red-400"
                    title="Delete plan"
                    type="button"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from 'react';
import { useAttackContext } from '@/contexts/AttackContext';
import api from '@/lib/api';

interface LaunchedAttack {
    attack_id: string;
    target: string;
    method: string;
    layer?: string;
    time_total: number;
    time_remaining: number;
}

export default function AttackLogs() {
    const { refreshAttacks } = useAttackContext();
    const [logs, setLogs] = useState<LaunchedAttack[]>([]);
    const [filterTarget, setFilterTarget] = useState('');

    const fetchAttacks = async () => {
        try {
            const response = await api.get('/ongoing-attacks');
            if (response.data?.status === 'success') {
                setLogs(response.data.attacks);
            }
        } catch (err) {
            console.error("Erro ao buscar ataques em andamento:", err);
        }
    };

    useEffect(() => {
        fetchAttacks();
    }, []);

    useEffect(() => {
        if (refreshAttacks) {
            fetchAttacks();
        }
    }, [refreshAttacks]);

    useEffect(() => {
        const timer = setInterval(() => {
            setLogs((prevLogs) =>
                prevLogs
                    .map(log => ({
                        ...log,
                        time_remaining: log.time_remaining > 0 ? log.time_remaining - 1 : 0
                    }))
                    .filter(log => log.time_remaining > 0)
            );
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const stopAttack = async (attackId: string, layer: string | undefined) => {
        try {
            await api.post('/stop', new URLSearchParams({
                attack_id: attackId,
                layer: layer || ''
            }));
            setLogs(prev => prev.filter(log => log.attack_id !== attackId));
        } catch (err) {
            console.error("Erro ao parar ataque:", err);
        }
    };

    const filteredLogs = logs.filter(log =>
        log.target.toLowerCase().includes(filterTarget.toLowerCase())
    );

    return (
        <div className="rounded-lg p-0 lg:p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="text-center flex-1">
                    <h2 className="text-blue-600 text-2xl font-bold mb-1">attacks logs</h2>
                    <p className="text-gray-400 text-sm">running attacks</p>
                </div>
            </div>

            <div className="flex items-center justify-between mb-4">
                <input
                    type="text"
                    placeholder="Filter target..."
                    value={filterTarget}
                    onChange={(e) => setFilterTarget(e.target.value)}
                    className="bg-panel border border-gray-600 rounded px-3 py-2 text-white text-sm"
                />
            </div>

            <div className="border border-gray-600 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-panel">
                        <tr>
                            <th className="text-left py-3 px-4 text-gray-300">Target ↓</th>
                            <th className="text-left py-3 px-4 text-gray-300">Method ↓</th>
                            <th className="text-left py-3 px-4 text-gray-300">Time ↓</th>
                            <th className="text-left py-3 px-4 text-gray-300">Layer ↓</th>
                            <th className="text-left py-3 px-4 text-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLogs.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-8 text-gray-400">
                                    No results.
                                </td>
                            </tr>
                        ) : (
                            filteredLogs.map((log, index) => (
                                <tr key={index} className="border-t border-gray-600 hover:bg-slate-600/50">
                                    <td className="py-3 px-4 text-white">{log.target}</td>
                                    <td className="py-3 px-4 text-white">{log.method}</td>
                                    <td className="py-3 px-4 text-white">{log.time_remaining}s</td>
                                    <td className="py-3 px-4 text-white">{log.layer}</td>
                                    <td className="py-3 px-4">
                                        <button
                                            onClick={() => stopAttack(log.attack_id, log.layer)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                                        >
                                            Stop
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

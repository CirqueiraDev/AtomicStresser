"use client";
import { useState, useEffect } from 'react';
import MethodDropdown from '@/components/panel/MethodDropdown';
import { useToast } from "@/components/ToastPopup";
import { AxiosError } from "axios";
import { useAttackContext } from '@/contexts/AttackContext';
import api from '@/lib/api';

interface Method {
    method: string;
    description: string;
    layer4: boolean;
    layer7: boolean;
    amplification: boolean;
    premium: boolean;
    proxy: boolean;
}
export default function Layer4Form({ methods = [] }: { methods: Method[] }) {
    const { triggerRefresh } = useAttackContext();
    const { showToast } = useToast();
    const [ipv4, setIpv4] = useState('74.74.74.8');
    const [port, setPort] = useState('80');
    const [time, setTime] = useState('30');
    const [concurrents, setConcurrents] = useState(1);
    const [server, setServer] = useState('Layer4');
    const [protocol, setProtocol] = useState('Methods');
    const [filteredMethods, setFilteredMethods] = useState<Method[]>([]);
    const [selectedMethod, setSelectedMethod] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const filtered = methods.filter((m) =>
        protocol === "Amplification" ? m.amplification : !m.amplification
    );

    useEffect(() => {
        const filtered = methods.filter(m =>
            protocol === 'Amplification' ? m.amplification : !m.amplification
        );
        setFilteredMethods(filtered);
    }, [protocol, methods]);

    const launchAttack = async () => {
        try {
            const response = await api.post("/launch",
                new URLSearchParams({
                    method: selectedMethod,
                    target: ipv4,
                    port: port,
                    time: time,
                    layer: server // "Layer4" ou "Layer4_premium"
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                }
            );

            if (response.data.success != false && response.data.ongoing != 0) {
                showToast("attack launched!", "success");
                triggerRefresh();
            } else {
                showToast("attack failed!", "error");
            }

        } catch (err) {
            const error = err as AxiosError<{ detail: string }>;
            showToast("attack failed!", "error");
            console.error("Erro ao lançar ataque Layer4:", err);
        }
    };

    const isDisabled = !ipv4 || !port || !selectedMethod || isSubmitting;

    return (
        <div className="rounded-lg p-0 lg:p-6">
            <div className="space-y-4">
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label className="block text-white text-sm mb-2">IPv4</label>
                        <input
                            type="text"
                            value={ipv4}
                            onChange={(e) => setIpv4(e.target.value)}
                            className="w-full bg-panel border border-gray-600 rounded px-3 py-2 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-white text-sm mb-2">Port</label>
                        <input
                            type="text"
                            value={port}
                            onChange={(e) => setPort(e.target.value)}
                            className="w-full bg-panel border border-gray-600 rounded px-3 py-2 text-white"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-white text-sm mb-2">Time</label>
                        <input
                            type="text"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full bg-panel border border-gray-600 rounded px-3 py-2 text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-white text-sm mb-2">Protocol</label>
                        <select
                            value={protocol}
                            onChange={(e) => setProtocol(e.target.value)}
                            className="w-full bg-panel border border-gray-600 rounded px-3 py-2 text-white"
                        >
                            <option value="Methods">UDP / TCP</option>
                            <option value="Amplification">Amplification</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-white text-sm mb-2">Method</label>
                    <MethodDropdown
                        methods={filtered}
                        value={selectedMethod}
                        onChange={setSelectedMethod}
                    />
                </div>

                <div>
                    <label className="block text-white text-sm mb-2">Servers Networks</label>
                    <select
                        value={server}
                        onChange={(e) => setServer(e.target.value)}
                        className="w-full bg-panel border border-gray-600 rounded px-3 py-2 text-white"
                    >
                        <option value="Layer4">Normal Network</option>
                        <option value="Layer4_premium">Premium Network</option>
                    </select>
                </div>

                <div>
                    <label className="block text-white text-sm mb-2">Concurrents: {concurrents}</label>
                    <input
                        type="range"
                        min="1"
                        max="25"
                        value={concurrents}
                        onChange={(e) => setConcurrents(Number(e.target.value))}
                        className="w-full accent-blue-500"
                    />
                </div>

                <button
                    disabled={isDisabled}
                    onClick={launchAttack}
                    className={`w-full py-2 rounded font-semibold transition ${isDisabled
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-primary text-white hover:bg-primary/80"
                        }`}
                >
                    Attack
                </button>
            </div>
        </div>
    );
}

"use client";
import { useState, useEffect } from 'react';
import MethodDropdown from '@/components/panel/MethodDropdown';
import { useAttackContext } from '@/contexts/AttackContext';
import { useToast } from "@/components/ToastPopup";
import { AxiosError } from "axios";
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

export default function Layer7Form({ methods = [] }: { methods: Method[] }) {
    const { showToast } = useToast();
    const [url, setUrl] = useState('https://google.com');
    const [requests, setRequests] = useState('100');
    const [server, setServer] = useState('Layer7');
    const [time, setTime] = useState('30');
    const [concurrents, setConcurrents] = useState(1);
    const [selectedMethod, setSelectedMethod] = useState("");
    const [protocol, setProtocol] = useState("Methods");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const filtered = methods.filter((m) =>
        protocol === "Amplification" ? m.amplification : !m.amplification
    );

    const launchAttack = async () => {
        try {
            const response = await api.post("/launch",
                new URLSearchParams({
                    method: selectedMethod,
                    target: url,
                    time: time,
                    rpc: requests,
                    layer: server // "Layer7" ou "Layer7_premium"
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                }
            );

            if (response.data.success != false && response.data.ongoing != 0) {
                showToast("attack launched!", "success");
            } else {
                showToast("attack failed!", "error");
            }

        } catch (err) {
            const error = err as AxiosError<{ detail: string }>;
            showToast("attack failed!", "error");
            console.error("Erro ao lançar ataque Layer4:", err);
        }
    };

    const isDisabled = !url || !requests || !selectedMethod || isSubmitting;

    return (
        <div className="rounded-lg p-0 lg:p-6">

            <div className="space-y-4">
                <div className='grid grid-cols-2 gap-4'>

                    <div>
                        <label className="block text-white text-sm mb-2">URL</label>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full bg-panel border border-gray-600 rounded px-3 py-2 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-white text-sm mb-2">Requests</label>
                        <input
                            type="text"
                            value={requests}
                            onChange={(e) => setRequests(e.target.value)}
                            className="w-full bg-panel border border-gray-600 rounded px-3 py-2 text-white"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-white text-sm mb-2">Time</label>
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="flex-1 bg-panel border border-gray-600 rounded px-3 py-2 text-white"
                        />
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
                        <option value="Layer7">Normal Network</option>
                        <option value="Layer7_premium">Premium Network</option>
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
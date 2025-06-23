"use client";
import React, { useEffect, useState } from 'react';
import Layer4Form from '@/components/panel/Layer4Form';
import Layer7Form from '@/components/panel/Layer7Form';
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

export default function Panel() {
    const [activeLayer, setActiveLayer] = useState<'L4' | 'L7'>('L4');
    const [methods, setMethods] = useState<Method[]>([]);

    useEffect(() => {
        const fetchMethods = async () => {
            try {
                const response = await api.get("/methods");
                setMethods(response.data);
            } catch (err: unknown) {
                console.error("Erro ao buscar métodos:", err);
            }
        };
        fetchMethods();
    }, []);

    return (
        <div className="min-h-screen 0 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-center mb-6">
                    <div className="inline-flex rounded-md shadow-sm " role="group">
                        <button
                            onClick={() => setActiveLayer('L4')}
                            className={`px-20 py-2 text-sm font-medium rounded-l-md ${activeLayer === 'L4' ? 'bg-blue-600 text-white' : 'bg-panel text-gray-500'}`}
                        >
                            Layer 4
                        </button>
                        <button
                            onClick={() => setActiveLayer('L7')}
                            className={`px-20 py-2 text-sm font-medium rounded-r-md ${activeLayer === 'L7' ? 'bg-blue-600 text-white' : 'bg-panel text-gray-500'}`}
                        >
                            Layer 7
                        </button>
                    </div>
                </div>

                <div>
                    {activeLayer === 'L4' ? (
                        <Layer4Form methods={methods.filter(m => m.layer4)} />
                    ) : (
                        <Layer7Form methods={methods.filter(m => m.layer7)} />
                    )}
                </div>
            </div>
        </div>
    );
}

"use client";
import React, { useState } from 'react';
import AttackLogs from '@/components/panel/AttackLogs';
import Panel from '@/components/panel/Panel';

export default function DashboardAttack() {
    return (
        <div className="min-h-screen 0 px-12 grid lg:grid-cols-2 gap-6">
            <Panel />
            <AttackLogs />
        </div>
    );
}

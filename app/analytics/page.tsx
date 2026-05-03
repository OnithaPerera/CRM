"use client"
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface StageData {
    stage: string;
    count: number;
}

interface TrainerData {
    name: string;
    trainees: number;
}

interface Recruit {
    id: string;
    recruit_name: string;
    trainer: string;
    stage: string;
    license_status: boolean;
}

export default function AnalyticsDashboard() {
    const [stageData, setStageData] = useState<StageData[]>([]);
    const [trainerData, setTrainerData] = useState<TrainerData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAnalytics() {
            const { data, error } = await supabase.from('recruits').select('*');

            if (!error && data) {
                const stages: { [key: string]: number } = {};
                (data as Recruit[]).forEach(r => { stages[r.stage] = (stages[r.stage] || 0) + 1; });
                setStageData(Object.keys(stages).map(key => ({ stage: key, count: stages[key] })));

                const trainers: { [key: string]: number } = {};
                (data as Recruit[]).forEach(r => { if (r.trainer) trainers[r.trainer] = (trainers[r.trainer] || 0) + 1; });
                setTrainerData(Object.keys(trainers).map(key => ({ name: key, trainees: trainers[key] })));
            }
            setLoading(false);
        }
        fetchAnalytics();
    }, []);

    if (loading) return <div className="p-8 font-medium text-slate-500">Loading analytics...</div>;

    return (
        <div className="p-8 max-w-[1600px] mx-auto min-h-screen bg-slate-50">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-8">Analytics</h1>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100">
                    <h2 className="text-xl font-bold text-slate-800 mb-6">Trainees per Trainer</h2>
                    {/* THE FIX: Strict height wrapper ensures Recharts doesn't crash */}
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={trainerData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="trainees" radius={[6, 6, 0, 0]}>
                                    {trainerData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'][index % 4]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100">
                    <h2 className="text-xl font-bold text-slate-800 mb-6">Pipeline Distribution</h2>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="stage" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="count" fill="#0f172a" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
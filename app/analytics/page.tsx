"use client"
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function AnalyticsDashboard() {
    const [stageData, setStageData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAnalytics() {
            const { data, error } = await supabase.from('recruits').select('*');
            if (!error && data) {
                const stages: Record<string, number> = {};
                data.forEach(r => { stages[r.stage] = (stages[r.stage] || 0) + 1; });
                setStageData(Object.keys(stages).map(key => ({ stage: key, count: stages[key] })));
            }
            setLoading(false);
        }
        fetchAnalytics();
    }, []);

    if (loading) return <div className="p-8 font-medium text-slate-500">Loading analytics...</div>;

    return (
        <div className="p-8 max-w-[1600px] mx-auto bg-slate-50">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-8">Analytics</h1>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h2 className="text-lg font-bold text-slate-800 mb-6">Pipeline Distribution</h2>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="stage" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
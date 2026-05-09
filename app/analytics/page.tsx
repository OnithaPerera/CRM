"use client"
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';

export default function AnalyticsDashboard() {
    const [stageData, setStageData] = useState<any[]>([]);
    const [trainerData, setTrainerData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAnalytics() {
            const { data, error } = await supabase.from('recruits').select('*');
            if (!error && data) {
                const stages: Record<string, number> = {};
                data.forEach(r => { stages[r.stage] = (stages[r.stage] || 0) + 1; });
                setStageData(Object.keys(stages).map(key => ({ stage: key, count: stages[key] })));

                const trainers: Record<string, number> = {};
                data.forEach(r => { if (r.trainer) trainers[r.trainer] = (trainers[r.trainer] || 0) + 1; });
                setTrainerData(Object.keys(trainers).map(key => ({ name: key, trainees: trainers[key] })));
            }
            setLoading(false);
        }
        fetchAnalytics();
    }, []);

    if (loading) return (
        <div className="p-8 flex items-center justify-center h-[calc(100vh-4rem)]">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-8 max-w-[1600px] mx-auto"
        >
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-extrabold text-slate-900 tracking-tight mb-8"
            >
                Analytics
            </motion.h1>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200"
                >
                    <h2 className="text-xl font-bold text-slate-800 mb-8">Trainees per Trainer</h2>
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={trainerData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} axisLine={false} tickLine={false} dy={10} />
                                <YAxis tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} axisLine={false} tickLine={false} dx={-10} />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="trainees" radius={[8, 8, 0, 0]} maxBarSize={60}>
                                    {trainerData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={['#3b82f6', '#8b5cf6', '#0ea5e9', '#6366f1'][index % 4]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200"
                >
                    <h2 className="text-xl font-bold text-slate-800 mb-8">Pipeline Distribution</h2>
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="stage" tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} axisLine={false} tickLine={false} dy={10} />
                                <YAxis tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} axisLine={false} tickLine={false} dx={-10} />
                                <Tooltip 
                                    cursor={{ fill: '#f8fafc' }} 
                                    contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
                                />
                                <Bar dataKey="count" fill="#0f172a" radius={[8, 8, 0, 0]} maxBarSize={60}>
                                    {stageData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill="#3b82f6" />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
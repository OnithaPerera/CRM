import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    trend?: 'up' | 'down' | string | null;
    trendLabel?: string | null;
    icon?: React.ReactNode;
}

export default function StatCard({ title, value, trend, trendLabel, icon }: StatCardProps) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 transition-all hover:shadow-md flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{title}</h3>
                {icon && <div className="text-blue-500 bg-blue-50 p-2 rounded-lg">{icon}</div>}
            </div>

            <div>
                <div className="text-4xl font-extrabold text-slate-800 mb-2">{value}</div>
                {trend && (
                    <div className="flex items-center text-sm">
                        <span className={`font-bold px-2 py-0.5 rounded-full ${trend === 'up' ? 'text-emerald-700 bg-emerald-100' : 'text-rose-700 bg-rose-100'}`}>
                            {trend === 'up' ? '↑' : '↓'}
                        </span>
                        <span className="text-slate-500 ml-2 font-medium">{trendLabel}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

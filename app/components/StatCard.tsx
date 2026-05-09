import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
    title: string;
    value: string | number;
    trend?: 'up' | 'down' | string | null;
    trendLabel?: string | null;
    icon?: React.ReactNode;
    delay?: number;
}

export default function StatCard({ title, value, trend, trendLabel, icon, delay = 0 }: StatCardProps) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between group"
        >
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{title}</h3>
                {icon && (
                    <div className="text-blue-600 bg-blue-50 p-2.5 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                        {icon}
                    </div>
                )}
            </div>

            <div>
                <div className="text-4xl font-extrabold text-slate-800 mb-2 tracking-tight">{value}</div>
                {trend && (
                    <div className="flex items-center text-sm mt-3">
                        <span className={`font-bold px-2 py-0.5 rounded-md ${trend === 'up' ? 'text-emerald-700 bg-emerald-100' : 'text-rose-700 bg-rose-100'}`}>
                            {trend === 'up' ? '↑' : '↓'}
                        </span>
                        <span className="text-slate-500 ml-2 font-medium">{trendLabel}</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

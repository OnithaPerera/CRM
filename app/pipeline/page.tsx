"use client"
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';

interface Recruit {
    id: string;
    recruit_name: string;
    trainer: string;
    stage: string;
}

const STAGES: string[] = ['New', 'Dialing', 'Stage 1', 'Stage 2', 'Stage 3', 'Closing'];

export default function PipelineView() {
    const [recruits, setRecruits] = useState<Recruit[]>([]);

    useEffect(() => {
        const fetchRecruits = async () => {
            const { data, error } = await supabase.from('recruits').select('*');
            if (!error && data) setRecruits(data as Recruit[]);
        };
        fetchRecruits();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="p-8 h-[calc(100vh-4rem)] overflow-x-auto">
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight"
            >
                Pipeline Board
            </motion.h1>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex gap-6 min-w-max pb-8 h-full"
            >
                {STAGES.map((stage, colIndex) => (
                    <motion.div 
                        variants={itemVariants}
                        key={stage} 
                        className="w-80 bg-slate-100/50 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-4 flex flex-col h-full shadow-sm"
                    >
                        <div className="flex justify-between items-center mb-6 px-2">
                            <h3 className="font-bold text-slate-700 uppercase tracking-wider text-sm">{stage}</h3>
                            <span className="bg-white border border-slate-200 text-slate-600 text-xs font-bold py-1 px-3 rounded-full shadow-sm">
                                {recruits.filter(r => r.stage === stage).length}
                            </span>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-3 px-1 custom-scrollbar">
                            {recruits.filter(r => r.stage === stage).map((recruit, i) => (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 + (i * 0.05) }}
                                    whileHover={{ y: -4, scale: 1.02 }}
                                    key={recruit.id} 
                                    className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-500/10 transition-all cursor-pointer group"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                                            {recruit.recruit_name.charAt(0)}
                                        </div>
                                        <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{recruit.recruit_name}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="bg-slate-50 text-slate-500 px-2.5 py-1 rounded-md text-xs font-semibold border border-slate-100">
                                            {recruit.trainer}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
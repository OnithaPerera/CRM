"use client"
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

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

    return (
        <div className="p-8 h-[calc(100vh-4rem)] overflow-x-auto bg-slate-50">
            <h1 className="text-3xl font-bold text-slate-900 mb-8 tracking-tight">Pipeline Board</h1>

            <div className="flex gap-6 min-w-max pb-8 h-full">
                {STAGES.map(stage => (
                    <div key={stage} className="w-80 bg-slate-100/50 rounded-2xl border border-slate-200 p-4 flex flex-col h-full">
                        <div className="flex justify-between items-center mb-4 px-2">
                            <h3 className="font-bold text-slate-700">{stage}</h3>
                            <span className="bg-white border border-slate-200 text-slate-600 text-xs font-bold py-1 px-2.5 rounded-full shadow-sm">
                                {recruits.filter(r => r.stage === stage).length}
                            </span>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-3 px-1">
                            {recruits.filter(r => r.stage === stage).map(recruit => (
                                <div key={recruit.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer">
                                    <p className="font-semibold text-slate-900">{recruit.recruit_name}</p>
                                    <p className="text-xs font-medium text-slate-500 mt-2">Trainer: {recruit.trainer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
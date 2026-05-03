"use client"
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const STAGES = ['New', 'Dialing', 'Stage 1', 'Stage 2', 'Stage 3', 'Closing'];

export default function PipelineView() {
    const [recruits, setRecruits] = useState([]);

    useEffect(() => {
        const fetchRecruits = async () => {
            const { data, error } = await supabase
                .from('recruits')
                .select('*');

            if (!error && data) {
                setRecruits(data);
            }
        };

        fetchRecruits();
    }, []);

    return (
        <div className="p-8 h-screen overflow-x-auto bg-gray-50">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Training Pipeline</h1>

            <div className="flex gap-6 min-w-max">
                {STAGES.map(stage => (
                    <div key={stage} className="w-80 bg-gray-100 rounded-xl p-4 flex flex-col max-h-[80vh]">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-gray-700">{stage}</h3>
                            <span className="bg-gray-200 text-gray-600 text-sm py-1 px-2 rounded-full">
                                {recruits.filter(r => r.stage === stage).length}
                            </span>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-3">
                            {recruits.filter(r => r.stage === stage).map(recruit => (
                                <div key={recruit.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:border-blue-400 transition">
                                    <p className="font-medium text-gray-900">{recruit.recruit_name}</p>
                                    <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                                        <span>{recruit.trainer}</span>
                                        {recruit.license_status && <span className="text-green-600 font-medium text-xs bg-green-50 px-2 py-1 rounded">Licensed</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
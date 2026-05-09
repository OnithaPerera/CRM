"use client"
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';

interface FormData {
    recruit_name: string;
    trainer: string;
    stage: string;
    license_status: boolean;
}

export default function AddRecruitForm() {
    const [formData, setFormData] = useState<FormData>({
        recruit_name: '',
        trainer: '',
        stage: 'New',
        license_status: false
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { data, error } = await supabase
            .from('recruits')
            .insert([formData]);

        if (error) {
            console.error("Error adding document: ", error);
            alert("Error adding recruit.");
        } else {
            alert("Recruit added successfully!");
            setFormData({ recruit_name: '', trainer: '', stage: 'New', license_status: false });
        }
    };

    return (
        <motion.form 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit} 
            className="flex flex-col h-full"
        >
            <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Add Trainee</h2>
                <p className="text-sm text-slate-500 mt-1">Quickly onboard a new recruit.</p>
            </div>

            <div className="space-y-5 flex-1">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Recruit Name</label>
                    <input
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                        value={formData.recruit_name}
                        onChange={(e) => setFormData({ ...formData, recruit_name: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Trainer</label>
                    <select
                        className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all appearance-none bg-white"
                        value={formData.trainer}
                        onChange={(e) => setFormData({ ...formData, trainer: e.target.value })}
                        required
                    >
                        <option value="" disabled>Select a Trainer...</option>
                        <option value="Kyle Connor">Kyle Connor</option>
                        <option value="Steve Villanueva">Steve Villanueva</option>
                        <option value="Carter Pronschinske">Carter Pronschinske</option>
                        <option value="Jackson Massa">Jackson Massa</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Starting Stage</label>
                    <select
                        className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all appearance-none bg-white"
                        value={formData.stage}
                        onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                    >
                        <option value="New">New</option>
                        <option value="Dialing">Dialing</option>
                        <option value="Stage 1">Stage 1</option>
                        <option value="Stage 2">Stage 2</option>
                        <option value="Stage 3">Stage 3</option>
                        <option value="Closing">Closing</option>
                    </select>
                </div>
            </div>

            <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className="mt-8 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl py-3 font-semibold shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all"
            >
                Save Recruit
            </motion.button>
        </motion.form>
    );
}

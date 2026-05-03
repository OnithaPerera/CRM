"use client"
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

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
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Trainee</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Recruit Name</label>
                <input
                    type="text"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={formData.recruit_name}
                    onChange={(e) => setFormData({ ...formData, recruit_name: e.target.value })}
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Trainer</label>
                <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={formData.trainer}
                    onChange={(e) => setFormData({ ...formData, trainer: e.target.value })}
                >
                    <option value="">Select Trainer</option>
                    <option value="Kyle Connor">Kyle Connor</option>
                    <option value="Steve Villanueva">Steve Villanueva</option>
                    <option value="Jackson Massa">Jackson Massa</option>
                </select>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
                <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
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

            <button type="submit" className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 transition">
                Save Recruit
            </button>
        </form>
    );
}

"use client"
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Users, UserCheck, TrendingUp, AlertCircle, Edit2, X } from 'lucide-react';
import AddRecruitForm from './components/AddRecruitForm'; // Assuming you have this

// Define our types
interface Recruit {
  id: string;
  recruit_name: string;
  trainer: string;
  stage: string;
}

export default function Dashboard() {
  const [recruits, setRecruits] = useState<Recruit[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRecruit, setEditingRecruit] = useState<Recruit | null>(null);

  // Fetch initial data
  useEffect(() => {
    fetchRecruits();
  }, []);

  const fetchRecruits = async () => {
    const { data, error } = await supabase.from('recruits').select('*').order('date_added', { ascending: false }).limit(5);
    if (!error && data) setRecruits(data as Recruit[]);
  };

  const openEditModal = (recruit: Recruit) => {
    setEditingRecruit(recruit);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRecruit) return;

    const { error } = await supabase
      .from('recruits')
      .update({
        recruit_name: editingRecruit.recruit_name,
        trainer: editingRecruit.trainer,
        stage: editingRecruit.stage
      })
      .eq('id', editingRecruit.id);

    if (!error) {
      setIsEditModalOpen(false);
      fetchRecruits(); // Refresh the list
    } else {
      alert('Error updating recruit.');
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto relative">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Mission Control</h1>
        <p className="text-slate-500 font-medium mt-1">Manage your pipeline and update trainee progress.</p>
      </header>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Recruits</h3>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Users size={20} /></div>
          </div>
          <div className="text-3xl font-bold text-slate-900">142</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Active Pipeline</h3>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><TrendingUp size={20} /></div>
          </div>
          <div className="text-3xl font-bold text-slate-900">48</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <AddRecruitForm />
          </div>
        </div>

        {/* Right Column: Roster */}
        <div className="col-span-1 lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900">Recent Trainees</h2>
            </div>

            <div className="divide-y divide-slate-100">
              {recruits.map((person) => (
                <div key={person.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                      {person.recruit_name?.charAt(0) || '?'}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{person.recruit_name}</p>
                      <p className="text-sm text-slate-500 font-medium">Trainer: {person.trainer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700">
                      {person.stage}
                    </span>
                    <button
                      onClick={() => openEditModal(person)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* EDIT MODAL OVERLAY */}
      {isEditModalOpen && editingRecruit && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md border border-slate-200 overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">Edit Trainee</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={editingRecruit.recruit_name}
                    onChange={(e) => setEditingRecruit({ ...editingRecruit, recruit_name: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Trainer</label>
                  <select
                    value={editingRecruit.trainer}
                    onChange={(e) => setEditingRecruit({ ...editingRecruit, trainer: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
                  >
                    <option value="Kyle Connor">Kyle Connor</option>
                    <option value="Steve Villanueva">Steve Villanueva</option>
                    <option value="Carter Pronschinske">Carter Pronschinske</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Stage</label>
                  <select
                    value={editingRecruit.stage}
                    onChange={(e) => setEditingRecruit({ ...editingRecruit, stage: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
                  >
                    <option value="New">New</option>
                    <option value="Dialing">Dialing</option>
                    <option value="Stage 1">Stage 1</option>
                    <option value="Stage 2">Stage 2</option>
                    <option value="Closing">Closing</option>
                  </select>
                </div>
              </div>
              <div className="mt-8 flex gap-3">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
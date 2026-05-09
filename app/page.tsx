"use client"
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Users, UserCheck, TrendingUp, AlertCircle, Edit2, X } from 'lucide-react';
import AddRecruitForm from './components/AddRecruitForm';
import StatCard from './components/StatCard';
import { motion, AnimatePresence } from 'framer-motion';

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
    const { data, error } = await supabase.from('recruits').select('*').order('id', { ascending: false }).limit(5);
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 max-w-[1600px] mx-auto relative"
    >
      <header className="mb-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-extrabold text-slate-900 tracking-tight"
        >
          Mission Control
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 font-medium mt-1 text-lg"
        >
          Manage your pipeline and update trainee progress.
        </motion.p>
      </header>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Recruits" value="142" trend="up" trendLabel="12 this month" icon={<Users size={20} />} delay={0.1} />
        <StatCard title="Active Pipeline" value="48" trend="up" trendLabel="4 new this week" icon={<TrendingUp size={20} />} delay={0.2} />
        <StatCard title="Licensed" value="31" icon={<UserCheck size={20} />} delay={0.3} />
        <StatCard title="Follow-ups" value="8" trend="down" trendLabel="Needs attention" icon={<AlertCircle size={20} />} delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 h-full">
            <AddRecruitForm />
          </div>
        </div>

        {/* Right Column: Roster */}
        <div className="col-span-1 lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden h-full flex flex-col"
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900">Recent Trainees</h2>
            </div>

            <div className="divide-y divide-slate-100 flex-1">
              {recruits.map((person, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (index * 0.05) }}
                  key={person.id} 
                  className="p-5 hover:bg-blue-50/50 transition-colors flex items-center justify-between group cursor-pointer"
                  onClick={() => openEditModal(person)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 flex items-center justify-center font-bold text-lg shadow-inner group-hover:scale-105 transition-transform">
                      {person.recruit_name?.charAt(0) || '?'}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">{person.recruit_name}</p>
                      <p className="text-sm text-slate-500 font-medium">Trainer: {person.trainer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-slate-200">
                      {person.stage}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); openEditModal(person); }}
                      className="p-2 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-blue-600 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-blue-100"
                    >
                      <Edit2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* EDIT MODAL OVERLAY */}
      <AnimatePresence>
        {isEditModalOpen && editingRecruit && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 flex items-center justify-center z-50 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-slate-200 overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-xl font-bold text-slate-900">Edit Trainee</h3>
                <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-rose-500 transition-colors bg-white hover:bg-rose-50 p-1.5 rounded-lg">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="p-6">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Name</label>
                    <input
                      type="text"
                      value={editingRecruit.recruit_name}
                      onChange={(e) => setEditingRecruit({ ...editingRecruit, recruit_name: e.target.value })}
                      className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Trainer</label>
                    <select
                      value={editingRecruit.trainer}
                      onChange={(e) => setEditingRecruit({ ...editingRecruit, trainer: e.target.value })}
                      className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-600 outline-none transition-all appearance-none"
                    >
                      <option value="Kyle Connor">Kyle Connor</option>
                      <option value="Steve Villanueva">Steve Villanueva</option>
                      <option value="Carter Pronschinske">Carter Pronschinske</option>
                      <option value="Jackson Massa">Jackson Massa</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Stage</label>
                    <select
                      value={editingRecruit.stage}
                      onChange={(e) => setEditingRecruit({ ...editingRecruit, stage: e.target.value })}
                      className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-600 outline-none transition-all appearance-none"
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
                <div className="mt-8 flex gap-3">
                  <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
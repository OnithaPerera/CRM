import StatCard from './components/StatCard';
import AddRecruitForm from './components/AddRecruitForm';
import { Users, UserCheck, TrendingUp, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="p-8 max-w-[1600px] mx-auto min-h-screen bg-slate-50">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Overview</h1>
        <p className="text-slate-500 font-medium mt-1">Here is the latest pulse on your recruitment pipeline.</p>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard title="Total Recruits" value="142" trend="up" trendLabel="12 this month" icon={<Users size={20} />} />
        <StatCard title="Active Pipeline" value="48" trend="up" trendLabel="4 new this week" icon={<TrendingUp size={20} />} />
        <StatCard title="Licensed" value="31" icon={<UserCheck size={20} />} />
        <StatCard title="Follow-ups" value="8" trend="down" trendLabel="Needs attention" icon={<AlertCircle size={20} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Actions */}
        <div className="col-span-1">
          <div className="bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 overflow-hidden">
            <AddRecruitForm />
          </div>
        </div>

        {/* Right Column: Priority List */}
        <div className="col-span-1 lg:col-span-2 bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">Priority Follow-ups</h2>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">View All →</button>
          </div>

          <div className="flex-1 space-y-3">
            {[
              { name: 'Gabriel Andrade', trainer: 'Carter Pronschinske', stage: 'STAGE 1', color: 'bg-amber-100 text-amber-800' },
              { name: 'Jaycee Poole', trainer: 'Connor Hogan', stage: 'STAGE 2', color: 'bg-sky-100 text-sky-800' },
              { name: 'Dane Nixon', trainer: 'Kyle Connor', stage: 'CLOSING', color: 'bg-violet-100 text-violet-800' },
              { name: 'Dylan Scott', trainer: 'Steve Villanueva', stage: 'DIALING', color: 'bg-slate-100 text-slate-800' }
            ].map((person, idx) => (
              <div key={idx} className="group flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    {person.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{person.name}</p>
                    <p className="text-sm font-medium text-slate-500">Trainer: {person.trainer}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-bold rounded-lg tracking-wide ${person.color}`}>
                  {person.stage}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
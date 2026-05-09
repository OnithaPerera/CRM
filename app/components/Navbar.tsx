"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={18} /> },
        { name: 'Pipeline', path: '/pipeline', icon: <Users size={18} /> },
        { name: 'Analytics', path: '/analytics', icon: <BarChart3 size={18} /> },
    ];

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-[1600px] mx-auto px-6 h-16 flex justify-between items-center">
                {/* Logo Area */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3"
                >
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
                        <span className="text-white font-bold text-lg">A</span>
                    </div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                        Agency<span className="text-blue-600 font-medium">CRM</span>
                    </h1>
                </motion.div>

                {/* Navigation Links */}
                <div className="flex gap-2 h-full items-center">
                    {navItems.map((item, index) => {
                        const isActive = pathname === item.path;
                        return (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="h-full"
                            >
                                <Link
                                    href={item.path}
                                    className={`relative flex items-center gap-2 px-4 h-full text-sm font-medium transition-colors ${
                                        isActive
                                            ? 'text-blue-600'
                                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50/50 rounded-t-lg'
                                    }`}
                                >
                                    {item.icon}
                                    {item.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
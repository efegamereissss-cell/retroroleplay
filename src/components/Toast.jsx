import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Toast() {
  const { toasts } = useAuth();

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 pointer-events-none max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => {
          let Icon = Info;
          let badgeColor = 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20';

          if (toast.type === 'success') {
            Icon = CheckCircle2;
            badgeColor = 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
          } else if (toast.type === 'error') {
            Icon = AlertCircle;
            badgeColor = 'text-rose-400 bg-rose-400/10 border-rose-400/20';
          } else if (toast.type === 'security') {
            Icon = ShieldCheck;
            badgeColor = 'text-purple-400 bg-purple-400/10 border-purple-400/20';
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl glass-panel shadow-2xl border border-white/10"
            >
              <div className={`p-2 rounded-xl border ${badgeColor}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 text-sm font-medium text-slate-200">
                {toast.message}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

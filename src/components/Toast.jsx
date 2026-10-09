import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, ShieldCheck } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Toast() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 pointer-events-none max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => {
          let Icon = Info;
          let badgeColor = 'text-blue-600 bg-blue-50 border-blue-200';

          if (toast.type === 'success') {
            Icon = CheckCircle2;
            badgeColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
          } else if (toast.type === 'error') {
            Icon = AlertCircle;
            badgeColor = 'text-rose-700 bg-rose-50 border-rose-200';
          } else if (toast.type === 'security') {
            Icon = ShieldCheck;
            badgeColor = 'text-purple-700 bg-purple-50 border-purple-200';
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/95 border border-slate-200 shadow-xl backdrop-blur-xl text-[#1d1d1f]"
            >
              <div className={`p-2 rounded-xl border ${badgeColor}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 text-sm font-medium text-slate-800">
                {toast.message}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

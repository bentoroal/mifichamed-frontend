import { motion } from "motion/react";

export function FeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) {
  return (
    <motion.div 
      className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-teal-200 hover:bg-teal-50/30 transition-all group"
      whileHover={{ y: -5 }}
    >
      <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-600 transition-colors">
        <span className="text-teal-600 text-3xl group-hover:text-white flex items-center justify-center">
          {icon}
        </span>
      </div>
      <h3 className="text-2xl font-bold mb-4 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

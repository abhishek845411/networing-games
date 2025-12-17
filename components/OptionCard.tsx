import React from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { Option } from '../types';
import { 
  Globe, Router, Activity, ShieldCheck, Network, 
  Workflow, Zap, ArrowUpRight, Radio, Server, Share2, Box, Cpu, Cloud
} from 'lucide-react';

interface OptionCardProps {
  option: Option;
  onDragStart: () => void;
  onDragEnd: (option: Option, point: { x: number; y: number }) => void;
  isSelected: boolean;
  disabled: boolean;
}

const OptionCard: React.FC<OptionCardProps> = ({ option, onDragStart, onDragEnd, isSelected, disabled }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Official AWS Service Colors
  const getAWSBranding = () => {
    switch (option.iconType) {
      case 'gateway': 
      case 'nat': 
      case 'vpn': 
      case 'peering':
      case 'directconnect':
      case 'transit':
      case 'egress':
        return { bg: 'bg-[#8C4FFF]', icon: <Network size={24} /> }; // Networking Purple
      
      case 'balancer': 
      case 'accelerator':
      case 'cdn':
        return { bg: 'bg-[#FF9900]', icon: <Activity size={24} /> }; // Compute Orange
      
      case 'endpoint':
        return { bg: 'bg-[#31B404]', icon: <Workflow size={24} /> }; // Storage Green
      
      default: 
        return { bg: 'bg-[#232F3E]', icon: <Server size={24} /> }; // Default AWS Dark
    }
  };

  const branding = getAWSBranding();

  return (
    <motion.div
      layout
      drag={!disabled}
      dragElastic={0.05} 
      dragSnapToOrigin={true}
      dragMomentum={false} 
      dragTransition={{ bounceStiffness: 1200, bounceDamping: 60 }}
      onDragStart={onDragStart}
      // @ts-ignore
      onDragEnd={(_, info) => onDragEnd(option, info.point)}
      whileHover={!disabled ? { scale: 1.05, y: -4, boxShadow: "0 8px 20px rgba(0,0,0,0.12)" } : {}}
      whileDrag={{ 
        scale: 1.15, 
        zIndex: 100, 
        cursor: 'grabbing', 
        boxShadow: "0 30px 60px rgba(0, 0, 0, 0.3)",
        rotate: [0, 2, -2, 0],
        transition: { rotate: { repeat: Infinity, duration: 0.2 } }
      }}
      className={`
        relative p-4 md:p-6 rounded-2xl border-2 cursor-grab select-none bg-white
        flex flex-col items-center justify-center gap-3 md:gap-4 h-36 md:h-44 w-full transition-all duration-150
        ${isSelected 
          ? 'border-green-500 ring-4 md:ring-8 ring-green-100 bg-green-50/10' 
          : 'border-gray-100 hover:border-orange-200 shadow-sm'
        }
        ${disabled && !isSelected ? 'opacity-40 cursor-not-allowed grayscale' : ''}
        touch-none
      `}
      style={{ x, y }}
    >
      <motion.div 
        animate={!disabled ? { scale: [1, 1.03, 1] } : {}}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className={`w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-white shadow-lg ${branding.bg}`}
      >
        {branding.icon}
      </motion.div>
      
      <span className="text-[9px] md:text-[11px] font-extrabold text-[#232F3E] text-center uppercase tracking-tight px-1 leading-none">
        {option.label}
      </span>
      
      {isSelected && (
        <motion.div 
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          className="absolute top-2 right-2 md:top-3 md:right-3 w-4 h-4 md:w-5 md:h-5 bg-green-500 rounded-full shadow-lg border-2 border-white flex items-center justify-center"
        >
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-pulse" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default OptionCard;
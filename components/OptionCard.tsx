
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

  // AWS Color Schemes:
  // Networking: Purple (#8C4FFF)
  // Compute/Balancing: Orange (#FF9900)
  // Storage: Green (#34A853)
  // Analytics/Database: Blue (#4285F4)
  // Security/VPC: Blue-Grey (#232F3E)
  
  const getAWSBranding = () => {
    switch (option.iconType) {
      case 'gateway': 
      case 'nat': 
      case 'vpn': 
      case 'peering':
      case 'directconnect':
      case 'transit':
        return { bg: 'bg-[#8C4FFF]', icon: option.iconType === 'nat' ? <Box size={24} /> : <Globe size={24} /> }; // Networking Purple
      
      case 'balancer': 
      case 'accelerator':
      case 'cdn':
        return { bg: 'bg-[#FF9900]', icon: <Activity size={24} /> }; // Compute Orange
      
      case 'endpoint':
        return { bg: 'bg-[#34A853]', icon: <Workflow size={24} /> }; // Storage/Integration Green
      
      default: 
        return { bg: 'bg-[#232F3E]', icon: <Server size={24} /> }; // Default AWS Dark
    }
  };

  const branding = getAWSBranding();

  return (
    <motion.div
      layout
      drag={!disabled}
      dragElastic={0.15} 
      dragSnapToOrigin={true}
      dragMomentum={false} 
      dragTransition={{ bounceStiffness: 1500, bounceDamping: 50 }}
      onDragStart={onDragStart}
      // @ts-ignore
      onDragEnd={(_, info) => onDragEnd(option, info.point)}
      whileHover={!disabled ? { scale: 1.05, y: -4, boxShadow: "0 8px 16px rgba(0,0,0,0.1)" } : {}}
      whileDrag={{ 
        scale: 1.15, 
        zIndex: 100, 
        cursor: 'grabbing', 
        boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)",
        rotate: 2
      }}
      className={`
        relative p-4 rounded-xl border-2 cursor-grab select-none bg-white
        flex flex-col items-center justify-center gap-3 h-36 w-full transition-all
        ${isSelected 
          ? 'border-green-500 ring-4 ring-green-100' 
          : 'border-gray-100 hover:border-orange-200'
        }
        ${disabled && !isSelected ? 'opacity-30 cursor-not-allowed grayscale' : ''}
      `}
      style={{ x, y }}
    >
      <motion.div 
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className={`w-14 h-14 rounded-lg flex items-center justify-center text-white shadow-sm ${branding.bg}`}
      >
        {branding.icon}
      </motion.div>
      
      <span className="text-[10px] font-black text-[#232F3E] text-center uppercase tracking-tight px-1">
        {option.label}
      </span>
      
      {isSelected && (
        <motion.div 
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          className="absolute top-2 right-2 w-4 h-4 bg-green-500 rounded-full shadow-sm border-2 border-white flex items-center justify-center"
        >
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default OptionCard;


import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cloud, Server, Globe, Database, Building2, Users, 
  Smartphone, ShieldCheck, ArrowRight
} from 'lucide-react';

interface VPCVisualizerProps {
  scenarioType: string;
  isCorrect: boolean;
  sourceLabel: string;
  destLabel: string;
  dropZoneRef: React.RefObject<HTMLDivElement | null>;
}

const VPCVisualizer: React.FC<VPCVisualizerProps> = ({ scenarioType, isCorrect, sourceLabel, destLabel, dropZoneRef }) => {
  const isPrivate = sourceLabel.toLowerCase().includes('private');
  
  // AWS Architecture Colors
  const colors = {
    vpc: "#8C4FFF",
    privateSubnet: "#0073BB",
    publicSubnet: "#31B404",
    connector: isCorrect ? "#31B404" : "#D1D5DB",
    bg: "#FAFAFA",
    text: "#232F3E"
  };

  const renderSource = () => {
    const iconClass = "w-8 h-8 text-[#545B64]";
    if (scenarioType === 'vpn') return <Building2 className={iconClass} />;
    if (scenarioType === 'load-balancing') return <Users className={iconClass} />;
    return <Server className={iconClass} />;
  };

  const renderDest = () => {
    const iconClass = "w-10 h-10 text-[#0073BB]"; 
    switch(scenarioType) {
      case 's3-private': return <Database className="w-10 h-10 text-[#31B404]" />; 
      case 'global': return <Smartphone className={iconClass} />;
      case 'hybrid': return <Building2 className="w-10 h-10 text-[#545B64]" />;
      default: return <Globe className="w-10 h-10 text-[#0073BB]" />;
    }
  };

  return (
    <div className="w-full bg-[#FAFAFA] rounded-2xl border border-gray-200 p-8 relative overflow-hidden select-none shadow-inner">
      <div className="absolute top-4 left-6 flex items-center gap-2 text-gray-400 text-[9px] font-black uppercase tracking-widest z-10">
        <Cloud size={14} className="text-[#0073BB]" />
        <span>AWS Cloud (us-east-1)</span>
      </div>

      <div className="mt-8 flex items-center justify-between relative z-10">
        {/* VPC Container */}
        <div className="flex-1 border-2 border-dashed border-[#8C4FFF]/30 rounded-2xl p-6 relative mr-16 bg-white/40">
          <span className="absolute -top-3 left-6 bg-[#8C4FFF] px-3 py-0.5 rounded-full text-[9px] font-bold text-white uppercase shadow-sm">VPC (10.0.0.0/16)</span>
          
          <div className="flex items-center justify-between gap-6 h-40">
            {/* Subnet */}
            <div 
              className="relative p-6 rounded-xl border-2 min-w-[180px] flex flex-col items-center gap-3 bg-white shadow-sm z-20"
              style={{ borderColor: isPrivate ? colors.privateSubnet : colors.publicSubnet }}
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-3 py-0.5 text-[8px] font-black uppercase tracking-wider border rounded-full"
                style={{ color: isPrivate ? colors.privateSubnet : colors.publicSubnet, borderColor: isPrivate ? colors.privateSubnet : colors.publicSubnet }}>
                {isPrivate ? 'Private' : 'Public'} Subnet
              </span>

              <div className="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
                {renderSource()}
              </div>
              <div className="text-center">
                <div className="text-xs font-black text-[#232F3E]">{sourceLabel}</div>
                <div className="text-[9px] text-gray-400 font-mono mt-0.5">10.0.1.5/24</div>
              </div>
            </div>

            {/* Gateway Zone (Drop Zone) */}
            <div className="flex-1 flex justify-center items-center relative px-2">
               <div ref={dropZoneRef} className="w-36 h-32 flex flex-col items-center justify-center relative z-20">
                  <div className={`w-full h-full rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center p-3
                    ${isCorrect ? 'bg-green-50 border-green-500' : 'bg-gray-50/50 border-gray-300'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 border
                      ${isCorrect ? 'bg-green-100 border-green-200' : 'bg-white border-gray-200 shadow-sm'}`}>
                        <ShieldCheck className={isCorrect ? "text-green-600" : "text-gray-300"} size={20} />
                    </div>
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Gateway</span>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* External Target */}
        <div className="w-28 flex flex-col items-center gap-3 shrink-0 relative z-20">
          <div className="w-20 h-20 bg-white rounded-full border-4 border-gray-50 flex items-center justify-center shadow-lg relative ring-1 ring-gray-100">
             {renderDest()}
             <div className="absolute -top-1 -right-1 w-7 h-7 bg-[#FF9900] rounded-full flex items-center justify-center border-2 border-white shadow-md">
                <ArrowRight size={14} className="text-white" />
             </div>
          </div>
          <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest text-center leading-tight max-w-[90px]">{destLabel}</span>
        </div>
      </div>

      {/* SVG Traffic Paths - Redesigned for better flow and centered height */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <marker id="arrowhead-aws" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill={colors.connector} />
          </marker>
        </defs>

        {/* Path 1: Source to Gateway */}
        <path 
          d="M 230 155 L 340 155" 
          fill="none" 
          stroke={colors.connector} 
          strokeWidth="4" 
          strokeLinecap="round"
          className={isCorrect ? "traffic-active" : ""}
        />

        {/* Path 2: Gateway to Destination */}
        <path 
          d="M 470 155 L 700 155" 
          fill="none" 
          stroke={colors.connector} 
          strokeWidth="4" 
          strokeLinecap="round"
          markerEnd="url(#arrowhead-aws)"
          className={isCorrect ? "traffic-active" : ""}
        />
      </svg>
      
      {/* Animated Traffic Particle */}
      {isCorrect && (
        <motion.div
           className="w-3 h-3 bg-green-500 rounded-full absolute z-50 shadow-[0_0_10px_rgba(52,168,83,0.8)]"
           initial={{ left: "28%", top: "148px" }}
           animate={{ left: "85%" }}
           transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  );
};

export default VPCVisualizer;

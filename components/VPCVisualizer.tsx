
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
  
  // Official AWS Diagram Colors
  const colors = {
    vpc: "#8C4FFF",
    privateSubnet: "#0073BB",
    publicSubnet: "#31B404",
    connector: isCorrect ? "#31B404" : "#D1D5DB",
    text: "#232F3E"
  };

  const renderSource = () => {
    const iconClass = "w-7 h-7 md:w-8 md:h-8 text-[#545B64]";
    if (scenarioType === 'vpn') return <Building2 className={iconClass} />;
    if (scenarioType === 'load-balancing') return <Users className={iconClass} />;
    return <Server className={iconClass} />;
  };

  const renderDest = () => {
    const iconClass = "w-9 h-9 md:w-10 md:h-10 text-[#0073BB]"; 
    switch(scenarioType) {
      case 's3-private': return <Database className="w-9 h-9 md:w-10 md:h-10 text-[#31B404]" />; 
      case 'global': return <Smartphone className={iconClass} />;
      case 'hybrid': return <Building2 className="w-9 h-9 md:w-10 md:h-10 text-[#545B64]" />;
      default: return <Globe className="w-9 h-9 md:w-10 md:h-10 text-[#0073BB]" />;
    }
  };

  return (
    <div className="w-full bg-[#FAFAFA] rounded-2xl border border-gray-200 p-6 md:p-10 relative overflow-hidden select-none shadow-inner">
      <div className="absolute top-3 left-6 flex items-center gap-2 text-gray-400 text-[8px] md:text-[10px] font-black uppercase tracking-widest z-10">
        <Cloud size={14} className="text-[#0073BB]" />
        <span>AWS Cloud (us-east-1)</span>
      </div>

      <div className="mt-8 flex items-center justify-between relative z-10">
        {/* VPC Boundary */}
        <div className="flex-1 border-2 border-dashed border-[#8C4FFF]/40 rounded-3xl p-4 md:p-6 relative mr-12 md:mr-16 bg-white/40 shadow-sm">
          <span className="absolute -top-3 left-6 bg-[#8C4FFF] px-3 py-0.5 rounded-full text-[8px] md:text-[9px] font-bold text-white uppercase shadow-sm">VPC (10.0.0.0/16)</span>
          
          <div className="flex items-center justify-between gap-4 md:gap-10 h-36 md:h-44">
            {/* Subnet Container */}
            <div 
              className="relative p-4 md:p-6 rounded-xl border-2 min-w-[150px] md:min-w-[200px] flex flex-col items-center gap-2 md:gap-4 bg-white shadow-lg z-20"
              style={{ borderColor: isPrivate ? colors.privateSubnet : colors.publicSubnet }}
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-3 py-0.5 text-[7px] md:text-[8px] font-black uppercase tracking-widest border-2 rounded-full shadow-sm"
                style={{ color: isPrivate ? colors.privateSubnet : colors.publicSubnet, borderColor: isPrivate ? colors.privateSubnet : colors.publicSubnet }}>
                {isPrivate ? 'Private' : 'Public'} Subnet
              </span>

              <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 shadow-inner">
                {renderSource()}
              </div>
              <div className="text-center">
                <div className="text-[10px] md:text-sm font-black text-[#232F3E] leading-tight">{sourceLabel}</div>
                <div className="text-[8px] md:text-[10px] text-gray-400 font-mono mt-0.5 font-bold">IP: 10.0.1.5</div>
              </div>
            </div>

            {/* Gateway Drop Zone */}
            <div className="flex-1 flex justify-center items-center relative px-2">
               <div ref={dropZoneRef} className="w-32 h-28 md:w-40 md:h-36 flex flex-col items-center justify-center relative z-20">
                  <div className={`w-full h-full rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center p-3
                    ${isCorrect ? 'bg-green-50/80 border-green-500 shadow-green-100' : 'bg-gray-50/50 border-gray-300'}`}>
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-2 border shadow-sm transition-transform duration-500
                      ${isCorrect ? 'bg-green-100 border-green-200 scale-110' : 'bg-white border-gray-100'}`}>
                        {/* Fixed: Use Tailwind responsive classes instead of non-existent md:size prop */}
                        <ShieldCheck className={`${isCorrect ? "text-green-600" : "text-gray-300"} w-5 h-5 md:w-6 md:h-6`} strokeWidth={2.5} />
                    </div>
                    <span className="text-[7px] md:text-[9px] font-black text-gray-400 uppercase tracking-widest">Gateway</span>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* External Entity */}
        <div className="w-24 md:w-32 flex flex-col items-center gap-3 md:gap-4 shrink-0 relative z-20">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full border-4 border-gray-50 flex items-center justify-center shadow-xl relative ring-1 ring-gray-100">
             {renderDest()}
             <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-7 h-7 md:w-9 md:h-9 bg-[#FF9900] rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                {/* Fixed: Use Tailwind responsive classes instead of non-existent md:size prop */}
                <ArrowRight className="text-white w-3.5 h-3.5 md:w-4.5 md:h-4.5" strokeWidth={3} />
             </div>
          </div>
          <span className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest text-center leading-tight max-w-[80px] md:max-w-[100px]">{destLabel}</span>
        </div>
      </div>

      {/* SVG Networking Visualizer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 800 350">
        <defs>
          <marker id="arrowhead-aws" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill={colors.connector} />
          </marker>
        </defs>

        {/* Improved centralized flow lines */}
        <path 
          d="M 240 175 L 340 175" 
          fill="none" 
          stroke={colors.connector} 
          strokeWidth="6" 
          strokeLinecap="round"
          className={isCorrect ? "traffic-active" : ""}
        />

        <path 
          d="M 500 175 L 685 175" 
          fill="none" 
          stroke={colors.connector} 
          strokeWidth="6" 
          strokeLinecap="round"
          markerEnd="url(#arrowhead-aws)"
          className={isCorrect ? "traffic-active" : ""}
        />
        
        {/* Animated flow markers */}
        {isCorrect && (
          <>
            <motion.circle r="4" fill="#31B404" 
              initial={{ cx: 240, cy: 175 }}
              animate={{ cx: 685 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
            <motion.circle r="4" fill="#31B404" 
              initial={{ cx: 240, cy: 175 }}
              animate={{ cx: 685 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.6 }}
            />
          </>
        )}
      </svg>
    </div>
  );
};

export default VPCVisualizer;

export interface Option {
  id: string;
  label: string;
  iconType: 'gateway' | 'nat' | 'balancer' | 'vpn' | 'peering' | 'endpoint' | 'transit' | 'egress' | 'accelerator' | 'directconnect' | 'cdn';
  correct: boolean;
  explanation: string;
}

export interface Question {
  id: string;
  title: string;
  prompt: string;
  scenarioType: 'internet-outbound' | 'internet-inbound' | 's3-private' | 'vpc-peering' | 'vpn' | 'load-balancing' | 'transit' | 'ipv6' | 'global' | 'hybrid' | 'edge';
  sourceLabel: string; // e.g., "Private VM"
  destLabel: string;   // e.g., "Internet"
  options: Option[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface GameState {
  currentQuestionIndex: number;
  score: number;
  streak: number;
  isLevelComplete: boolean;
  isErrorModalOpen: boolean;
  lastIncorrectOption: Option | null;
  selectedOptionId: string | null;
}
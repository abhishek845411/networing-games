import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    title: "Private Subnet Outbound Access",
    prompt: "A VM in a Private Subnet needs to download patches from the Internet, but must not accept incoming connections. Drag the correct component.",
    scenarioType: 'internet-outbound',
    sourceLabel: "Private VM",
    destLabel: "Internet",
    difficulty: 'beginner',
    options: [
      {
        id: "igw",
        label: "Internet Gateway",
        iconType: "gateway",
        correct: false,
        explanation: "An Internet Gateway attaches to the VPC for public subnets. It allows bidirectional traffic (in and out), exposing the VM publicly."
      },
      {
        id: "nat",
        label: "NAT Gateway",
        iconType: "nat",
        correct: true,
        explanation: "Correct! A NAT Gateway allows instances in a private subnet to connect to the internet (e.g., for updates) but prevents the internet from initiating connections to those instances."
      },
      {
        id: "alb",
        label: "Application Load Balancer",
        iconType: "balancer",
        correct: false,
        explanation: "An ALB distributes incoming application traffic across multiple targets. It does not provide outbound internet access for a single VM."
      },
      {
        id: "peering",
        label: "VPC Peering",
        iconType: "peering",
        correct: false,
        explanation: "VPC Peering connects two VPCs together. It does not provide access to the public Internet."
      }
    ]
  },
  {
    id: "q2",
    title: "Public Web Server Access",
    prompt: "You are launching a public web server that needs to serve users worldwide. It needs a public IP and a route to the Internet.",
    scenarioType: 'internet-inbound',
    sourceLabel: "Public Web Server",
    destLabel: "Internet",
    difficulty: 'beginner',
    options: [
      {
        id: "nat",
        label: "NAT Gateway",
        iconType: "nat",
        correct: false,
        explanation: "NAT Gateways are for outbound traffic only. They do not allow the outside world to initiate connections to your web server."
      },
      {
        id: "vpce",
        label: "VPC Endpoint",
        iconType: "endpoint",
        correct: false,
        explanation: "VPC Endpoints are for connecting to AWS services privately, not for general internet traffic."
      },
      {
        id: "igw",
        label: "Internet Gateway",
        iconType: "gateway",
        correct: true,
        explanation: "Correct! An Internet Gateway (IGW) enables communication between instances in your VPC and the internet."
      },
      {
        id: "vgw",
        label: "Virtual Private Gateway",
        iconType: "vpn",
        correct: false,
        explanation: "A Virtual Private Gateway is used for VPN connections to an on-premise network, not the public internet."
      }
    ]
  },
  {
    id: "q3",
    title: "Secure S3 Access",
    prompt: "Your private VM needs to upload logs to an S3 bucket. Security policy forbids traffic traversing the public internet.",
    scenarioType: 's3-private',
    sourceLabel: "Private VM",
    destLabel: "S3 Bucket",
    difficulty: 'intermediate',
    options: [
      {
        id: "igw",
        label: "Internet Gateway",
        iconType: "gateway",
        correct: false,
        explanation: "Using an IGW would require the traffic to go over the public internet, violating the security policy."
      },
      {
        id: "vpce",
        label: "Gateway Endpoint",
        iconType: "endpoint",
        correct: true,
        explanation: "Correct! A Gateway VPC Endpoint creates a private route to S3 without traffic ever leaving the Amazon network."
      },
      {
        id: "nat",
        label: "NAT Gateway",
        iconType: "nat",
        correct: false,
        explanation: "While a NAT Gateway works, the traffic technically leaves your VPC to hit the public AWS S3 endpoints. An Endpoint is more secure and cheaper."
      },
      {
        id: "alb",
        label: "Load Balancer",
        iconType: "balancer",
        correct: false,
        explanation: "Load balancers distribute traffic to VMs, they don't help VMs talk to storage services like S3."
      }
    ]
  },
  {
    id: "q4",
    title: "Connect Two VPCs",
    prompt: "You acquired a new company. You need to connect their VPC (10.1.0.0/16) to your VPC (10.0.0.0/16) securely using private IP addresses.",
    scenarioType: 'vpc-peering',
    sourceLabel: "Acquired VPC",
    destLabel: "Your VPC",
    difficulty: 'intermediate',
    options: [
      {
        id: "peering",
        label: "VPC Peering Connection",
        iconType: "peering",
        correct: true,
        explanation: "Correct! VPC Peering allows networking connections between two VPCs, enabling them to route traffic using private IPv4 addresses."
      },
      {
        id: "igw",
        label: "Internet Gateway",
        iconType: "gateway",
        correct: false,
        explanation: "Routing traffic over the internet is not secure for internal company communication and adds latency."
      },
      {
        id: "nat",
        label: "NAT Gateway",
        iconType: "nat",
        correct: false,
        explanation: "NAT Gateways are for internet access, not for connecting two private networks."
      },
      {
        id: "alb",
        label: "Application Load Balancer",
        iconType: "balancer",
        correct: false,
        explanation: "ALBs are for HTTP traffic distribution, not for networking entire VPCs together."
      }
    ]
  },
  {
    id: "q5",
    title: "Corporate Data Center VPN",
    prompt: "Employees in the corporate office need to access internal tools hosted in your VPC via a secure encrypted tunnel.",
    scenarioType: 'vpn',
    sourceLabel: "Corp Office",
    destLabel: "AWS VPC",
    difficulty: 'intermediate',
    options: [
      {
        id: "vgw",
        label: "Virtual Private Gateway",
        iconType: "vpn",
        correct: true,
        explanation: "Correct! The Virtual Private Gateway (VGW) is the VPN concentrator on the Amazon side of the Site-to-Site VPN connection."
      },
      {
        id: "igw",
        label: "Internet Gateway",
        iconType: "gateway",
        correct: false,
        explanation: "An IGW exposes resources to the public internet. It does not provide an encrypted tunnel for corporate access."
      },
      {
        id: "vpce",
        label: "VPC Endpoint",
        iconType: "endpoint",
        correct: false,
        explanation: "Endpoints are for AWS services (like S3/DynamoDB), not for connecting on-premise networks."
      },
      {
        id: "nat",
        label: "NAT Gateway",
        iconType: "nat",
        correct: false,
        explanation: "NAT Gateways are for outbound internet access, not inbound corporate VPNs."
      }
    ]
  },
  {
    id: "q6",
    title: "High Traffic Web App",
    prompt: "You have 10 web servers handling millions of requests. You need a component to distribute incoming HTTP traffic evenly among them.",
    scenarioType: 'load-balancing',
    sourceLabel: "Users",
    destLabel: "Web Servers",
    difficulty: 'advanced',
    options: [
      {
        id: "nat",
        label: "NAT Gateway",
        iconType: "nat",
        correct: false,
        explanation: "NAT is for outbound traffic. It cannot distribute inbound traffic across multiple servers."
      },
      {
        id: "alb",
        label: "Application Load Balancer",
        iconType: "balancer",
        correct: true,
        explanation: "Correct! An ALB operates at Layer 7 (HTTP/HTTPS) and distributes incoming traffic across multiple targets (EC2 instances) to ensure high availability."
      },
      {
        id: "igw",
        label: "Internet Gateway",
        iconType: "gateway",
        correct: false,
        explanation: "The IGW allows traffic into the VPC, but it doesn't balance load. It just passes packets."
      },
      {
        id: "peering",
        label: "VPC Peering",
        iconType: "peering",
        correct: false,
        explanation: "VPC Peering connects networks, it doesn't balance application traffic."
      }
    ]
  },
  {
    id: "q7",
    title: "Connect Many VPCs",
    prompt: "You have 50 VPCs and an on-premises network. You need a central hub to simplify connectivity management instead of a mesh of peering connections.",
    scenarioType: 'transit',
    sourceLabel: "50+ VPCs",
    destLabel: "On-Premises",
    difficulty: 'intermediate',
    options: [
      {
        id: "tgw",
        label: "Transit Gateway",
        iconType: "transit",
        correct: true,
        explanation: "Correct! AWS Transit Gateway connects your VPCs and on-premises networks through a central hub, simplifying your network and ending complex peering relationships."
      },
      {
        id: "peering",
        label: "VPC Peering",
        iconType: "peering",
        correct: false,
        explanation: "Managing peering connections between 50 VPCs (mesh) is complex and doesn't scale well. Transit Gateway is the better solution."
      },
      {
        id: "nat",
        label: "NAT Gateway",
        iconType: "nat",
        correct: false,
        explanation: "NAT Gateways are for internet access, not for interconnecting many private networks."
      },
      {
        id: "vpce",
        label: "VPC Endpoint",
        iconType: "endpoint",
        correct: false,
        explanation: "VPC Endpoints connect to services, not to other VPCs in a mesh."
      }
    ]
  },
  {
    id: "q8",
    title: "IPv6 Outbound Only",
    prompt: "Your IPv6-enabled instances need to access the internet for updates but should not be reachable from the internet.",
    scenarioType: 'ipv6',
    sourceLabel: "IPv6 Instance",
    destLabel: "Internet",
    difficulty: 'intermediate',
    options: [
      {
        id: "eigw",
        label: "Egress-Only Internet Gateway",
        iconType: "egress",
        correct: true,
        explanation: "Correct! An Egress-Only Internet Gateway is for IPv6 traffic. It allows outbound communication over IPv6 while preventing inbound traffic."
      },
      {
        id: "igw",
        label: "Internet Gateway",
        iconType: "gateway",
        correct: false,
        explanation: "A standard Internet Gateway allows bidirectional (in and out) traffic. It doesn't block inbound connections by default for IPv6."
      },
      {
        id: "nat",
        label: "NAT Gateway",
        iconType: "nat",
        correct: false,
        explanation: "NAT Gateways are primarily for IPv4. For IPv6, the pattern is to use an Egress-Only Internet Gateway."
      },
      {
        id: "alb",
        label: "Load Balancer",
        iconType: "balancer",
        correct: false,
        explanation: "Load balancers do not provide outbound internet access for patching."
      }
    ]
  },
  {
    id: "q9",
    title: "Private Access to SaaS",
    prompt: "You need to access a 3rd party SaaS application running in another AWS account securely, without traversing the public internet.",
    scenarioType: 'transit',
    sourceLabel: "Your VPC",
    destLabel: "SaaS Provider",
    difficulty: 'intermediate',
    options: [
      {
        id: "privatelink",
        label: "Interface VPC Endpoint",
        iconType: "endpoint",
        correct: true,
        explanation: "Correct! AWS PrivateLink (Interface Endpoint) allows you to securely access services hosted by other AWS accounts without using public IPs."
      },
      {
        id: "igw",
        label: "Internet Gateway",
        iconType: "gateway",
        correct: false,
        explanation: "Using an IGW means traffic goes over the public internet, which might violate security or compliance requirements."
      },
      {
        id: "vgw",
        label: "VPN Gateway",
        iconType: "vpn",
        correct: false,
        explanation: "VPNs are for connecting to on-premise networks, not typically used for consuming multi-tenant SaaS services efficiently."
      },
      {
        id: "nat",
        label: "NAT Gateway",
        iconType: "nat",
        correct: false,
        explanation: "NAT Gateway provides internet access. The goal here is to avoid the public internet entirely."
      }
    ]
  },
  {
    id: "q10",
    title: "Dedicated Hybrid Connection",
    prompt: "Your financial application requires a dedicated, high-bandwidth, consistent low-latency connection from your data center to AWS.",
    scenarioType: 'hybrid',
    sourceLabel: "Data Center",
    destLabel: "AWS",
    difficulty: 'advanced',
    options: [
      {
        id: "dx",
        label: "Direct Connect",
        iconType: "directconnect",
        correct: true,
        explanation: "Correct! AWS Direct Connect bypasses the public internet to establish a dedicated physical connection between your network and AWS."
      },
      {
        id: "vpn",
        label: "Site-to-Site VPN",
        iconType: "vpn",
        correct: false,
        explanation: "VPNs go over the public internet and can be subject to network jitter and lower bandwidth limits compared to a dedicated line."
      },
      {
        id: "igw",
        label: "Internet Gateway",
        iconType: "gateway",
        correct: false,
        explanation: "Internet Gateways provide public internet access, which is not a dedicated private connection."
      },
      {
        id: "tgw",
        label: "Transit Gateway",
        iconType: "transit",
        correct: false,
        explanation: "Transit Gateway helps manage connections, but the *physical* dedicated link requirement is satisfied by Direct Connect."
      }
    ]
  },
  {
    id: "q11",
    title: "Global Performance",
    prompt: "You have a mobile app with users around the world. You want to route them to the closest application endpoint using static ANYCAST IPs.",
    scenarioType: 'global',
    sourceLabel: "Global Users",
    destLabel: "App (Multi-Region)",
    difficulty: 'advanced',
    options: [
      {
        id: "aga",
        label: "Global Accelerator",
        iconType: "accelerator",
        correct: true,
        explanation: "Correct! AWS Global Accelerator uses the AWS global network to improve the performance of users' traffic by up to 60% using static IP addresses."
      },
      {
        id: "cloudfront",
        label: "CloudFront",
        iconType: "cdn",
        correct: false,
        explanation: "CloudFront is for caching content. While it improves speed, 'static anycast IPs for routing to applications' specifically describes Global Accelerator."
      },
      {
        id: "alb",
        label: "Load Balancer",
        iconType: "balancer",
        correct: false,
        explanation: "ALBs are regional. They don't provide a single global static IP for users worldwide."
      },
      {
        id: "route53",
        label: "Route 53",
        iconType: "gateway",
        correct: false,
        explanation: "Route 53 handles DNS routing, but Global Accelerator provides the static entry point IPs and traffic acceleration over the AWS backbone."
      }
    ]
  }
];
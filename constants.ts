
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
        explanation: "While an Internet Gateway provides connectivity, it is designed for Public Subnets. Using it here would require giving your VM a public IP, which exposes it to unsolicited inbound traffic from the entire internet—violating the 'outbound only' security requirement."
      },
      {
        id: "nat",
        label: "NAT Gateway",
        iconType: "nat",
        correct: true,
        explanation: "Perfect! A NAT Gateway (Network Address Translation) lives in a public subnet and acts as a middleman. It allows instances in private subnets to reach the internet for updates while blocking any outside entity from initiating a direct connection back to your private VM."
      },
      {
        id: "alb",
        label: "Application Load Balancer",
        iconType: "balancer",
        correct: false,
        explanation: "An Application Load Balancer (ALB) is a Layer 7 device designed to distribute incoming requests to a fleet of servers. It does not provide a mechanism for a server itself to initiate outbound connections to the public internet for software patches."
      },
      {
        id: "peering",
        label: "VPC Peering",
        iconType: "peering",
        correct: false,
        explanation: "VPC Peering is a networking connection between two separate VPCs that allows you to route traffic between them using private IP addresses. It does not provide a path to the public internet."
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
        explanation: "NAT Gateways are 'one-way streets' for outbound traffic. They specifically prevent external users on the internet from initiating a connection to your server, which would make your web server unreachable for your users."
      },
      {
        id: "vpce",
        label: "VPC Endpoint",
        iconType: "endpoint",
        correct: false,
        explanation: "VPC Endpoints are designed for private connectivity between your VPC and supported AWS services (like S3 or DynamoDB) without leaving the Amazon network. They do not provide general internet access."
      },
      {
        id: "igw",
        label: "Internet Gateway",
        iconType: "gateway",
        correct: true,
        explanation: "Correct! An Internet Gateway (IGW) is a horizontally scaled, redundant, and highly available VPC component that allows communication between your VPC and the internet. It supports both inbound and outbound traffic for instances with public IPs."
      },
      {
        id: "vgw",
        label: "Virtual Private Gateway",
        iconType: "vpn",
        correct: false,
        explanation: "A Virtual Private Gateway is the VPN concentrator on the Amazon side of an Amazon Site-to-Site VPN connection. It connects your VPC to your on-premises network, not the public web."
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
        explanation: "An Internet Gateway routes traffic over the public internet to reach S3's public endpoints. This fails the security requirement to keep all log traffic within a private, controlled networking path."
      },
      {
        id: "vpce",
        label: "Gateway Endpoint",
        iconType: "endpoint",
        correct: true,
        explanation: "Spot on! A Gateway VPC Endpoint for S3 adds a specific entry to your route table that directs S3 traffic through the Amazon private network backbone. No public IPs or internet traversal required, making it highly secure and cost-effective."
      },
      {
        id: "nat",
        label: "NAT Gateway",
        iconType: "nat",
        correct: false,
        explanation: "While a NAT Gateway allows a private VM to reach S3, the traffic still travels to S3's public service endpoints. Gateway Endpoints are preferred here because they provide a more direct, private, and free path to S3."
      },
      {
        id: "alb",
        label: "Load Balancer",
        iconType: "balancer",
        correct: false,
        explanation: "Load balancers handle incoming traffic from clients to servers. They have no role in helping a server communicate with an object storage service like Amazon S3."
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
        explanation: "Correct! VPC Peering creates a direct network connection between two VPCs. Traffic is encrypted and stays on the global AWS backbone, allowing instances in either VPC to communicate as if they were on the same private network."
      },
      {
        id: "igw",
        label: "Internet Gateway",
        iconType: "gateway",
        correct: false,
        explanation: "Routing traffic over the public internet using an IGW would require public IPs, VPNs, or complex NAT setups. Peering is the native, more secure, and higher-performance way to bridge two VPCs."
      },
      {
        id: "nat",
        label: "NAT Gateway",
        iconType: "nat",
        correct: false,
        explanation: "NAT Gateways provide internet access for private subnets. They cannot be used to establish a private, bidirectional networking link between two distinct VPCs."
      },
      {
        id: "alb",
        label: "Application Load Balancer",
        iconType: "balancer",
        correct: false,
        explanation: "An ALB sits in front of applications to balance web traffic. It does not provide the underlying network routing required to connect two VPC infrastructures together."
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
        explanation: "Exactly! The Virtual Private Gateway (VGW) acts as the 'VPN hub' on the AWS side. It terminates the encrypted IPsec tunnel coming from your office's Customer Gateway, bridging your on-premise network with your cloud VPC."
      },
      {
        id: "igw",
        label: "Internet Gateway",
        iconType: "gateway",
        correct: false,
        explanation: "An Internet Gateway is for public internet communication. While a VPN travels *over* the internet, the IGW itself doesn't handle the encryption, tunneling, or authentication required for a corporate VPN."
      },
      {
        id: "vpce",
        label: "VPC Endpoint",
        iconType: "endpoint",
        correct: false,
        explanation: "VPC Endpoints are used to access AWS services privately. They cannot be used to connect an external physical office or data center to your VPC."
      },
      {
        id: "nat",
        label: "NAT Gateway",
        iconType: "nat",
        correct: false,
        explanation: "NAT Gateways help private cloud instances reach the internet. They do not facilitate inbound encrypted connections from a corporate office to internal cloud tools."
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
        explanation: "NAT Gateways translate internal private IPs to a single public IP for outbound requests. They lack the logic to inspect incoming HTTP headers or distribute requests across a pool of servers."
      },
      {
        id: "alb",
        label: "Application Load Balancer",
        iconType: "balancer",
        correct: true,
        explanation: "Correct! An ALB works at the Application Layer (Layer 7). It can inspect the content of requests (like URL paths or host headers) and intelligently route them to healthy servers in your target group, ensuring high availability and scalability."
      },
      {
        id: "igw",
        label: "Internet Gateway",
        iconType: "gateway",
        correct: false,
        explanation: "The IGW is like the front door to the VPC—it lets traffic in, but it doesn't know how to distribute that traffic to specific servers. You need a Load Balancer behind the door to manage the crowd."
      },
      {
        id: "peering",
        label: "VPC Peering",
        iconType: "peering",
        correct: false,
        explanation: "VPC Peering connects two networks. It doesn't have any application-aware load balancing capabilities to handle millions of user requests."
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
        explanation: "Spot on! AWS Transit Gateway acts as a cloud router. Instead of creating thousands of individual peering connections (a 'mesh'), every VPC and VPN connects to the Transit Gateway hub, greatly simplifying management and routing."
      },
      {
        id: "peering",
        label: "VPC Peering",
        iconType: "peering",
        correct: false,
        explanation: "Connecting 50 VPCs via peering would require 1,225 separate connections to create a full mesh. This is an operational nightmare to maintain, which is why Transit Gateway was created."
      },
      {
        id: "nat",
        label: "NAT Gateway",
        iconType: "nat",
        correct: false,
        explanation: "NAT Gateways are for internet access within a single VPC. They cannot route traffic between dozens of different VPCs or back to a data center."
      },
      {
        id: "vpce",
        label: "VPC Endpoint",
        iconType: "endpoint",
        correct: false,
        explanation: "VPC Endpoints connect a VPC to an AWS service. They are not designed for large-scale interconnectivity between many different VPCs and on-premises environments."
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
        explanation: "Correct! IPv6 addresses are public by default. To allow outbound connectivity while preventing inbound connections for IPv6, you use an Egress-Only Internet Gateway—essentially a NAT Gateway equivalent for the IPv6 world."
      },
      {
        id: "igw",
        label: "Internet Gateway",
        iconType: "gateway",
        correct: false,
        explanation: "In an IPv6 environment, a standard Internet Gateway allows bidirectional traffic. Because IPv6 instances don't use NAT, they would be globally reachable from the internet, which violates the 'outbound only' requirement."
      },
      {
        id: "nat",
        label: "NAT Gateway",
        iconType: "nat",
        correct: false,
        explanation: "NAT Gateways are an IPv4 technology used to map private IPs to a public IP. IPv6 was designed with enough addresses to avoid NAT entirely, using Egress-Only IGWs for security instead."
      },
      {
        id: "alb",
        label: "Load Balancer",
        iconType: "balancer",
        correct: false,
        explanation: "Load balancers handle inbound traffic distribution. They do not provide a path for internal instances to reach out to the internet for software updates."
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
        explanation: "Excellent! AWS PrivateLink allows you to consume services (SaaS) over a private Interface Endpoint. The service appears as an IP address in your own VPC, and traffic never touches the public internet."
      },
      {
        id: "igw",
        label: "Internet Gateway",
        iconType: "gateway",
        correct: false,
        explanation: "Using an IGW would require the SaaS provider to expose their service publicly. This would send your sensitive data across the public internet, which is less secure than using PrivateLink."
      },
      {
        id: "vgw",
        label: "VPN Gateway",
        iconType: "vpn",
        correct: false,
        explanation: "VPNs are great for connecting private offices, but they aren't the standard way to consume third-party SaaS applications hosted on AWS. PrivateLink is more scalable and easier to manage for service consumption."
      },
      {
        id: "nat",
        label: "NAT Gateway",
        iconType: "nat",
        correct: false,
        explanation: "A NAT Gateway allows your VPC to reach public endpoints on the internet. Since the goal is to reach the SaaS provider *without* using the public internet, NAT is not the right choice."
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
        explanation: "Correct! AWS Direct Connect is a cloud service solution that makes it easy to establish a dedicated network connection from your premises to AWS. Using a 1Gbps or 10Gbps dedicated link provides much more consistent performance than a VPN."
      },
      {
        id: "vpn",
        label: "Site-to-Site VPN",
        iconType: "vpn",
        correct: false,
        explanation: "Site-to-Site VPNs are easy to set up but travel over the public internet. This means bandwidth and latency fluctuate based on internet congestion, which doesn't meet the 'consistent low-latency' requirement for a high-end financial app."
      },
      {
        id: "igw",
        label: "Internet Gateway",
        iconType: "gateway",
        correct: false,
        explanation: "An Internet Gateway provides a path to the public internet, not a private, dedicated physical link to your own data center."
      },
      {
        id: "tgw",
        label: "Transit Gateway",
        iconType: "transit",
        correct: false,
        explanation: "Transit Gateway is a hub for connecting VPCs and VPNs. While it's useful for routing, it doesn't provide the actual physical dedicated wire that Direct Connect offers."
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
        explanation: "Perfect! AWS Global Accelerator provides two static IP addresses that act as a fixed entry point to your application. It uses the global AWS network to route your users to the nearest healthy application endpoint, reducing latency and jitter."
      },
      {
        id: "cloudfront",
        label: "CloudFront",
        iconType: "cdn",
        correct: false,
        explanation: "CloudFront is a Content Delivery Network (CDN) primarily used for caching static content at the edge. Global Accelerator is designed specifically for accelerating TCP/UDP traffic to application endpoints using anycast IPs."
      },
      {
        id: "alb",
        label: "Load Balancer",
        iconType: "balancer",
        correct: false,
        explanation: "ALBs are regional resources. While they balance traffic within a region, they don't provide a single global entry point or accelerate traffic across the global AWS backbone like Global Accelerator does."
      },
      {
        id: "route53",
        label: "Route 53",
        iconType: "gateway",
        correct: false,
        explanation: "Route 53 is a DNS service. While it can perform 'latency-based routing' to different regions, it doesn't provide the dedicated network acceleration or static anycast IPs that Global Accelerator provides."
      }
    ]
  }
];

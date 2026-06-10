

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: "research" | "pentest" | "ctf" | "cloud" | "ai";
  categoryLabel: string;
  categoryColor: string;
  featured?: boolean;
  tags: string[];
  externalLink?: string;
  statusMessage?: string;
  contributors?: { name: string; role?: string; link?: string }[];
};

export const POSTS: BlogPost[] = [
  {
    slug: "research-paper-1",
    title: "A Comprehensive Survey on Artificial Intelligence in Drug Discovery and Pharmaceutical Research",
    excerpt: "Explores the impact of Artificial Intelligence in accelerating drug discovery, pharmaceutical research, and modern healthcare innovation.",
    date: "Jul 2025",
    readTime: "10 min read",
    category: "research",
    categoryLabel: "Research",
    categoryColor: "#00E5FF", // Cyan
    tags: ["Artificial Intelligence", "Research", "Biotech", "Drug Discovery"],
    externalLink: "https://www.store.bookrivers.com/product/national-conference-on-recent-trends-in-engineering-science-and-technology-ncrtest-25/",
    statusMessage: "This research paper was published as part of a larger anthology/book. You can read the full publication at the external link below.",
    contributors: [
      { name: "Bhanu Kiran R", role: "Co-Author", link: "https://www.linkedin.com/in/bhanu-kiran-r/" },
      { name: "Nithin S", role: "Co-Author", link: "https://www.linkedin.com/in/nithin-s-67a8802a5/" }
    ],
  },
  {
    slug: "research-paper-2",
    title: "HylexCrypt TU2050: A Unified Hybrid Steganography–Cryptography Framework with Adaptive Embedding, Authenticated Encryption, and Operational Security Features",
    excerpt: "HylexCrypt addresses critical gaps in existing open-source steganography tools (Steghide,OpenStego, OutGuess) by integrating: Argon2id memory-hard key derivation, dual-modeauthenticated encryption (ChaCha20-Poly1305 / AES-256-GCM), adaptive LSB steganographic embedding for PNG and WAV carriers, Reed-Solomon forward error correction, logical payload expiry with automated wipe scheduling, and device-binding via hardware fingerprinting.",
    date: "Jun 2026",
    readTime: "15 min read",
    category: "research",
    categoryLabel: "Research",
    categoryColor: "#1072e9ff", // Neon Green
    tags: ["steganography", "cryptography", "Python", "information hiding", "Encryption/Decryption", "Research"],
    externalLink: "https://doi.org/10.5281/zenodo.20622278",
    statusMessage: "This paper is published research artifact available on Zenodo. You can read the full publication at the external link below.",
    contributors: [
      { name: "Nithin S", role: "Co-Author", link: "https://www.linkedin.com/in/nithin-s-67a8802a5/" }
    ],
  },
  {
    slug: "research-paper-3",
    title: "Rudras: A Cognitive Immunological Defense Firewall for Zero-Trust, AI-Native Network Protection",
    excerpt: "The work introduces a unified, AI-driven cybersecurity firewall system inspired by immunological principles, designed to deliver adaptive and proactive defense across modern network environments.",
    date: "May 2026",
    readTime: "15 min read",
    category: "research",
    categoryLabel: "Research",
    categoryColor: "#00FF66", // Neon Green
    featured: true, // Makes this the big featured article at the top
    tags: ["Networks", "AI-Native", "Firewalls", "Zero-Trust", "Cybersecurity", "Research"],
    statusMessage: "This paper is currently pending publication. The full article will be available here soon.",
  },
];

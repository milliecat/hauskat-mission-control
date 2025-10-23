import {
  Rocket, Layers, Calendar, CheckSquare, GitBranch, Target,
  Sparkles, FlaskConical, Users, DollarSign, Database, Map,
  List, FileText, AlertCircle, BookOpen
} from 'lucide-react';

/**
 * Section configuration for Mission Control
 */
export const SECTIONS = {
  overview: {
    title: 'Mission Control',
    icon: Rocket,
    color: 'purple',
    description: 'Command center & progress',
  },
  integration: {
    title: 'Integration Map',
    icon: Layers,
    color: 'cyan',
    description: 'How all layers connect',
  },
  action90: {
    title: '90-Day Action Plan',
    icon: Calendar,
    color: 'green',
    description: 'Week-by-week execution',
  },
  gaps: {
    title: 'Gap Analysis',
    icon: CheckSquare,
    color: 'orange',
    description: 'What we still need to build',
  },
  decisions: {
    title: 'Decisions Tracker',
    icon: GitBranch,
    color: 'yellow',
    description: 'Technical & business choices',
  },
  vision: {
    title: 'Vision & Strategy',
    icon: Target,
    color: 'blue',
    description: 'Brand, mission, positioning',
  },
  features: {
    title: 'Features & Functions',
    icon: Sparkles,
    color: 'green',
    description: 'All features from MVP to dream',
  },
  research: {
    title: 'Research & Data',
    icon: FlaskConical,
    color: 'orange',
    description: 'Pet passport, citizen science',
  },
  community: {
    title: 'Community & Content',
    icon: Users,
    color: 'pink',
    description: 'Knowledge hub, virality',
  },
  business: {
    title: 'Business Model',
    icon: DollarSign,
    color: 'yellow',
    description: 'Revenue streams, growth',
  },
  technical: {
    title: 'Technical Architecture',
    icon: Database,
    color: 'indigo',
    description: 'Tech stack, integrations',
  },
  roadmap: {
    title: 'Roadmap & Launch',
    icon: Map,
    color: 'red',
    description: 'Timeline, priorities',
  },
  devSprints: {
    title: 'Dev Sprint Board',
    icon: List,
    color: 'cyan',
    description: 'Actionable dev tickets & sprints',
  },
  teamSync: {
    title: 'Team Sync',
    icon: Users,
    color: 'green',
    description: 'Daily status & blockers',
  },
  techSpecs: {
    title: 'Technical Specs',
    icon: FileText,
    color: 'indigo',
    description: 'APIs, schemas, architecture',
  },
  risks: {
    title: 'Risks & Blockers',
    icon: AlertCircle,
    color: 'red',
    description: 'Issues & dependencies',
  },
  changelog: {
    title: 'Decision Log',
    icon: BookOpen,
    color: 'purple',
    description: 'Why & when decisions made',
  },
};

/**
 * Get color classes safely (Tailwind JIT-compatible)
 */
export const COLOR_CLASSES = {
  purple: {
    bg: 'bg-purple-100',
    bgDark: 'bg-purple-500',
    text: 'text-purple-700',
    textDark: 'text-purple-600',
    border: 'border-purple-200',
  },
  cyan: {
    bg: 'bg-cyan-100',
    bgDark: 'bg-cyan-500',
    text: 'text-cyan-700',
    textDark: 'text-cyan-600',
    border: 'border-cyan-200',
  },
  green: {
    bg: 'bg-green-100',
    bgDark: 'bg-green-500',
    text: 'text-green-700',
    textDark: 'text-green-600',
    border: 'border-green-200',
  },
  orange: {
    bg: 'bg-orange-100',
    bgDark: 'bg-orange-500',
    text: 'text-orange-700',
    textDark: 'text-orange-600',
    border: 'border-orange-200',
  },
  yellow: {
    bg: 'bg-yellow-100',
    bgDark: 'bg-yellow-500',
    text: 'text-yellow-700',
    textDark: 'text-yellow-600',
    border: 'border-yellow-200',
  },
  blue: {
    bg: 'bg-blue-100',
    bgDark: 'bg-blue-500',
    text: 'text-blue-700',
    textDark: 'text-blue-600',
    border: 'border-blue-200',
  },
  pink: {
    bg: 'bg-pink-100',
    bgDark: 'bg-pink-500',
    text: 'text-pink-700',
    textDark: 'text-pink-600',
    border: 'border-pink-200',
  },
  indigo: {
    bg: 'bg-indigo-100',
    bgDark: 'bg-indigo-500',
    text: 'text-indigo-700',
    textDark: 'text-indigo-600',
    border: 'border-indigo-200',
  },
  red: {
    bg: 'bg-red-100',
    bgDark: 'bg-red-500',
    text: 'text-red-700',
    textDark: 'text-red-600',
    border: 'border-red-200',
  },
};

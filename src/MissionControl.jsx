import React, { useState, useEffect } from 'react';
import {
  Cat, Heart, Brain, Users, Sparkles, TrendingUp, Shield,
  Globe, Zap, Database, BookOpen, Target, DollarSign, Rocket,
  ChevronRight, Menu, X, Search, Star, AlertCircle, CheckCircle,
  Calendar, Map, Building2, Stethoscope, FlaskConical, PenTool,
  Gamepad2, Share2, Lock, Award, MessageSquare, BarChart3,
  Clock, Layers, GitBranch, Package, CheckSquare, Circle,
  PlayCircle, PauseCircle, XCircle, List, Inbox, ArrowRight,
  TrendingDown, Activity, FileText, Settings
} from 'lucide-react';
import HauskatIcon from './HauskatIcon';

const HauskatMissionControlV45 = () => {
  // Load state from localStorage on mount
  const loadState = (key, defaultValue) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch (e) {
      console.error('Error loading state:', e);
      return defaultValue;
    }
  };

  const [activeSection, setActiveSection] = useState(() => loadState('activeSection', 'overview'));
  const [sidebarOpen, setSidebarOpen] = useState(() => loadState('sidebarOpen', true));
  const [searchTerm, setSearchTerm] = useState('');
  const [completedItems, setCompletedItems] = useState(() => {
    const saved = loadState('completedItems', []);
    return new Set(saved);
  });
  const [activePhase, setActivePhase] = useState(() => loadState('activePhase', 'planning')); // planning, week1-12, launched

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('activeSection', JSON.stringify(activeSection));
  }, [activeSection]);

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  useEffect(() => {
    localStorage.setItem('completedItems', JSON.stringify([...completedItems]));
  }, [completedItems]);

  useEffect(() => {
    localStorage.setItem('activePhase', JSON.stringify(activePhase));
  }, [activePhase]);

  // Enhanced navigation structure with new v4 sections
  const sections = {
    overview: { 
      title: 'Mission Control', 
      icon: Rocket, 
      color: 'purple',
      description: 'Command center & progress'
    },
    integration: {
      title: 'Integration Map',
      icon: Layers,
      color: 'cyan',
      description: 'How all layers connect'
    },
    action90: {
      title: '90-Day Action Plan',
      icon: Calendar,
      color: 'green',
      description: 'Week-by-week execution'
    },
    gaps: {
      title: 'Gap Analysis',
      icon: CheckSquare,
      color: 'orange',
      description: 'What we still need to build'
    },
    decisions: {
      title: 'Decisions Tracker',
      icon: GitBranch,
      color: 'yellow',
      description: 'Technical & business choices'
    },
    vision: { 
      title: 'Vision & Strategy', 
      icon: Target, 
      color: 'blue',
      description: 'Brand, mission, positioning'
    },
    features: { 
      title: 'Features & Functions', 
      icon: Sparkles, 
      color: 'green',
      description: 'All features from MVP to dream'
    },
    research: { 
      title: 'Research & Data', 
      icon: FlaskConical, 
      color: 'orange',
      description: 'Pet passport, citizen science'
    },
    community: { 
      title: 'Community & Content', 
      icon: Users, 
      color: 'pink',
      description: 'Knowledge hub, virality'
    },
    business: { 
      title: 'Business Model', 
      icon: DollarSign, 
      color: 'yellow',
      description: 'Revenue streams, growth'
    },
    technical: { 
      title: 'Technical Architecture', 
      icon: Database, 
      color: 'indigo',
      description: 'Tech stack, integrations'
    },
    roadmap: {
      title: 'Roadmap & Launch',
      icon: Map,
      color: 'red',
      description: 'Timeline, priorities'
    },
    devSprints: {
      title: 'Dev Sprint Board',
      icon: List,
      color: 'cyan',
      description: 'Actionable dev tickets & sprints'
    },
    teamSync: {
      title: 'Team Sync',
      icon: Users,
      color: 'green',
      description: 'Daily status & blockers'
    },
    techSpecs: {
      title: 'Technical Specs',
      icon: FileText,
      color: 'indigo',
      description: 'APIs, schemas, architecture'
    },
    risks: {
      title: 'Risks & Blockers',
      icon: AlertCircle,
      color: 'red',
      description: 'Issues & dependencies'
    },
    changelog: {
      title: 'Decision Log',
      icon: BookOpen,
      color: 'purple',
      description: 'Why & when decisions made'
    },
  };

  // Toggle completion status
  const toggleComplete = (itemId) => {
    setCompletedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  // Calculate completion percentage
  const calculateCompletion = (items) => {
    if (!items || items.length === 0) return 0;
    const completed = items.filter(item => completedItems.has(item.id)).length;
    return Math.round((completed / items.length) * 100);
  };

  // Enhanced Overview Dashboard
  const OverviewDashboard = () => {
    const gapItems = [
      { id: 'gap-user-research', category: 'User Research' },
      { id: 'gap-tech-plan', category: 'Technical Plan' },
      { id: 'gap-design-system', category: 'Design System' },
      { id: 'gap-legal', category: 'Legal Docs' },
      { id: 'gap-content', category: 'Content Strategy' }
    ];
    
    const actionItems = [
      { id: 'action-w1', category: 'Week 1-2' },
      { id: 'action-w3', category: 'Week 3-4' },
      { id: 'action-w5', category: 'Week 5-6' },
      { id: 'action-w7', category: 'Week 7-8' }
    ];

    return (
      <div className="space-y-6">
        {/* Hero Section with Real-Time Status */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-8">
          <div className="flex items-center gap-4 mb-4">
            <Cat className="w-12 h-12" />
            <Heart className="w-8 h-8 animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Hauskat Mission Control v4.5</h1>
          <p className="text-xl opacity-90">The Emotional Operating System for Cat Care</p>
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-white/20 backdrop-blur rounded-lg p-3">
              <div className="text-sm opacity-80">Current Phase</div>
              <div className="font-bold text-lg">🚀 Active Development</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg p-3">
              <div className="text-sm opacity-80">Recent Focus</div>
              <div className="font-bold text-lg">3D Cat Game + Multiplayer</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg p-3">
              <div className="text-sm opacity-80">Recent Commits</div>
              <div className="font-bold text-lg">15+ on 3D features</div>
            </div>
          </div>
        </div>

        {/* Integration Status Overview */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-6 border-2 border-green-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-700">Complete</h3>
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">6/8</div>
            <div className="text-sm text-gray-600">Strategic foundations ready</div>
            <div className="mt-3 text-xs text-gray-500">
              ✅ Integration Plan<br/>
              ✅ Brand Strategy<br/>
              ✅ Pet Passport Research<br/>
              ✅ Mission Control<br/>
              ✅ Day 1 Experience<br/>
              ✅ Learning Game
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-orange-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-700">In Progress</h3>
              <Activity className="w-6 h-6 text-orange-500" />
            </div>
            <div className="text-3xl font-bold text-orange-600 mb-2">8</div>
            <div className="text-sm text-gray-600">Critical gaps to address</div>
            <div className="mt-3 text-xs text-gray-500">
              🔶 User Validation<br/>
              🔶 Technical Implementation<br/>
              🔶 Visual Design System<br/>
              🔶 Content Production
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-700">MVP Timeline</h3>
              <Clock className="w-6 h-6 text-blue-500" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
            <div className="text-sm text-gray-600">Weeks to beta launch</div>
            <div className="mt-3 text-xs text-gray-500">
              Week 1-4: Profile Builder<br/>
              Week 5-8: Community Layer<br/>
              Week 9-12: Polish & Launch
            </div>
          </div>
        </div>

        {/* Quick Action Items */}
        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">🎯 This Week's Priorities</h3>
            <span className="text-sm text-gray-500">Week of Oct 22, 2025</span>
          </div>
          <div className="space-y-3">
            {[
              { task: 'Continue optimizing 3D cat game performance', priority: 'HIGH', status: 'in-progress' },
              { task: 'Enhance multiplayer zone system stability', priority: 'HIGH', status: 'in-progress' },
              { task: 'Add more zones beyond Home and Town', priority: 'MEDIUM', status: 'pending' },
              { task: 'Implement additional cat customization options', priority: 'MEDIUM', status: 'pending' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 text-purple-600 rounded"
                  onChange={() => toggleComplete(`week-action-${idx}`)}
                  checked={completedItems.has(`week-action-${idx}`)}
                />
                <div className="flex-1">
                  <div className={completedItems.has(`week-action-${idx}`) ? 'line-through text-gray-400' : ''}>
                    {item.task}
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                  item.priority === 'HIGH' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {item.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* System Integration Health */}
        <div className="bg-white rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">🔗 System Integration Health</h3>
          <div className="space-y-4">
            {[
              { layer: 'Layer 1: Identity (Loafi Profiles + 3D Cats)', status: 85, color: 'purple' },
              { layer: 'Layer 2: Data Generation (Wellness)', status: 60, color: 'blue' },
              { layer: 'Layer 3: Intelligence (Knowledge Hub)', status: 70, color: 'green' },
              { layer: 'Layer 4: Utility (Pet Passport)', status: 40, color: 'yellow' },
              { layer: 'Layer 5: Transactions (Marketplace)', status: 20, color: 'orange' }
            ].map((layer, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{layer.layer}</span>
                  <span className="text-sm text-gray-500">{layer.status}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`bg-${layer.color}-500 h-3 rounded-full transition-all`}
                    style={{ width: `${layer.status}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Metrics Dashboard */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Core Features', current: '6/12', target: '12/12', icon: Sparkles },
            { label: 'Recent Commits', current: '15+', target: 'Ongoing', icon: Activity },
            { label: '3D Game Status', current: 'Active', target: 'Polish', icon: Gamepad2 },
            { label: 'Tech Stack', current: 'Updated', target: 'Next 15', icon: Rocket }
          ].map((metric, idx) => (
            <div key={idx} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4">
              <metric.icon className="w-6 h-6 text-purple-600 mb-2" />
              <div className="text-sm text-gray-600 mb-1">{metric.label}</div>
              <div className="text-2xl font-bold text-gray-900">{metric.current}</div>
              <div className="text-xs text-gray-500">Target: {metric.target}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Integration Map Section - NEW in v4
  const IntegrationMap = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-2">🔗 Integration Map</h2>
        <p>How all the pieces fit together into one coherent system</p>
      </div>

      {/* The Master System Visualization */}
      <div className="bg-white rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-6 text-center">The Emotional Operating System</h3>
        <div className="space-y-6">
          {[
            {
              layer: 'Layer 1: Identity',
              name: 'Profiles',
              description: 'MySpace for cats - Customizable profiles, emotional storytelling, community identity',
              features: ['Profile customization', 'Themes & CSS', 'Bio & personality', 'Photo galleries'],
              value: 'Expression & Belonging',
              color: 'purple',
              status: 'MVP Core'
            },
            {
              layer: 'Layer 2: Data Generation',
              name: 'Wellness Tracking',
              description: 'Daily mood & enrichment logging - Health observations, care patterns, insights',
              features: ['Daily check-ins', 'Mood tracking', 'Energy levels', 'Pattern analytics'],
              value: 'Understanding & Awareness',
              color: 'blue',
              status: 'MVP Core'
            },
            {
              layer: 'Layer 3: Intelligence',
              name: 'Knowledge Hub',
              description: 'AI-powered Q&A - Pattern recognition, community wisdom, expert answers',
              features: ['50 seed Q&As', 'Community answers', 'Expert badges', 'Upvoting system'],
              value: 'Learning & Trust',
              color: 'green',
              status: 'MVP Core'
            },
            {
              layer: 'Layer 4: Utility',
              name: 'Pet Passport',
              description: 'Travel compliance - Health records, emergency access, peace of mind',
              features: ['Basic health records', 'Vaccination upload', 'Vet contacts', 'QR codes'],
              value: 'Freedom & Security',
              color: 'yellow',
              status: 'Phase 2'
            },
            {
              layer: 'Layer 5: Transactions',
              name: 'Sitter Marketplace',
              description: 'Professional care - Monetization, network effects, quality assurance',
              features: ['Sitter matching', 'Booking system', 'Reviews', 'Payment processing'],
              value: 'Quality & Sustainability',
              color: 'orange',
              status: 'Phase 4'
            }
          ].map((layer, idx) => (
            <div key={idx} className="relative">
              <div className={`bg-${layer.color}-50 border-2 border-${layer.color}-200 rounded-lg p-6`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-sm font-semibold text-gray-500 mb-1">{layer.layer}</div>
                    <h4 className="text-xl font-bold text-gray-900">{layer.name}</h4>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    layer.status === 'MVP Core' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {layer.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{layer.description}</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {layer.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-center gap-2 text-xs">
                      <div className={`w-1.5 h-1.5 bg-${layer.color}-500 rounded-full`} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className={`w-4 h-4 text-${layer.color}-600`} />
                  <span className="text-sm font-medium text-gray-700">{layer.value}</span>
                </div>
              </div>
              {idx < 4 && (
                <div className="flex justify-center my-2">
                  <ArrowRight className="w-6 h-6 text-gray-400 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6">
          <h4 className="font-bold text-lg mb-3">🔄 The Data Loop</h4>
          <div className="text-sm space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-purple-600">1</div>
              <span>Profiles → Expression gets users in</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-blue-600">2</div>
              <span>Wellness → Data generation keeps them engaged</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-green-600">3</div>
              <span>Community → Belonging creates retention</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-yellow-600">4</div>
              <span>Knowledge Hub → Learning builds trust</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-orange-600">5</div>
              <span>Loops back to Layer 1 → Better data → Better insights → More value</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 90-Day Action Plan Section - NEW in v4
  const Action90Day = () => {
    const weeks = [
      {
        period: 'Week 1-2',
        title: 'Foundation',
        color: 'blue',
        tasks: [
          { id: 'w1-env', task: 'Set up development environment', priority: 'HIGH' },
          { id: 'w1-db', task: 'Database schema for profiles + wellness', priority: 'HIGH' },
          { id: 'w1-auth', task: 'Auth system (email + social login)', priority: 'HIGH' },
          { id: 'w1-profile', task: 'Basic profile creation flow', priority: 'MEDIUM' }
        ]
      },
      {
        period: 'Week 3-4',
        title: 'Profile Builder',
        color: 'purple',
        tasks: [
          { id: 'w3-upload', task: 'Photo upload + gallery', priority: 'HIGH' },
          { id: 'w3-bio', task: 'Bio editor with rich text', priority: 'MEDIUM' },
          { id: 'w3-themes', task: 'Theme system (3 starter themes)', priority: 'HIGH' },
          { id: 'w3-url', task: 'Profile URL slugs', priority: 'MEDIUM' },
          { id: 'w3-share', task: 'Share functionality', priority: 'MEDIUM' }
        ]
      },
      {
        period: 'Week 5-6',
        title: 'Wellness Tracking',
        color: 'green',
        tasks: [
          { id: 'w5-checkin', task: 'Daily mood check-in interface', priority: 'HIGH' },
          { id: 'w5-energy', task: 'Energy level tracking', priority: 'HIGH' },
          { id: 'w5-notes', task: 'Quick notes + photos', priority: 'MEDIUM' },
          { id: 'w5-calendar', task: 'Calendar view of history', priority: 'MEDIUM' },
          { id: 'w5-analytics', task: 'Simple analytics dashboard', priority: 'LOW' }
        ]
      },
      {
        period: 'Week 7-8',
        title: 'Community Layer',
        color: 'pink',
        tasks: [
          { id: 'w7-groups', task: 'Local group creation', priority: 'HIGH' },
          { id: 'w7-qa', task: 'Q&A thread system', priority: 'HIGH' },
          { id: 'w7-seed', task: 'Seed 50 questions from research', priority: 'HIGH' },
          { id: 'w7-voting', task: 'Upvoting + commenting', priority: 'MEDIUM' },
          { id: 'w7-follow', task: 'User profiles + following', priority: 'LOW' }
        ]
      },
      {
        period: 'Week 9-10',
        title: 'Gamification',
        color: 'yellow',
        tasks: [
          { id: 'w9-streak', task: 'Streak tracking system', priority: 'HIGH' },
          { id: 'w9-badges', task: 'Badge infrastructure', priority: 'MEDIUM' },
          { id: 'w9-packs', task: '"Pack" system for collectibles', priority: 'MEDIUM' },
          { id: 'w9-completion', task: 'Profile completion percentage', priority: 'LOW' },
          { id: 'w9-leaderboard', task: 'Leaderboard (optional)', priority: 'LOW' }
        ]
      },
      {
        period: 'Week 11-12',
        title: 'Polish + Launch',
        color: 'orange',
        tasks: [
          { id: 'w11-mobile', task: 'Mobile responsive testing', priority: 'HIGH' },
          { id: 'w11-perf', task: 'Performance optimization', priority: 'HIGH' },
          { id: 'w11-onboard', task: 'Onboarding flow refinement', priority: 'HIGH' },
          { id: 'w11-email', task: 'Email notifications', priority: 'MEDIUM' },
          { id: 'w11-marketing', task: 'Launch marketing prep', priority: 'MEDIUM' }
        ]
      }
    ];

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-6">
          <h2 className="text-3xl font-bold mb-2">📅 90-Day Action Plan</h2>
          <p>Your week-by-week execution roadmap to beta launch</p>
        </div>

        {/* Timeline Progress */}
        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Timeline Progress</h3>
            <span className="text-sm text-gray-500">0% Complete</span>
          </div>
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full" style={{width: '0%'}} />
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>Week 1</span>
              <span>Week 6</span>
              <span>Week 12 🎯</span>
            </div>
          </div>
        </div>

        {/* Week-by-Week Breakdown */}
        <div className="space-y-4">
          {weeks.map((week, idx) => {
            const completed = week.tasks.filter(t => completedItems.has(t.id)).length;
            const progress = Math.round((completed / week.tasks.length) * 100);
            
            return (
              <div key={idx} className="bg-white rounded-xl p-6 border-2 border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className={`text-${week.color}-600 font-bold text-lg`}>{week.period}</span>
                      <span className="text-gray-900 font-semibold">{week.title}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{completed}/{week.tasks.length} complete</div>
                    <div className="text-2xl font-bold text-gray-900">{progress}%</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {week.tasks.map((task, tidx) => (
                    <div key={tidx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                      <input 
                        type="checkbox" 
                        className={`w-5 h-5 text-${week.color}-600 rounded`}
                        onChange={() => toggleComplete(task.id)}
                        checked={completedItems.has(task.id)}
                      />
                      <div className="flex-1">
                        <span className={completedItems.has(task.id) ? 'line-through text-gray-400' : ''}>
                          {task.task}
                        </span>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${
                        task.priority === 'HIGH' ? 'bg-red-100 text-red-700' : 
                        task.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Milestones */}
        <div className="bg-white rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">🎯 Key Milestones</h3>
          <div className="space-y-3">
            {[
              { week: 'Week 4', milestone: 'Profile creation working end-to-end', status: 'pending' },
              { week: 'Week 6', milestone: 'Daily check-ins functional, 5 test users', status: 'pending' },
              { week: 'Week 8', milestone: 'Community Q&A live, 50 seeded questions', status: 'pending' },
              { week: 'Week 10', milestone: 'Gamification active, badges awarded', status: 'pending' },
              { week: 'Week 12', milestone: 'Beta launch, 500 users onboarded', status: 'pending' }
            ].map((milestone, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <Circle className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <div className="font-semibold">{milestone.week}</div>
                  <div className="text-sm text-gray-600">{milestone.milestone}</div>
                </div>
                <CheckCircle className="w-6 h-6 text-gray-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Gap Analysis Section - NEW in v4
  const GapAnalysis = () => {
    const gaps = [
      {
        id: 'gap-tech',
        title: 'Technical Implementation Plan',
        priority: 'HIGH',
        status: 'Not Started',
        items: [
          'Database schema design',
          'API architecture documentation',
          'Authentication/authorization flow',
          'File storage strategy',
          'Deployment pipeline',
          'Environment setup guide'
        ],
        why: 'You have the WHAT (features) but not the HOW (technical specs)',
        action: 'Need this before coding'
      },
      {
        id: 'gap-user',
        title: 'User Research & Validation',
        priority: 'HIGH',
        status: 'Not Started',
        items: [
          'Interview guide for cat parents',
          'Beta tester recruitment plan',
          'Feedback collection system',
          'Usability testing protocol',
          'A/B testing framework'
        ],
        why: 'Building without validation = risk of building wrong thing',
        action: 'Do this WEEK 1'
      },
      {
        id: 'gap-design',
        title: 'Visual Design System',
        priority: 'MEDIUM',
        status: 'Not Started',
        items: [
          'Component library (buttons, forms, cards)',
          'Color palette finalized',
          'Typography system',
          'Iconography set',
          'Animation guidelines',
          'Responsive breakpoints'
        ],
        why: '"Chaos aesthetic" is abstract without concrete design specs',
        action: 'Can build basic MVP without it, polish later'
      },
      {
        id: 'gap-content',
        title: 'Content Strategy & Production',
        priority: 'MEDIUM',
        status: 'Not Started',
        items: [
          'Blog/SEO content calendar',
          'Social media posting schedule',
          'Email marketing sequences',
          'Launch announcement copy',
          'Press kit materials',
          'Influencer outreach templates'
        ],
        why: 'Knowledge Hub needs fresh content, marketing needs assets',
        action: 'Start Week 5-8'
      },
      {
        id: 'gap-legal',
        title: 'Legal & Compliance Setup',
        priority: 'MEDIUM',
        status: 'Not Started',
        items: [
          'Terms of Service draft',
          'Privacy Policy draft',
          'Cookie consent system',
          'GDPR/CCPA compliance checklist',
          'Insurance requirements',
          'Entity formation (LLC/C-corp?)'
        ],
        why: 'Research showed legal framework is critical, but no docs created',
        action: 'Need before public launch'
      },
      {
        id: 'gap-financial',
        title: 'Financial Model & Fundraising',
        priority: 'LOW',
        status: 'Not Started',
        items: [
          'Detailed P&L projections',
          'Burn rate calculations',
          'Runway planning',
          'Fundraising deck (if seeking capital)',
          'Pricing sensitivity analysis',
          'Unit economics breakdown'
        ],
        why: 'You have revenue targets but not detailed financial planning',
        action: 'Can bootstrap initially, but plan for fundraising'
      },
      {
        id: 'gap-ops',
        title: 'Operations & Scaling Plan',
        priority: 'LOW',
        status: 'Not Started',
        items: [
          'Customer support system',
          'Moderation guidelines for community',
          'Admin dashboard requirements',
          'Analytics/reporting setup',
          'Team hiring plan',
          'Contractor management'
        ],
        why: '10K users need support, moderation, analytics',
        action: 'Month 3-6 concern'
      },
      {
        id: 'gap-partnerships',
        title: 'Partnership & Integration Strategy',
        priority: 'LOW',
        status: 'Not Started',
        items: [
          'Vet clinic outreach materials',
          'Insurance partnership pitch deck',
          'Wearable device integration specs',
          'Influencer collaboration framework',
          'Affiliate program structure'
        ],
        why: 'Phase 2-3 depends on partnerships, but no outreach prepared',
        action: 'Phase 2 concern, Month 7+'
      }
    ];

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl p-6">
          <h2 className="text-3xl font-bold mb-2">🔍 Gap Analysis</h2>
          <p>Critical items we still need to build before launch</p>
        </div>

        {/* Priority Overview */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-6 border-l-4 border-red-500">
            <div className="text-sm text-gray-600 mb-1">High Priority</div>
            <div className="text-3xl font-bold text-red-600">2</div>
            <div className="text-xs text-gray-500 mt-1">Must do before coding</div>
          </div>
          <div className="bg-white rounded-lg p-6 border-l-4 border-yellow-500">
            <div className="text-sm text-gray-600 mb-1">Medium Priority</div>
            <div className="text-3xl font-bold text-yellow-600">3</div>
            <div className="text-xs text-gray-500 mt-1">Need before beta/launch</div>
          </div>
          <div className="bg-white rounded-lg p-6 border-l-4 border-gray-300">
            <div className="text-sm text-gray-600 mb-1">Low Priority</div>
            <div className="text-3xl font-bold text-gray-600">3</div>
            <div className="text-xs text-gray-500 mt-1">Can do later</div>
          </div>
        </div>

        {/* Gap Items */}
        <div className="space-y-4">
          {gaps.map((gap, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 border-2 border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-bold">{gap.title}</h4>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      gap.priority === 'HIGH' ? 'bg-red-100 text-red-700' :
                      gap.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {gap.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    <strong>Why it matters:</strong> {gap.why}
                  </p>
                  <p className="text-sm text-purple-600 font-medium mb-4">
                    📋 {gap.action}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {gap.items.map((item, iidx) => (
                  <div key={iidx} className="flex items-center gap-2 text-sm">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-purple-600 rounded"
                      onChange={() => toggleComplete(`${gap.id}-${iidx}`)}
                      checked={completedItems.has(`${gap.id}-${iidx}`)}
                    />
                    <span className={completedItems.has(`${gap.id}-${iidx}`) ? 'line-through text-gray-400' : ''}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Recommended Path Forward */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">🎯 Recommended Path: Level 2 (Proper Foundation)</h3>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4">
              <div className="font-semibold mb-2">Week 1: Foundation Triple Threat</div>
              <div className="text-sm text-gray-600">User interviews + Tech stack setup + Basic designs</div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="font-semibold mb-2">Week 2-3: Core MVP Build</div>
              <div className="text-sm text-gray-600">Profile + Wellness + Community features</div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="font-semibold mb-2">Week 4-6: Beta Testing</div>
              <div className="text-sm text-gray-600">50 users, iterate on feedback</div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="font-semibold mb-2">Week 7-8: Polish & Prep</div>
              <div className="text-sm text-gray-600">Launch materials, performance optimization</div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="font-semibold mb-2">Week 9: Public Launch</div>
              <div className="text-sm text-gray-600">Product Hunt, press, influencers</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Decisions Tracker Section - NEW in v4
  const DecisionsTracker = () => {
    const decisions = [
      {
        category: 'Technical',
        icon: Database,
        color: 'indigo',
        items: [
          { 
            decision: 'Hosting Platform', 
            options: ['Vercel', 'Netlify', 'Railway'],
            recommended: 'Vercel (frontend) + Railway (backend)',
            status: 'pending',
            impact: 'HIGH'
          },
          {
            decision: 'Database',
            options: ['Supabase', 'PostgreSQL on Railway', 'PlanetScale'],
            recommended: 'Supabase',
            status: 'pending',
            impact: 'HIGH'
          },
          {
            decision: 'Authentication',
            options: ['NextAuth', 'Clerk', 'Supabase Auth'],
            recommended: 'NextAuth',
            status: 'pending',
            impact: 'HIGH'
          },
          {
            decision: 'File Storage',
            options: ['AWS S3', 'Cloudflare R2', 'Uploadcare'],
            recommended: 'AWS S3',
            status: 'pending',
            impact: 'MEDIUM'
          },
          {
            decision: 'Analytics',
            options: ['PostHog', 'Mixpanel', 'Amplitude'],
            recommended: 'PostHog',
            status: 'pending',
            impact: 'MEDIUM'
          }
        ]
      },
      {
        category: 'Design',
        icon: PenTool,
        color: 'pink',
        items: [
          {
            decision: 'Profile Themes at Launch',
            options: ['3 themes', '5 themes', '10 themes'],
            recommended: '3 themes (add more monthly)',
            status: 'pending',
            impact: 'MEDIUM'
          },
          {
            decision: 'Customization Depth',
            options: ['Simple themes only', 'CSS editor in MVP'],
            recommended: 'Simple themes (CSS editor Phase 2)',
            status: 'pending',
            impact: 'LOW'
          },
          {
            decision: 'Mobile Strategy',
            options: ['Native app', 'PWA'],
            recommended: 'PWA (install to home screen)',
            status: 'pending',
            impact: 'MEDIUM'
          },
          {
            decision: 'Accessibility Target',
            options: ['Basic', 'WCAG 2.1 AA from day 1'],
            recommended: 'Aim for AA, audit before launch',
            status: 'pending',
            impact: 'MEDIUM'
          }
        ]
      },
      {
        category: 'Business',
        icon: DollarSign,
        color: 'yellow',
        items: [
          {
            decision: 'Pricing',
            options: ['$5/mo', '$7/mo', '$9/mo'],
            recommended: '$7/mo (matches research)',
            status: 'pending',
            impact: 'HIGH'
          },
          {
            decision: 'Free Trial',
            options: ['14 days', '30 days', 'No trial'],
            recommended: '14-day trial (industry standard)',
            status: 'pending',
            impact: 'HIGH'
          },
          {
            decision: 'Payment Processor',
            options: ['Stripe only', 'Stripe + PayPal'],
            recommended: 'Stripe only (add PayPal later)',
            status: 'pending',
            impact: 'MEDIUM'
          },
          {
            decision: 'Annual Discount',
            options: ['$70/year (2 months free)', 'No annual option'],
            recommended: 'Add annual pricing Month 3',
            status: 'pending',
            impact: 'LOW'
          }
        ]
      },
      {
        category: 'Marketing',
        icon: TrendingUp,
        color: 'green',
        items: [
          {
            decision: 'Launch Channel',
            options: ['Product Hunt', 'Reddit', 'Both'],
            recommended: 'Reddit first (free), then Product Hunt Week 2',
            status: 'pending',
            impact: 'HIGH'
          },
          {
            decision: 'Influencer Budget',
            options: ['$0', '$500', '$2000'],
            recommended: '$500 for 10 micro-influencers',
            status: 'pending',
            impact: 'MEDIUM'
          },
          {
            decision: 'Paid Ads',
            options: ['Launch with ads', 'Wait until $10K MRR'],
            recommended: 'No paid ads until $10K MRR (focus organic)',
            status: 'pending',
            impact: 'LOW'
          },
          {
            decision: 'PR Strategy',
            options: ['Hire PR firm', 'DIY outreach'],
            recommended: 'DIY PR (you have the story!)',
            status: 'pending',
            impact: 'MEDIUM'
          }
        ]
      }
    ];

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl p-6">
          <h2 className="text-3xl font-bold mb-2">🎲 Decisions Tracker</h2>
          <p>Critical technical and business decisions that need resolution</p>
        </div>

        {/* Decision Summary */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Total Decisions', count: decisions.reduce((acc, cat) => acc + cat.items.length, 0), color: 'gray' },
            { label: 'High Impact', count: decisions.reduce((acc, cat) => acc + cat.items.filter(i => i.impact === 'HIGH').length, 0), color: 'red' },
            { label: 'Decided', count: 0, color: 'green' },
            { label: 'Pending', count: decisions.reduce((acc, cat) => acc + cat.items.length, 0), color: 'yellow' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-lg p-4 border-2 border-gray-100">
              <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
              <div className={`text-3xl font-bold text-${stat.color}-600`}>{stat.count}</div>
            </div>
          ))}
        </div>

        {/* Decision Categories */}
        <div className="space-y-6">
          {decisions.map((category, cidx) => {
            const Icon = category.icon;
            return (
              <div key={cidx} className="bg-white rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Icon className={`w-6 h-6 text-${category.color}-600`} />
                  <h3 className="text-2xl font-bold">{category.category} Decisions</h3>
                </div>

                <div className="space-y-4">
                  {category.items.map((item, iidx) => (
                    <div key={iidx} className={`border-2 border-${category.color}-100 rounded-lg p-4`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-lg">{item.decision}</h4>
                            <span className={`text-xs font-semibold px-2 py-1 rounded ${
                              item.impact === 'HIGH' ? 'bg-red-100 text-red-700' :
                              item.impact === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {item.impact} IMPACT
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            <strong>Options:</strong> {item.options.join(' • ')}
                          </div>
                          <div className="text-sm text-purple-600 font-medium">
                            ✅ Recommended: {item.recommended}
                          </div>
                        </div>
                        <button 
                          onClick={() => toggleComplete(`decision-${cidx}-${iidx}`)}
                          className={`ml-4 px-4 py-2 rounded-lg font-semibold text-sm transition ${
                            completedItems.has(`decision-${cidx}-${iidx}`)
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {completedItems.has(`decision-${cidx}-${iidx}`) ? 'Decided ✓' : 'Mark Decided'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Cost Estimate */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">💰 Estimated Monthly Costs (Based on Recommendations)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="font-semibold mb-2">Infrastructure</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span>Vercel (Hobby)</span><span className="text-gray-600">Free</span></div>
                <div className="flex justify-between"><span>Railway (Starter)</span><span className="text-gray-600">$5</span></div>
                <div className="flex justify-between"><span>PostgreSQL</span><span className="text-gray-600">$10</span></div>
                <div className="flex justify-between"><span>AWS S3</span><span className="text-gray-600">$10</span></div>
                <div className="flex justify-between"><span>PostHog</span><span className="text-gray-600">Free</span></div>
              </div>
            </div>
            <div>
              <div className="font-semibold mb-2">Services</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span>Stripe</span><span className="text-gray-600">2.9% + $0.30</span></div>
                <div className="flex justify-between"><span>Cloudflare</span><span className="text-gray-600">Free</span></div>
                <div className="flex justify-between"><span>Influencer Budget</span><span className="text-gray-600">$500 (one-time)</span></div>
                <div className="flex justify-between font-bold border-t pt-2 mt-2">
                  <span>Total Monthly</span><span className="text-green-600">~$50</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

// NEW DEVELOPER-FOCUSED SECTIONS FOR MISSION CONTROL V4.5

// 1. DEV SPRINT BOARD SECTION
const DevSprintsSection = () => {
  const [activeSprintFilter, setActiveSprintFilter] = useState('current');
  
  const sprints = [
    {
      id: 'sprint-1',
      name: 'Sprint 1: Foundation',
      dates: 'Week 1-2 (Oct 28 - Nov 8)',
      status: 'active',
      tickets: [
        {
          id: 'HK-001',
          title: 'Set up Next.js 15 project with TypeScript',
          priority: 'HIGH',
          estimate: '4h',
          status: 'todo',
          assignee: 'Dev Partner',
          acceptanceCriteria: [
            'Next.js 15 installed and configured',
            'TypeScript strict mode enabled',
            'ESLint and Prettier configured',
            'Git repository initialized'
          ],
          dependencies: [],
          tags: ['setup', 'infrastructure']
        },
        {
          id: 'HK-002',
          title: 'Configure Tailwind CSS with custom theme',
          priority: 'HIGH',
          estimate: '2h',
          status: 'todo',
          assignee: 'Dev Partner',
          acceptanceCriteria: [
            'Tailwind installed and configured',
            'Custom colors for brand (purple, pink)',
            'Custom fonts loaded',
            'Responsive breakpoints defined'
          ],
          dependencies: ['HK-001'],
          tags: ['setup', 'styling']
        },
        {
          id: 'HK-003',
          title: 'Set up PostgreSQL database and schema',
          priority: 'HIGH',
          estimate: '6h',
          status: 'todo',
          assignee: 'Dev Partner',
          acceptanceCriteria: [
            'PostgreSQL running locally',
            'Database schema created (users, profiles, wellness_logs)',
            'Migrations setup with Prisma/Drizzle',
            'Seed data created for testing'
          ],
          dependencies: ['HK-001'],
          tags: ['database', 'backend']
        },
        {
          id: 'HK-004',
          title: 'Implement authentication with NextAuth',
          priority: 'HIGH',
          estimate: '8h',
          status: 'todo',
          assignee: 'Dev Partner',
          acceptanceCriteria: [
            'Email/password login working',
            'Google OAuth working',
            'Session management configured',
            'Protected routes implemented',
            'Login/signup UI created'
          ],
          dependencies: ['HK-001', 'HK-003'],
          tags: ['auth', 'backend', 'frontend']
        },
        {
          id: 'HK-005',
          title: 'Create basic profile creation flow',
          priority: 'MEDIUM',
          estimate: '6h',
          status: 'todo',
          assignee: 'Dev Partner',
          acceptanceCriteria: [
            'Profile form with cat name, bio, photo',
            'Form validation',
            'Profile saved to database',
            'Redirect to profile view after creation'
          ],
          dependencies: ['HK-003', 'HK-004'],
          tags: ['profiles', 'frontend']
        }
      ]
    },
    {
      id: 'sprint-2',
      name: 'Sprint 2: Profile Builder',
      dates: 'Week 3-4 (Nov 11 - Nov 22)',
      status: 'planned',
      tickets: [
        {
          id: 'HK-006',
          title: 'Implement photo upload with S3',
          priority: 'HIGH',
          estimate: '6h',
          status: 'backlog',
          assignee: 'Dev Partner',
          acceptanceCriteria: [
            'Image upload to S3 working',
            'Image optimization (resize, compress)',
            'Multiple images per profile',
            'Gallery view'
          ],
          dependencies: ['HK-005'],
          tags: ['profiles', 'media', 'backend']
        },
        {
          id: 'HK-007',
          title: 'Build theme customization system',
          priority: 'HIGH',
          estimate: '8h',
          status: 'backlog',
          assignee: 'Dev Partner',
          acceptanceCriteria: [
            '3 starter themes created',
            'Theme preview',
            'Theme selection saved',
            'CSS variables system'
          ],
          dependencies: ['HK-005'],
          tags: ['profiles', 'styling']
        },
        {
          id: 'HK-008',
          title: 'Create profile URL slug system',
          priority: 'MEDIUM',
          estimate: '4h',
          status: 'backlog',
          assignee: 'Dev Partner',
          acceptanceCriteria: [
            'Unique slug generation',
            'Custom slug editing',
            'Slug validation',
            'hauskat.com/@catname working'
          ],
          dependencies: ['HK-005'],
          tags: ['profiles', 'backend']
        }
      ]
    }
  ];

  const currentSprint = sprints.find(s => s.status === 'active') || sprints[0];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-2">🎫 Dev Sprint Board</h2>
        <p>Actionable tickets converted from strategic plan</p>
      </div>

      {/* Sprint Selector */}
      <div className="bg-white rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Current Sprint</h3>
          <div className="flex gap-2">
            {sprints.map(sprint => (
              <button
                key={sprint.id}
                onClick={() => setActiveSprintFilter(sprint.status)}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  sprint.status === 'active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {sprint.name.split(':')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Sprint Info */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-lg">{currentSprint.name}</h4>
              <p className="text-sm text-gray-600">{currentSprint.dates}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {currentSprint.tickets.filter(t => t.status === 'todo').length} tickets
              </div>
              <div className="text-sm text-gray-600">
                Est: {currentSprint.tickets.reduce((acc, t) => acc + parseInt(t.estimate), 0)}h total
              </div>
            </div>
          </div>
        </div>

        {/* Tickets */}
        <div className="space-y-4">
          {currentSprint.tickets.map((ticket, idx) => (
            <div key={ticket.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition">
              <div className="flex items-start gap-4">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 mt-1 text-blue-600 rounded"
                  onChange={() => toggleComplete(ticket.id)}
                  checked={completedItems.has(ticket.id)}
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-gray-500">{ticket.id}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                          ticket.priority === 'HIGH' ? 'bg-red-100 text-red-700' :
                          ticket.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {ticket.priority}
                        </span>
                        <span className="text-xs text-gray-500">Est: {ticket.estimate}</span>
                      </div>
                      <h5 className={`font-semibold ${completedItems.has(ticket.id) ? 'line-through text-gray-400' : ''}`}>
                        {ticket.title}
                      </h5>
                      {ticket.assignee && (
                        <div className="text-sm text-gray-600 mt-1">
                          👤 {ticket.assignee}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Acceptance Criteria */}
                  <div className="mt-3 bg-gray-50 rounded p-3">
                    <div className="text-xs font-semibold text-gray-700 mb-2">Acceptance Criteria:</div>
                    <div className="space-y-1">
                      {ticket.acceptanceCriteria.map((criteria, cidx) => (
                        <div key={cidx} className="flex items-start gap-2 text-xs">
                          <CheckCircle className="w-3 h-3 text-gray-400 mt-0.5" />
                          <span className="text-gray-600">{criteria}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dependencies & Tags */}
                  <div className="mt-3 flex items-center gap-4 text-xs">
                    {ticket.dependencies.length > 0 && (
                      <div className="flex items-center gap-1 text-orange-600">
                        <AlertCircle className="w-3 h-3" />
                        <span>Depends on: {ticket.dependencies.join(', ')}</span>
                      </div>
                    )}
                    <div className="flex gap-1">
                      {ticket.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Tickets', value: sprints.reduce((acc, s) => acc + s.tickets.length, 0), color: 'blue' },
          { label: 'Completed', value: completedItems.size, color: 'green' },
          { label: 'In Progress', value: 0, color: 'yellow' },
          { label: 'Est. Hours', value: sprints[0].tickets.reduce((acc, t) => acc + parseInt(t.estimate), 0), color: 'purple' }
        ].map((stat, idx) => (
          <div key={idx} className={`bg-${stat.color}-50 rounded-lg p-4 text-center`}>
            <div className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 2. TEAM SYNC DASHBOARD SECTION
const TeamSyncSection = () => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-2">🤝 Team Sync Dashboard</h2>
        <p>Daily status, blockers, and coordination at a glance</p>
      </div>

      {/* Today's Date */}
      <div className="bg-white rounded-xl p-4">
        <div className="text-center">
          <div className="text-sm text-gray-500">Today is</div>
          <div className="text-2xl font-bold text-gray-900">{today}</div>
        </div>
      </div>

      {/* Working On Today */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">🎯 Working On Today</h3>
        <div className="space-y-3">
          {[
            { person: 'You (Strategy)', task: 'Finalizing Mission Control v4.5 enhancements', status: 'in-progress' },
            { person: 'Dev Partner', task: 'Setting up Next.js project structure', status: 'in-progress' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
              <div className="flex-1">
                <div className="font-semibold">{item.person}</div>
                <div className="text-sm text-gray-600">{item.task}</div>
              </div>
              <span className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-700 rounded-full">
                {item.status}
              </span>
            </div>
          ))}
          <button className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition">
            + Add what you're working on
          </button>
        </div>
      </div>

      {/* Blockers & Help Needed */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">🚧 Blockers & Help Needed</h3>
        <div className="space-y-3">
          <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <div className="font-semibold text-red-900">Waiting: Design mockups for profile screens</div>
                <div className="text-sm text-red-700 mt-1">
                  Blocked since: Oct 20 • Owner: You • Impact: HIGH
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  Need 3 core screens designed before dev can start profile builder work
                </div>
              </div>
            </div>
          </div>
          
          <button className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition">
            + Report a blocker
          </button>
        </div>
      </div>

      {/* In Code Review */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">👀 In Code Review</h3>
        <div className="text-center py-8 text-gray-400">
          <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No code in review yet - keep building!</p>
        </div>
      </div>

      {/* Deployed This Week */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">🚀 Deployed This Week</h3>
        <div className="text-center py-8 text-gray-400">
          <Rocket className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No deployments yet - you got this!</p>
        </div>
      </div>

      {/* Quick Wins & Celebrations */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">🎉 Quick Wins & Celebrations</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
            <Star className="w-5 h-5 text-yellow-500" />
            <span>Completed comprehensive Mission Control v4 with 12 sections!</span>
          </div>
          <button className="w-full px-4 py-3 border-2 border-dashed border-purple-300 rounded-lg text-purple-600 hover:border-purple-400 transition">
            + Add a win to celebrate
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. TECHNICAL SPECS HUB SECTION
const TechSpecsSection = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-2">🏗️ Technical Specs Hub</h2>
        <p>Database schemas, API docs, and architecture decisions</p>
      </div>

      {/* Database Schema */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-4">🗄️ Database Schema</h3>
        
        <div className="space-y-4">
          {/* Users Table */}
          <div className="border-2 border-indigo-200 rounded-lg p-4">
            <h4 className="font-bold text-lg mb-3">users</h4>
            <div className="space-y-2 text-sm font-mono">
              <div className="grid grid-cols-3 gap-2 font-bold text-gray-700 border-b pb-2">
                <div>Field</div>
                <div>Type</div>
                <div>Notes</div>
              </div>
              {[
                ['id', 'UUID', 'Primary key'],
                ['email', 'VARCHAR(255)', 'Unique, indexed'],
                ['password_hash', 'VARCHAR(255)', 'Hashed with bcrypt'],
                ['name', 'VARCHAR(100)', 'Display name'],
                ['created_at', 'TIMESTAMP', 'Default NOW()'],
                ['updated_at', 'TIMESTAMP', 'Auto-update']
              ].map(([field, type, note]) => (
                <div key={field} className="grid grid-cols-3 gap-2 text-gray-600">
                  <div className="text-blue-600">{field}</div>
                  <div className="text-purple-600">{type}</div>
                  <div className="text-gray-500 text-xs">{note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Profiles Table */}
          <div className="border-2 border-purple-200 rounded-lg p-4">
            <h4 className="font-bold text-lg mb-3">cat_profiles</h4>
            <div className="space-y-2 text-sm font-mono">
              <div className="grid grid-cols-3 gap-2 font-bold text-gray-700 border-b pb-2">
                <div>Field</div>
                <div>Type</div>
                <div>Notes</div>
              </div>
              {[
                ['id', 'UUID', 'Primary key'],
                ['user_id', 'UUID', 'Foreign key → users.id'],
                ['name', 'VARCHAR(50)', 'Cat name'],
                ['slug', 'VARCHAR(50)', 'Unique, indexed'],
                ['bio', 'TEXT', 'Cat description'],
                ['photo_url', 'VARCHAR(500)', 'S3 image URL'],
                ['theme_id', 'VARCHAR(50)', 'Selected theme'],
                ['created_at', 'TIMESTAMP', ''],
                ['updated_at', 'TIMESTAMP', '']
              ].map(([field, type, note]) => (
                <div key={field} className="grid grid-cols-3 gap-2 text-gray-600">
                  <div className="text-blue-600">{field}</div>
                  <div className="text-purple-600">{type}</div>
                  <div className="text-gray-500 text-xs">{note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Wellness Logs Table */}
          <div className="border-2 border-green-200 rounded-lg p-4">
            <h4 className="font-bold text-lg mb-3">wellness_logs</h4>
            <div className="space-y-2 text-sm font-mono">
              <div className="grid grid-cols-3 gap-2 font-bold text-gray-700 border-b pb-2">
                <div>Field</div>
                <div>Type</div>
                <div>Notes</div>
              </div>
              {[
                ['id', 'UUID', 'Primary key'],
                ['profile_id', 'UUID', 'Foreign key → cat_profiles.id'],
                ['log_date', 'DATE', 'Date of log'],
                ['mood', 'VARCHAR(20)', 'happy/playful/anxious/sleepy'],
                ['energy_level', 'INTEGER', '1-10 scale'],
                ['notes', 'TEXT', 'Optional notes'],
                ['photo_urls', 'JSONB', 'Array of photo URLs'],
                ['created_at', 'TIMESTAMP', '']
              ].map(([field, type, note]) => (
                <div key={field} className="grid grid-cols-3 gap-2 text-gray-600">
                  <div className="text-blue-600">{field}</div>
                  <div className="text-purple-600">{type}</div>
                  <div className="text-gray-500 text-xs">{note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Cats Table - NEW FOR 3D GAME */}
          <div className="border-2 border-cyan-200 rounded-lg p-4">
            <h4 className="font-bold text-lg mb-3">cats 🎮</h4>
            <div className="bg-cyan-50 p-2 rounded mb-2 text-xs">
              <strong>NEW:</strong> 3D cat game system - stores customizable 3D cat characters
            </div>
            <div className="space-y-2 text-sm font-mono">
              <div className="grid grid-cols-3 gap-2 font-bold text-gray-700 border-b pb-2">
                <div>Field</div>
                <div>Type</div>
                <div>Notes</div>
              </div>
              {[
                ['id', 'UUID', 'Primary key'],
                ['user_id', 'UUID', 'Foreign key → users.id'],
                ['name', 'VARCHAR(100)', 'Cat character name'],
                ['body_color', 'VARCHAR(7)', 'Hex color code'],
                ['eye_color', 'VARCHAR(7)', 'Hex color code'],
                ['nose_color', 'VARCHAR(7)', 'Hex color code'],
                ['position_x', 'FLOAT', 'Last saved X position'],
                ['position_y', 'FLOAT', 'Last saved Y position'],
                ['position_z', 'FLOAT', 'Last saved Z position'],
                ['created_at', 'TIMESTAMP', ''],
                ['updated_at', 'TIMESTAMP', '']
              ].map(([field, type, note]) => (
                <div key={field} className="grid grid-cols-3 gap-2 text-gray-600">
                  <div className="text-blue-600">{field}</div>
                  <div className="text-purple-600">{type}</div>
                  <div className="text-gray-500 text-xs">{note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Zones Table - NEW FOR MULTIPLAYER */}
          <div className="border-2 border-orange-200 rounded-lg p-4">
            <h4 className="font-bold text-lg mb-3">zones 🌍</h4>
            <div className="bg-orange-50 p-2 rounded mb-2 text-xs">
              <strong>NEW:</strong> Multiplayer zone system - persistent spaces where players meet
            </div>
            <div className="space-y-2 text-sm font-mono">
              <div className="grid grid-cols-3 gap-2 font-bold text-gray-700 border-b pb-2">
                <div>Field</div>
                <div>Type</div>
                <div>Notes</div>
              </div>
              {[
                ['id', 'UUID', 'Primary key'],
                ['name', 'VARCHAR(100)', 'Zone name (Home, Town, etc.)'],
                ['max_players', 'INTEGER', 'Capacity (1 for Home, 50 for Town)'],
                ['description', 'TEXT', 'Zone description'],
                ['created_at', 'TIMESTAMP', '']
              ].map(([field, type, note]) => (
                <div key={field} className="grid grid-cols-3 gap-2 text-gray-600">
                  <div className="text-blue-600">{field}</div>
                  <div className="text-purple-600">{type}</div>
                  <div className="text-gray-500 text-xs">{note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Player Positions Table - NEW FOR MULTIPLAYER */}
          <div className="border-2 border-pink-200 rounded-lg p-4">
            <h4 className="font-bold text-lg mb-3">player_positions 👥</h4>
            <div className="bg-pink-50 p-2 rounded mb-2 text-xs">
              <strong>NEW:</strong> Real-time player tracking - updates every 3 seconds
            </div>
            <div className="space-y-2 text-sm font-mono">
              <div className="grid grid-cols-3 gap-2 font-bold text-gray-700 border-b pb-2">
                <div>Field</div>
                <div>Type</div>
                <div>Notes</div>
              </div>
              {[
                ['user_id', 'UUID', 'Foreign key → users.id'],
                ['zone_id', 'UUID', 'Foreign key → zones.id'],
                ['position_x', 'FLOAT', 'X coordinate'],
                ['position_y', 'FLOAT', 'Y coordinate'],
                ['position_z', 'FLOAT', 'Z coordinate'],
                ['rotation', 'FLOAT', 'Y-axis rotation'],
                ['is_online', 'BOOLEAN', 'Online status'],
                ['last_seen', 'TIMESTAMP', 'Auto-update on move']
              ].map(([field, type, note]) => (
                <div key={field} className="grid grid-cols-3 gap-2 text-gray-600">
                  <div className="text-blue-600">{field}</div>
                  <div className="text-purple-600">{type}</div>
                  <div className="text-gray-500 text-xs">{note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* API Endpoints */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-4">🔌 API Architecture - tRPC (Type-Safe)</h3>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 mb-4">
          <p className="text-sm">
            <strong>Architecture:</strong> Using tRPC 11.6 for end-to-end type-safety. All API calls are validated with Zod schemas.
            Main tRPC router at <code className="bg-white px-1 rounded">/server/routers/_app.ts</code> aggregates 9 sub-routers.
          </p>
        </div>

        <h4 className="font-semibold mb-3">📡 tRPC Routers (9 total)</h4>
        <div className="space-y-3">
          {/* User Router */}
          <div className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-50">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold px-2 py-1 bg-purple-200 text-purple-800 rounded">USER</span>
              <code className="text-sm font-mono">server/routers/user.ts</code>
            </div>
            <div className="text-sm text-gray-700">
              <strong>Procedures:</strong> getByUsername, getById, search, updateProfilePicture, getProfileLayout, saveProfileLayout, updateAboutMe, getProfileBackground, updateProfileBackground
            </div>
          </div>

          {/* Cats Router - NEW */}
          <div className="border-l-4 border-cyan-500 pl-4 py-2 bg-cyan-50">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold px-2 py-1 bg-cyan-200 text-cyan-800 rounded">CATS 🎮</span>
              <code className="text-sm font-mono">server/routers/cats.ts</code>
            </div>
            <div className="text-sm text-gray-700">
              <strong>Procedures:</strong> get (fetch cat), create (3D cat creation), update (appearance & position saving)
            </div>
          </div>

          {/* Zones Router - NEW */}
          <div className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-50">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold px-2 py-1 bg-orange-200 text-orange-800 rounded">ZONES 🌍</span>
              <code className="text-sm font-mono">server/routers/zones.ts</code>
            </div>
            <div className="text-sm text-gray-700">
              <strong>Procedures:</strong> getZones, getPlayerPosition, updatePlayerPosition (real-time multiplayer)
            </div>
          </div>

          {/* Friend Router */}
          <div className="border-l-4 border-green-500 pl-4 py-2">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded">FRIEND</span>
              <code className="text-sm font-mono">server/routers/friend.ts</code>
            </div>
            <div className="text-sm text-gray-600">
              <strong>Procedures:</strong> sendRequest, acceptRequest, rejectRequest, getFriends
            </div>
          </div>

          {/* Message Router */}
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-700 rounded">MESSAGE</span>
              <code className="text-sm font-mono">server/routers/message.ts</code>
            </div>
            <div className="text-sm text-gray-600">
              <strong>Procedures:</strong> sendMessage, getConversation, list
            </div>
          </div>

          {/* Post Router */}
          <div className="border-l-4 border-pink-500 pl-4 py-2">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold px-2 py-1 bg-pink-100 text-pink-700 rounded">POST</span>
              <code className="text-sm font-mono">server/routers/post.ts</code>
            </div>
            <div className="text-sm text-gray-600">
              <strong>Procedures:</strong> getAll, getById, create, delete, like
            </div>
          </div>

          {/* GuestBook Router */}
          <div className="border-l-4 border-indigo-500 pl-4 py-2">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold px-2 py-1 bg-indigo-100 text-indigo-700 rounded">GUESTBOOK</span>
              <code className="text-sm font-mono">server/routers/guestBook.ts</code>
            </div>
            <div className="text-sm text-gray-600">
              <strong>Procedures:</strong> getByUsername, add, delete
            </div>
          </div>

          {/* Media Router */}
          <div className="border-l-4 border-yellow-500 pl-4 py-2">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold px-2 py-1 bg-yellow-100 text-yellow-700 rounded">MEDIA</span>
              <code className="text-sm font-mono">server/routers/media.ts</code>
            </div>
            <div className="text-sm text-gray-600">
              <strong>Procedures:</strong> upload (Supabase Storage), getByUserId, delete
            </div>
          </div>
        </div>
      </div>

      {/* Architecture Decision Records */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-4">📋 Architecture Decision Records (ADRs)</h3>
        
        <div className="space-y-4">
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold">ADR-001: Use Next.js 15 for Frontend</h4>
              <span className="text-xs text-gray-500">Oct 20, 2025</span>
            </div>
            <div className="text-sm space-y-1 text-gray-700">
              <p><strong>Status:</strong> Accepted</p>
              <p><strong>Context:</strong> Need modern React framework with SSR, API routes, and great DX</p>
              <p><strong>Decision:</strong> Use Next.js 15 with app router, React 19, and Turbopack</p>
              <p><strong>Consequences:</strong> Fast development, excellent SEO, Vercel deployment</p>
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold">ADR-002: PostgreSQL for Primary Database</h4>
              <span className="text-xs text-gray-500">Oct 20, 2025</span>
            </div>
            <div className="text-sm space-y-1 text-gray-700">
              <p><strong>Status:</strong> Accepted</p>
              <p><strong>Context:</strong> Need relational database for user/profile/wellness data</p>
              <p><strong>Decision:</strong> Supabase (PostgreSQL + Storage + Auth)</p>
              <p><strong>Consequences:</strong> ACID compliance, JSONB support, cost-effective</p>
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold">ADR-003: Tailwind CSS for Styling</h4>
              <span className="text-xs text-gray-500">Oct 21, 2025</span>
            </div>
            <div className="text-sm space-y-1 text-gray-700">
              <p><strong>Status:</strong> Accepted</p>
              <p><strong>Context:</strong> Need rapid UI development with customizable chaos aesthetic</p>
              <p><strong>Decision:</strong> Tailwind CSS with custom theme</p>
              <p><strong>Consequences:</strong> Fast styling, easy customization, smaller CSS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. RISKS & BLOCKERS SECTION
const RisksBlockersSection = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-2">⚠️ Risks & Blockers Tracker</h2>
        <p>Surface issues early, plan mitigation strategies</p>
      </div>

      {/* Risk Overview */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Critical', count: 0, color: 'red' },
          { label: 'High', count: 2, color: 'orange' },
          { label: 'Medium', count: 1, color: 'yellow' },
          { label: 'Low', count: 3, color: 'green' }
        ].map((stat, idx) => (
          <div key={idx} className={`bg-${stat.color}-50 border-2 border-${stat.color}-200 rounded-lg p-4 text-center`}>
            <div className={`text-3xl font-bold text-${stat.color}-600`}>{stat.count}</div>
            <div className="text-sm text-gray-600">{stat.label} Risks</div>
          </div>
        ))}
      </div>

      {/* Active Risks */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-4">🚨 Active Risks</h3>
        
        <div className="space-y-4">
          {/* High Risk */}
          <div className="border-l-4 border-orange-500 bg-orange-50 rounded-lg p-4">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-orange-600 mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-bold text-lg">Design System Not Defined</h4>
                  <span className="text-xs font-bold px-2 py-1 bg-orange-100 text-orange-700 rounded">HIGH</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div><strong>Category:</strong> Technical</div>
                  <div><strong>Impact:</strong> Dev team will build inconsistent UI, requires refactoring later</div>
                  <div><strong>Probability:</strong> 80% if not addressed by Week 2</div>
                  <div className="bg-white rounded p-3 mt-3">
                    <strong className="text-orange-700">Mitigation:</strong>
                    <ul className="list-disc list-inside mt-1 text-gray-700">
                      <li>Create basic design system by end of Week 1</li>
                      <li>Use Tailwind default + custom theme as interim</li>
                      <li>Document 3 core screens before dev starts</li>
                    </ul>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs">Owner: You</span>
                    <span className="text-xs">Due: Oct 28</span>
                    <span className="text-xs">Status: In Progress</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* High Risk */}
          <div className="border-l-4 border-orange-500 bg-orange-50 rounded-lg p-4">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-orange-600 mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-bold text-lg">No User Validation Yet</h4>
                  <span className="text-xs font-bold px-2 py-1 bg-orange-100 text-orange-700 rounded">HIGH</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div><strong>Category:</strong> Product/Market</div>
                  <div><strong>Impact:</strong> May build wrong features, waste 3 months</div>
                  <div><strong>Probability:</strong> 100% unless we interview users</div>
                  <div className="bg-white rounded p-3 mt-3">
                    <strong className="text-orange-700">Mitigation:</strong>
                    <ul className="list-disc list-inside mt-1 text-gray-700">
                      <li>Interview 10 cat parents in Week 1</li>
                      <li>Validate MVP concept before building</li>
                      <li>Adjust features based on feedback</li>
                    </ul>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs">Owner: You</span>
                    <span className="text-xs">Due: Oct 30</span>
                    <span className="text-xs">Status: Not Started</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Medium Risk */}
          <div className="border-l-4 border-yellow-500 bg-yellow-50 rounded-lg p-4">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-yellow-600 mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-bold text-lg">S3 Bucket Not Configured</h4>
                  <span className="text-xs font-bold px-2 py-1 bg-yellow-100 text-yellow-700 rounded">MEDIUM</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div><strong>Category:</strong> Infrastructure</div>
                  <div><strong>Impact:</strong> Photo upload feature blocked</div>
                  <div><strong>Probability:</strong> Certain if not done by Sprint 2</div>
                  <div className="bg-white rounded p-3 mt-3">
                    <strong className="text-yellow-700">Mitigation:</strong>
                    <ul className="list-disc list-inside mt-1 text-gray-700">
                      <li>Set up AWS account Week 1</li>
                      <li>Configure S3 bucket with correct permissions</li>
                      <li>Test upload/download before Sprint 2</li>
                    </ul>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs">Owner: Dev Partner</span>
                    <span className="text-xs">Due: Nov 5</span>
                    <span className="text-xs">Status: Planned</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* External Dependencies */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-4">🔗 External Dependencies</h3>
        
        <div className="grid grid-cols-2 gap-4">
          {[
            { 
              service: 'Vercel',
              status: 'operational',
              usage: 'Frontend hosting',
              risk: 'LOW',
              notes: 'Free tier sufficient for MVP'
            },
            {
              service: 'Railway',
              status: 'operational',
              usage: 'PostgreSQL database',
              risk: 'LOW',
              notes: '$5/mo plan needed'
            },
            {
              service: 'AWS S3',
              status: 'not-setup',
              usage: 'Image storage',
              risk: 'MEDIUM',
              notes: 'Need to configure before Sprint 2'
            },
            {
              service: 'NextAuth',
              status: 'operational',
              usage: 'Authentication',
              risk: 'LOW',
              notes: 'Well-documented, stable'
            }
          ].map((dep, idx) => (
            <div key={idx} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold">{dep.service}</h4>
                <span className={`w-3 h-3 rounded-full ${
                  dep.status === 'operational' ? 'bg-green-500' :
                  dep.status === 'not-setup' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`} />
              </div>
              <div className="text-sm space-y-1">
                <div className="text-gray-600">{dep.usage}</div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    dep.risk === 'LOW' ? 'bg-green-100 text-green-700' :
                    dep.risk === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {dep.risk}
                  </span>
                  <span className="text-xs text-gray-500">{dep.notes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Risk */}
      <button className="w-full px-6 py-4 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-dashed border-orange-300 rounded-lg text-orange-700 font-semibold hover:border-orange-400 transition">
        + Report New Risk or Blocker
      </button>
    </div>
  );
};

// 5. DECISION LOG SECTION
const DecisionLogSection = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-2">📝 Decision & Change Log</h2>
        <p>Track what was decided, why, and when - preserve context</p>
      </div>

      {/* Recent Decisions */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-4">📅 Recent Decisions</h3>
        
        <div className="space-y-4">
          {[
            {
              id: 'DEC-005',
              date: 'Oct 22, 2025',
              title: 'Added 5 Developer-Focused Sections to Mission Control',
              category: 'Product',
              decidedBy: 'You + Claude',
              rationale: 'Dev partner needs better bridge between strategy and execution. Mission Control v4 had good strategy but lacked actionable dev tools.',
              impact: 'HIGH',
              alternatives: ['Keep Mission Control strategic-only', 'Use external project management tool'],
              outcome: 'Dev Sprint Board, Team Sync, Tech Specs, Risks, and Decision Log added',
              relatedDecisions: ['DEC-001', 'DEC-003']
            },
            {
              id: 'DEC-004',
              date: 'Oct 21, 2025',
              title: 'Use Tailwind CSS over styled-components',
              category: 'Technical',
              decidedBy: 'Dev Partner',
              rationale: 'Need rapid UI development with utility-first approach. Tailwind enables faster iteration and smaller CSS bundles.',
              impact: 'MEDIUM',
              alternatives: ['styled-components', 'CSS Modules', 'vanilla CSS'],
              outcome: 'Tailwind CSS with custom theme configuration',
              relatedDecisions: ['DEC-003']
            },
            {
              id: 'DEC-003',
              date: 'Oct 20, 2025',
              title: 'Next.js 15 with App Router for Frontend',
              category: 'Technical',
              decidedBy: 'Dev Partner',
              rationale: 'Need modern React framework with SSR, API routes, and excellent DX. App router provides better performance and developer experience.',
              impact: 'HIGH',
              alternatives: ['Remix', 'Vite + React Router', 'Create React App'],
              outcome: 'Next.js 15 with React 19 and Turbopack selected, Vercel deployment recommended',
              relatedDecisions: []
            },
            {
              id: 'DEC-002',
              date: 'Oct 20, 2025',
              title: 'Supabase for Database, Storage, and Auth',
              category: 'Technical',
              decidedBy: 'You + Dev Partner',
              rationale: 'Need reliable relational database with JSONB support. Railway offers easy setup and reasonable pricing for MVP.',
              impact: 'HIGH',
              alternatives: ['Supabase', 'PlanetScale', 'AWS RDS'],
              outcome: 'Supabase selected - PostgreSQL, Storage, and integrated auth',
              relatedDecisions: []
            },
            {
              id: 'DEC-001',
              date: 'Oct 18, 2025',
              title: 'MVP Focus: Emotional Cat Profile',
              category: 'Strategic',
              decidedBy: 'You',
              rationale: 'After analyzing all research, Emotional Cat Profile best balances viral potential, data generation, and standalone value. Enables everything else.',
              impact: 'CRITICAL',
              alternatives: ['Pet Passport first', 'Sitter marketplace first', 'Knowledge Hub first'],
              outcome: '90-day plan built around profile → wellness → community',
              relatedDecisions: []
            }
          ].map((decision, idx) => (
            <div key={idx} className="border-2 border-purple-200 rounded-lg p-6 bg-gradient-to-r from-purple-50 to-indigo-50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-gray-500">{decision.id}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      decision.impact === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                      decision.impact === 'HIGH' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {decision.impact} IMPACT
                    </span>
                    <span className="text-xs text-gray-500">{decision.date}</span>
                  </div>
                  <h4 className="font-bold text-lg text-gray-900">{decision.title}</h4>
                  <div className="text-sm text-gray-600 mt-1">
                    Category: {decision.category} • Decided by: {decision.decidedBy}
                  </div>
                </div>
              </div>

              <div className="space-y-3 mt-4">
                <div>
                  <strong className="text-sm text-purple-700">Rationale:</strong>
                  <p className="text-sm text-gray-700 mt-1">{decision.rationale}</p>
                </div>

                <div>
                  <strong className="text-sm text-purple-700">Alternatives Considered:</strong>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    {decision.alternatives.map((alt, aidx) => (
                      <span key={aidx} className="text-xs px-2 py-1 bg-white rounded border border-gray-200">
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded p-3">
                  <strong className="text-sm text-green-700">Outcome:</strong>
                  <p className="text-sm text-gray-700 mt-1">{decision.outcome}</p>
                </div>

                {decision.relatedDecisions.length > 0 && (
                  <div className="text-xs text-gray-500">
                    Related decisions: {decision.relatedDecisions.join(', ')}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decision Categories */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-4">📊 Decisions by Category</h3>
        
        <div className="grid grid-cols-4 gap-4">
          {[
            { category: 'Strategic', count: 1, color: 'purple' },
            { category: 'Technical', count: 3, color: 'blue' },
            { category: 'Product', count: 1, color: 'green' },
            { category: 'Business', count: 0, color: 'yellow' }
          ].map((cat, idx) => (
            <div key={idx} className={`bg-${cat.color}-50 rounded-lg p-4 text-center border-2 border-${cat.color}-200`}>
              <div className={`text-3xl font-bold text-${cat.color}-600`}>{cat.count}</div>
              <div className="text-sm text-gray-600">{cat.category}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Decision */}
      <button className="w-full px-6 py-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-dashed border-purple-300 rounded-lg text-purple-700 font-semibold hover:border-purple-400 transition">
        + Document New Decision
      </button>

      {/* Tips for Good Decision Documentation */}
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6">
        <h4 className="font-bold mb-3">💡 Tips for Good Decision Documentation</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
            <span>Document decisions as soon as they're made (while context is fresh)</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
            <span>Include the "why" more than the "what" - future you needs context</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
            <span>List alternatives considered - shows thoughtfulness</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
            <span>Link related decisions - trace the decision tree</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
            <span>Mark impact level - helps prioritize future changes</span>
          </div>
        </div>
      </div>
    </div>
  );
};


  // Enhanced Vision & Strategy (keeping original content but with better organization)
  const VisionStrategy = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-2">🎨 Vision & Strategy</h2>
        <p>Brand identity, mission, and market positioning</p>
      </div>

      {/* Mission Statement */}
      <div className="bg-white rounded-xl p-8">
        <div className="text-center mb-6">
          <h3 className="text-3xl font-bold text-gray-900 mb-3">Our Mission</h3>
          <p className="text-2xl text-purple-600 font-semibold">Honor Cloud, Help Every Cat</p>
          <p className="text-lg text-gray-600 mt-3">Building the emotional operating system for cat care</p>
        </div>
        
        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <div className="text-4xl mb-2">🐱</div>
            <div className="font-semibold mb-1">What We Build</div>
            <div className="text-sm text-gray-600">The complete cat internet where cats rule</div>
          </div>
          <div className="text-center p-6 bg-pink-50 rounded-lg">
            <div className="text-4xl mb-2">💜</div>
            <div className="font-semibold mb-1">Who We Serve</div>
            <div className="text-sm text-gray-600">85M US pet families who love their cats</div>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <div className="text-4xl mb-2">🔬</div>
            <div className="font-semibold mb-1">Our Vision</div>
            <div className="text-sm text-gray-600">World's largest cat science platform</div>
          </div>
        </div>
      </div>

      {/* Brand Identity */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-4">🎨 Brand Identity</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Current Tagline</h4>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-lg font-medium">"Where Cats Rule the Web"</p>
              <p className="text-sm text-gray-600 mt-1">Cat-focused, clear positioning</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Alternative (Broader)</h4>
            <div className="bg-pink-50 p-4 rounded-lg">
              <p className="text-lg font-medium">"Embrace the Chaos"</p>
              <p className="text-sm text-gray-600 mt-1">Appeals to mental health/community crowd</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold mb-3">Brand Voice Mix</h4>
          <div className="flex gap-4">
            <div className="flex-1 bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">90%</div>
              <div className="font-medium">Chaos Energy</div>
              <div className="text-sm text-gray-600">Playful, bright, celebrates the mess</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">10%</div>
              <div className="font-medium">Smart Help</div>
              <div className="text-sm text-gray-600">Knowledgeable without being preachy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Target Audiences */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-4">🎯 Target Audiences</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              emoji: '🐱',
              title: 'Active Cat Parents',
              desc: 'Have cats, want better tools + community',
              size: '60M US'
            },
            {
              emoji: '✨',
              title: 'Future Cat Parents',
              desc: 'Planning to get cats, learning',
              size: '10M US'
            },
            {
              emoji: '🏘️',
              title: 'Community Seekers',
              desc: 'Want belonging, miss fun internet',
              size: '20M US'
            },
            {
              emoji: '💜',
              title: 'Mental Health Focus',
              desc: 'Cats as support, need community',
              size: '15M US'
            },
            {
              emoji: '🎨',
              title: 'Nostalgia/Vibes Seekers',
              desc: 'Want creative expression, customization',
              size: '25M US'
            },
            {
              emoji: '🧠',
              title: 'Neurodivergent Community',
              desc: 'Need structure, gamification, visual progress',
              size: '12M US'
            }
          ].map((audience, idx) => (
            <div key={idx} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4">
              <div className="text-3xl mb-2">{audience.emoji}</div>
              <div className="font-semibold text-lg mb-1">{audience.title}</div>
              <div className="text-sm text-gray-600 mb-2">{audience.desc}</div>
              <div className="text-xs text-gray-500 font-medium">{audience.size}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Elevator Pitch */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-3">🎤 Elevator Pitch</h3>
        <p className="text-lg">
          "Hauskat is the complete cat internet. Customize your profile, collect through chaos, 
          connect locally, learn from experts, and celebrate your cats. Everything cat parents 
          need in one place where cats actually rule."
        </p>
      </div>
    </div>
  );

  // Keep all other existing sections from the original file (Features, Research, Community, Business, Technical, Roadmap)
  // These would be identical to the original, so I'm including placeholder comments
  const FeaturesSection = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-2">Features & Functions</h2>
        <p>Complete feature set from MVP to dream vision</p>
      </div>

      {/* Core Features Grid */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-4">ðŸ  Core Hauskat Features</h3>
        
        <div className="space-y-6">
          {/* Profile & Wellness */}
          <div>
            <h4 className="font-semibold text-lg mb-3 text-purple-600">Profile & Wellness</h4>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: 'ðŸ±', name: 'Profiles', desc: 'Customizable cat profiles with CSS' },
                { icon: 'ðŸ“Š', name: 'Wellness Tracking', desc: 'Mood, energy, health metrics' },
                { icon: 'ðŸŽ®', name: 'Enrichment Hub', desc: "Nova's Lab tested activities" },
                { icon: 'ðŸ“ˆ', name: 'Analytics', desc: 'Insights & comparisons' },
                { icon: 'ðŸ¥', name: 'Health Records', desc: 'Vet visits, medications' },
                { icon: 'â°', name: 'Care Reminders', desc: 'Meds, appointments, tasks' }
              ].map(feature => (
                <div key={feature.name} className="border rounded-lg p-3 hover:bg-purple-50 transition">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{feature.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{feature.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{feature.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3D Cat Game System - NEW CORE FEATURE */}
          <div>
            <h4 className="font-semibold text-lg mb-3 text-cyan-600">🎮 3D Cat Game System (ACTIVE DEVELOPMENT)</h4>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: '🐱', name: '3D Cat Creator', desc: 'Geometric procedural cat customization' },
                { icon: '🎨', name: 'Cat Customization', desc: 'Body, eye, nose colors' },
                { icon: '🕹️', name: 'Playable Cats', desc: 'WASD + Space + Shift controls' },
                { icon: '🎥', name: 'Third-Person Camera', desc: 'Follow camera system' },
                { icon: '🌍', name: 'Multiplayer Zones', desc: 'Home Zone & Town Zone' },
                { icon: '👥', name: 'Real-Time Players', desc: 'See other players in zones' },
                { icon: '⚡', name: 'Physics Engine', desc: 'Rapier physics & collisions' },
                { icon: '📍', name: 'Auto-Save Position', desc: 'Position saved every 3 seconds' },
                { icon: '🏃', name: 'Movement System', desc: 'Walking, running, jumping' }
              ].map(feature => (
                <div key={feature.name} className="border-2 border-cyan-200 rounded-lg p-3 hover:bg-cyan-50 transition">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{feature.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{feature.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{feature.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-3">
              <p className="text-sm text-gray-700">
                <strong>Status:</strong> Recently implemented with 15+ commits focused on optimization, zone system, and multiplayer support.
                Core mechanics include procedural 3D cat generation, physics-based movement, real-time position tracking, and zone-based multiplayer gameplay.
              </p>
            </div>
          </div>

          {/* Community & Knowledge */}
          <div>
            <h4 className="font-semibold text-lg mb-3 text-blue-600">Community & Knowledge</h4>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: 'ðŸ§ ', name: 'Knowledge Hub', desc: 'AI-powered Q&A system' },
                { icon: 'ðŸ‘¥', name: 'Local Groups', desc: 'Neighborhood cat parents' },
                { icon: 'ðŸ’¬', name: 'IM System', desc: 'Direct messaging' },
                { icon: 'ðŸŽ¨', name: 'Creator Tools', desc: 'Monetization for experts' },
                { icon: 'ðŸ†', name: 'Challenges', desc: 'Community competitions' },
                { icon: 'ðŸ“š', name: 'Wiki System', desc: 'Evolving knowledge base' }
              ].map(feature => (
                <div key={feature.name} className="border rounded-lg p-3 hover:bg-blue-50 transition">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{feature.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{feature.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{feature.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Integrations */}
          <div>
            <h4 className="font-semibold text-lg mb-3 text-green-600">Power Integrations</h4>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: 'ðŸ¥', name: 'Vet EMR', desc: 'Direct record access' },
                { icon: 'âœˆï¸', name: 'Travel Docs', desc: 'Digital health passport' },
                { icon: 'ðŸ›¡ï¸', name: 'Pet Insurance', desc: 'Premium discounts' },
                { icon: 'ðŸ“±', name: 'Wearables', desc: 'Activity trackers' },
                { icon: 'ðŸš¨', name: 'Emergency', desc: 'Quick vet access' },
                { icon: 'ðŸ”¬', name: 'Research', desc: 'Citizen science' }
              ].map(feature => (
                <div key={feature.name} className="border rounded-lg p-3 hover:bg-green-50 transition">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{feature.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{feature.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{feature.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MVP vs Vision */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-4">ðŸš€ MVP â†’ Vision Path</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-bold text-blue-700 mb-3">Phase 1: MVP (Q1 2026)</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Customizable profiles</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Basic wellness tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Community Q&A</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Enrichment library</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Basic gamification</span>
              </li>
            </ul>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-bold text-purple-700 mb-3">Phase 2: Full Vision (2027+)</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Star className="w-4 h-4 text-yellow-500 mt-0.5" />
                <span>AI-powered insights</span>
              </li>
              <li className="flex items-start gap-2">
                <Star className="w-4 h-4 text-yellow-500 mt-0.5" />
                <span>Vet integration network</span>
              </li>
              <li className="flex items-start gap-2">
                <Star className="w-4 h-4 text-yellow-500 mt-0.5" />
                <span>Global pet passport</span>
              </li>
              <li className="flex items-start gap-2">
                <Star className="w-4 h-4 text-yellow-500 mt-0.5" />
                <span>Research platform (1M+ cats)</span>
              </li>
              <li className="flex items-start gap-2">
                <Star className="w-4 h-4 text-yellow-500 mt-0.5" />
                <span>Creator economy</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
  const ResearchSection = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-2">Research & Data Platform</h2>
        <p>Pet passport framework, citizen science, and compliance</p>
      </div>

      {/* Pet Passport Opportunity */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-4">ðŸ¥ Digital Pet Passport Opportunity</h3>
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg mb-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">$161.96B</div>
              <div className="text-sm text-gray-600">Market by 2029</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">87%</div>
              <div className="text-sm text-gray-600">Vets unserved</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">0</div>
              <div className="text-sm text-gray-600">Consumer platforms</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border-l-4 border-orange-500 pl-4">
            <h4 className="font-semibold">Key Insight from 600+ Resources</h4>
            <p className="text-sm text-gray-600 mt-1">
              Operating in gray area between medical devices (FDA) and wellness tools (unregulated). 
              Avoid disease diagnosis claims = minimal barriers.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 rounded-lg p-4">
              <h5 className="font-semibold text-red-700 mb-2">Current Pain Points</h5>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>â€¢ 2+ hours researching travel requirements</li>
                <li>â€¢ Paper certificates expire differently</li>
                <li>â€¢ $50-600+ per trip for certificates</li>
                <li>â€¢ Missing docs = quarantine risk</li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h5 className="font-semibold text-green-700 mb-2">Our Solution</h5>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>â€¢ Enter destination â†’ instant requirements</li>
                <li>â€¢ Digital certificates, always current</li>
                <li>â€¢ QR verification at borders/airlines</li>
                <li>â€¢ Works WITHOUT vet participation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Citizen Science Platform */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-4">ðŸ”¬ World's Largest Cat Research Platform</h3>
        
        <div className="bg-purple-50 rounded-lg p-4 mb-4">
          <p className="text-lg font-medium text-purple-900">
            "What if every cat parent could contribute to advancing cat health â€” just by caring for their cat?"
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Data Collection (Daily)</h4>
            <div className="space-y-2">
              {[
                'ðŸ˜¸ Mood & energy levels',
                'ðŸŽ® Enrichment activities',
                'ðŸ½ï¸ Feeding patterns',
                'ðŸ’¤ Sleep tracking',
                'ðŸ—£ï¸ Vocalizations',
                'ðŸ  Environmental factors'
              ].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Research Applications</h4>
            <div className="space-y-2">
              {[
                'ðŸŽ¯ Best enrichment for anxiety',
                'ðŸ§¬ Breed-specific patterns',
                'ðŸ‘´ Senior cat quality of life',
                'ðŸš¨ Early health warnings',
                'ðŸ˜Š Contentment factors',
                'ðŸŒ Cultural care differences'
              ].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-orange-400 rounded-full" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h5 className="font-semibold text-yellow-800 mb-2">Revenue Model</h5>
          <div className="grid grid-cols-4 gap-3 text-sm">
            <div className="text-center">
              <div className="font-bold text-yellow-700">Universities</div>
              <div className="text-gray-600">Dataset licensing</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-yellow-700">Pet Brands</div>
              <div className="text-gray-600">Product validation</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-yellow-700">Insurance</div>
              <div className="text-gray-600">Risk models</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-yellow-700">Grants</div>
              <div className="text-gray-600">Research funding</div>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Framework */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-4">ðŸ›¡ï¸ Legal & Compliance Strategy</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="border-2 border-gray-200 rounded-lg p-4">
            <Lock className="w-8 h-8 text-gray-600 mb-2" />
            <h5 className="font-semibold mb-1">Privacy First</h5>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>â€¢ GDPR/CCPA compliant</li>
              <li>â€¢ Anonymized data</li>
              <li>â€¢ User owns records</li>
              <li>â€¢ Opt-out anytime</li>
            </ul>
          </div>
          <div className="border-2 border-gray-200 rounded-lg p-4">
            <Shield className="w-8 h-8 text-gray-600 mb-2" />
            <h5 className="font-semibold mb-1">Safe Claims</h5>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>â€¢ "Observational platform"</li>
              <li>â€¢ No diagnosis claims</li>
              <li>â€¢ Educational only</li>
              <li>â€¢ FTC compliant</li>
            </ul>
          </div>
          <div className="border-2 border-gray-200 rounded-lg p-4">
            <AlertCircle className="w-8 h-8 text-gray-600 mb-2" />
            <h5 className="font-semibold mb-1">Risk Mitigation</h5>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>â€¢ $2-5M E&O insurance</li>
              <li>â€¢ Legal advisory board</li>
              <li>â€¢ State-by-state analysis</li>
              <li>â€¢ Clear disclaimers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
  const CommunitySection = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-2">Community & Content</h2>
        <p>Knowledge hub, viral features, and engagement mechanics</p>
      </div>

      {/* Knowledge Hub Architecture */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-4">ðŸ§  AI-Powered Knowledge Hub</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Smart Features</h4>
            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="font-medium text-blue-700">Semantic Search</div>
                <div className="text-sm text-gray-600">AI understands context, not just keywords</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="font-medium text-green-700">Duplicate Detection</div>
                <div className="text-sm text-gray-600">No more repeated questions</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="font-medium text-purple-700">Expert Verification</div>
                <div className="text-sm text-gray-600">Vets & behaviorists verify answers</div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <div className="font-medium text-orange-700">Auto-Tagging</div>
                <div className="text-sm text-gray-600">AI categorizes everything</div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Content Evolution</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="text-2xl">ðŸ“</div>
                <div>
                  <div className="font-medium">Living Documents</div>
                  <div className="text-sm text-gray-600">Posts evolve into wiki articles</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">ðŸŽ“</div>
                <div>
                  <div className="font-medium">Expert Claims</div>
                  <div className="text-sm text-gray-600">Experts can own topic areas</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">ðŸ”„</div>
                <div>
                  <div className="font-medium">Version History</div>
                  <div className="text-sm text-gray-600">See how advice changes over time</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">ðŸ“…</div>
                <div>
                  <div className="font-medium">Seasonal Updates</div>
                  <div className="text-sm text-gray-600">Content refreshes automatically</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Viral Mechanics */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-4">ðŸš€ Viral Growth Features</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="border-2 border-pink-200 rounded-lg p-4 bg-pink-50">
            <div className="text-2xl mb-2">ðŸ“Š</div>
            <h5 className="font-semibold">Cat Year in Review</h5>
            <p className="text-sm text-gray-600 mt-1">Spotify Wrapped style annual recap</p>
          </div>
          <div className="border-2 border-purple-200 rounded-lg p-4 bg-purple-50">
            <div className="text-2xl mb-2">ðŸŽ®</div>
            <h5 className="font-semibold">Enrichment Challenges</h5>
            <p className="text-sm text-gray-600 mt-1">TikTok-style viral challenges</p>
          </div>
          <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
            <div className="text-2xl mb-2">ðŸ†</div>
            <h5 className="font-semibold">Cat Personality Quiz</h5>
            <p className="text-sm text-gray-600 mt-1">Shareable personality types</p>
          </div>
          <div className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
            <div className="text-2xl mb-2">ðŸ“¸</div>
            <h5 className="font-semibold">Daily Photo Prompts</h5>
            <p className="text-sm text-gray-600 mt-1">BeReal for cats</p>
          </div>
          <div className="border-2 border-yellow-200 rounded-lg p-4 bg-yellow-50">
            <div className="text-2xl mb-2">ðŸŽ¯</div>
            <h5 className="font-semibold">Referral Rewards</h5>
            <p className="text-sm text-gray-600 mt-1">Unlock features by inviting</p>
          </div>
          <div className="border-2 border-orange-200 rounded-lg p-4 bg-orange-50">
            <div className="text-2xl mb-2">ðŸ”—</div>
            <h5 className="font-semibold">Embeddable Widgets</h5>
            <p className="text-sm text-gray-600 mt-1">Cat stats on any website</p>
          </div>
        </div>
      </div>

      {/* SEO Strategy */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-4">ðŸ” SEO Domination Strategy</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">User-Generated SEO</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5" />
                <span>Every profile = indexed page</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5" />
                <span>Q&A posts = long-tail keywords</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5" />
                <span>Auto-generated topic pages</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5" />
                <span>Rich snippets for everything</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Target Keywords</h4>
            <div className="space-y-2">
              {[
                '"cat enrichment ideas"',
                '"Bengal cat behavior"',
                '"how to stop cat zoomies"',
                '"best puzzle feeders senior cats"',
                '"cat anxiety solutions"'
              ].map(keyword => (
                <div key={keyword} className="bg-gray-50 px-3 py-2 rounded text-sm font-mono">
                  {keyword}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  const BusinessSection = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-2">Business Model</h2>
        <p>Revenue streams, partnerships, and sustainable growth</p>
      </div>

      {/* Revenue Streams */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-4">ðŸ’° Diversified Revenue Streams</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-700 mb-3">Consumer Revenue</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Cloud Club Premium</span>
                <span className="font-bold">$7/mo</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Nova Pro (Creators)</span>
                <span className="font-bold">$15/mo</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Virtual Goods</span>
                <span className="font-bold">$2-10</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Creator Marketplace</span>
                <span className="font-bold">20% take</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 mb-3">B2B Revenue</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Research Licensing</span>
                <span className="font-bold">$10K-100K</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Insurance Partners</span>
                <span className="font-bold">Rev share</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Vet Clinics</span>
                <span className="font-bold">$99/mo</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Pet Brands</span>
                <span className="font-bold">Sponsored</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h5 className="font-semibold text-yellow-800 mb-2">5-Year Revenue Projection</h5>
          <div className="grid grid-cols-5 gap-2 text-center text-sm">
            <div>
              <div className="font-bold">Y1</div>
              <div className="text-gray-600">$500K</div>
            </div>
            <div>
              <div className="font-bold">Y2</div>
              <div className="text-gray-600">$2.5M</div>
            </div>
            <div>
              <div className="font-bold">Y3</div>
              <div className="text-gray-600">$10M</div>
            </div>
            <div>
              <div className="font-bold">Y4</div>
              <div className="text-gray-600">$35M</div>
            </div>
            <div>
              <div className="font-bold">Y5</div>
              <div className="text-gray-600">$100M</div>
            </div>
          </div>
        </div>
      </div>

      {/* Partnership Strategy */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-4">ðŸ¤ Strategic Partnerships</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { 
              category: 'Insurance', 
              partners: ['Nationwide', 'MetLife', 'Embrace'],
              value: 'Premium discounts for tracked wellness'
            },
            {
              category: 'Airlines',
              partners: ['Delta', 'United', 'American'],
              value: 'Digital passport integration'
            },
            {
              category: 'Vet Chains',
              partners: ['VCA', 'BluePearl', 'Banfield'],
              value: 'EMR integration & referrals'
            },
            {
              category: 'Pet Retail',
              partners: ['PetSmart', 'Petco', 'Chewy'],
              value: 'Product recommendations'
            },
            {
              category: 'Tech',
              partners: ['Whistle', 'Fi', 'PetCube'],
              value: 'Wearable data integration'
            },
            {
              category: 'Research',
              partners: ['UC Davis', 'Cornell', 'Waltham'],
              value: 'Academic validation'
            }
          ].map(partner => (
            <div key={partner.category} className="border rounded-lg p-4">
              <h5 className="font-semibold text-sm mb-2">{partner.category}</h5>
              <div className="text-xs text-gray-600 mb-2">{partner.partners.join(', ')}</div>
              <div className="text-xs text-green-600 font-medium">{partner.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Growth Metrics */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-4">ðŸ“ˆ Growth & Success Metrics</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">100K</div>
            <div className="text-sm text-gray-600">Users Year 1</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">15%</div>
            <div className="text-sm text-gray-600">Paid Conversion</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">$84</div>
            <div className="text-sm text-gray-600">Annual ARPU</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">65%</div>
            <div className="text-sm text-gray-600">DAU/MAU</div>
          </div>
        </div>
      </div>
    </div>
  );
  const TechnicalSection = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-2">Technical Architecture</h2>
        <p>Tech stack, integrations, and security infrastructure</p>
      </div>

      {/* Tech Stack */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-4">ðŸ› ï¸ Modern Tech Stack</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="border-2 border-indigo-200 rounded-lg p-4">
            <h5 className="font-semibold text-indigo-700 mb-3">Frontend</h5>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-400 rounded-full" />
                <span>Next.js 15 + React 19 + TypeScript 5</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-400 rounded-full" />
                <span>Tailwind CSS 4 + Turbopack</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-400 rounded-full" />
                <span>React Three Fiber 9.4 + Three.js 0.180</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-400 rounded-full" />
                <span>@react-three/rapier (physics engine)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-400 rounded-full" />
                <span>React Query + tRPC 11.6</span>
              </div>
            </div>
          </div>
          <div className="border-2 border-purple-200 rounded-lg p-4">
            <h5 className="font-semibold text-purple-700 mb-3">Backend & API</h5>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <span>tRPC 11.6 (type-safe APIs)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <span>NextAuth.js 4.24.11 (JWT)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <span>Supabase (PostgreSQL)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <span>9 tRPC routers (cats, zones, user, friend, etc.)</span>
              </div>
            </div>
          </div>
          <div className="border-2 border-pink-200 rounded-lg p-4">
            <h5 className="font-semibold text-pink-700 mb-3">Infrastructure</h5>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-400 rounded-full" />
                <span>Vercel (recommended deployment)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-400 rounded-full" />
                <span>Supabase Storage (images)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-400 rounded-full" />
                <span>Vite 5 (dev tooling)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-400 rounded-full" />
                <span>npm package manager</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI/ML Architecture */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-4">ðŸ§  AI & ML Systems</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold mb-3">Natural Language Processing</h5>
            <ul className="space-y-2 text-sm">
              <li>â€¢ Semantic search (OpenAI embeddings)</li>
              <li>â€¢ Auto-tagging & categorization</li>
              <li>â€¢ Duplicate detection</li>
              <li>â€¢ Content moderation</li>
              <li>â€¢ Sentiment analysis</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-3">Predictive Analytics</h5>
            <ul className="space-y-2 text-sm">
              <li>â€¢ Health risk prediction</li>
              <li>â€¢ Behavior pattern analysis</li>
              <li>â€¢ Enrichment recommendations</li>
              <li>â€¢ User churn prediction</li>
              <li>â€¢ Content quality scoring</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Integration Architecture */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-4">ðŸ”— Integration Architecture</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h5 className="font-semibold">Veterinary EMR Integration</h5>
            <p className="text-sm text-gray-600 mt-1">
              API connections to ezyVet, Vetspire, Shepherd. Read-only initially, bidirectional later.
            </p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h5 className="font-semibold">Wearable Device APIs</h5>
            <p className="text-sm text-gray-600 mt-1">
              ROOK platform for aggregating Whistle, Fi, PetCube data. Real-time activity sync.
            </p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4">
            <h5 className="font-semibold">Travel & Border Systems</h5>
            <p className="text-sm text-gray-600 mt-1">
              CDC Dog Import Form API, airline booking systems, USDA APHIS integration.
            </p>
          </div>
          <div className="border-l-4 border-orange-500 pl-4">
            <h5 className="font-semibold">Insurance Platforms</h5>
            <p className="text-sm text-gray-600 mt-1">
              Direct API with Nationwide, MetLife. Wellness tracking for premium discounts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  const RoadmapSection = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-2">Roadmap & Launch Strategy</h2>
        <p>Timeline, milestones, and go-to-market plan</p>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-6">ðŸ—“ï¸ Launch Timeline</h3>
        <div className="space-y-6">
          {[
            {
              phase: 'Q4 2025',
              title: 'Pre-Launch',
              items: [
                'Finish MVP development',
                'Private beta (500 users)',
                'Seed round fundraising',
                'Content creation'
              ],
              color: 'blue'
            },
            {
              phase: 'Q1 2026',
              title: 'Public Launch',
              items: [
                'Launch core features',
                'Marketing campaign',
                'Influencer partnerships',
                '10K users target'
              ],
              color: 'green'
            },
            {
              phase: 'Q2-Q3 2026',
              title: 'Growth Phase',
              items: [
                'Premium features',
                'Vet partnerships',
                'Research platform',
                '100K users target'
              ],
              color: 'purple'
            },
            {
              phase: 'Q4 2026',
              title: 'Expansion',
              items: [
                'Pet passport launch',
                'Insurance integration',
                'Series A funding',
                '500K users target'
              ],
              color: 'orange'
            }
          ].map((phase, idx) => (
            <div key={idx} className="flex gap-4">
              <div className={`w-32 text-right font-semibold text-${phase.color}-600`}>
                {phase.phase}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-2">{phase.title}</h4>
                <ul className="space-y-1">
                  {phase.items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className={`w-2 h-2 bg-${phase.color}-400 rounded-full`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Go-to-Market Strategy */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-4">ðŸš€ Go-to-Market Strategy</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Launch Channels</h4>
            <div className="space-y-2">
              {[
                { channel: 'TikTok', strategy: "Nova's Lab viral content" },
                { channel: 'Instagram', strategy: 'Cat parent communities' },
                { channel: 'Reddit', strategy: 'r/cats organic presence' },
                { channel: 'Product Hunt', strategy: 'Launch day coordination' },
                { channel: 'Cat influencers', strategy: '50 micro-influencers' }
              ].map(item => (
                <div key={item.channel} className="flex justify-between text-sm">
                  <span className="font-medium">{item.channel}</span>
                  <span className="text-gray-600">{item.strategy}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Growth Tactics</h4>
            <div className="space-y-2">
              {[
                'Referral rewards program',
                'SEO content strategy',
                'Community challenges',
                'Creator partnerships',
                'Freemium conversion'
              ].map(tactic => (
                <div key={tactic} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{tactic}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Success Milestones */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-4">ðŸ† Success Milestones</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { metric: 'Users', y1: '100K', y3: '1M', y5: '10M' },
            { metric: 'Revenue', y1: '$500K', y3: '$10M', y5: '$100M' },
            { metric: 'Cats Tracked', y1: '150K', y3: '1.5M', y5: '15M' },
            { metric: 'Research Studies', y1: '5', y3: '50', y5: '500' },
            { metric: 'Vet Partners', y1: '100', y3: '1K', y5: '10K' },
            { metric: 'Team Size', y1: '10', y3: '50', y5: '250' }
          ].map(milestone => (
            <div key={milestone.metric} className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
              <div className="font-semibold text-purple-700">{milestone.metric}</div>
              <div className="mt-2 space-y-1 text-sm">
                <div>Y1: {milestone.y1}</div>
                <div>Y3: {milestone.y3}</div>
                <div>Y5: {milestone.y5}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render the active section
  const renderSection = () => {
    switch(activeSection) {
      case 'overview': return <OverviewDashboard />;
      case 'integration': return <IntegrationMap />;
      case 'action90': return <Action90Day />;
      case 'gaps': return <GapAnalysis />;
      case 'decisions': return <DecisionsTracker />;
      case 'devSprints': return <DevSprintsSection />;
      case 'teamSync': return <TeamSyncSection />;
      case 'techSpecs': return <TechSpecsSection />;
      case 'risks': return <RisksBlockersSection />;
      case 'changelog': return <DecisionLogSection />;
      case 'vision': return <VisionStrategy />;
      case 'features': return <FeaturesSection />;
      case 'research': return <ResearchSection />;
      case 'community': return <CommunitySection />;
      case 'business': return <BusinessSection />;
      case 'technical': return <TechnicalSection />;
      case 'roadmap': return <RoadmapSection />;
      default: return <OverviewDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white border-r transition-all duration-300 overflow-y-auto`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <div className={`flex items-center gap-2 ${!sidebarOpen && 'justify-center'}`}>
              <HauskatIcon className="w-8 h-8" color="#9333ea" />
              {sidebarOpen && <span className="font-bold text-xl">Hauskat</span>}
            </div>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Search */}
          {sidebarOpen && (
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm"
                />
              </div>
            </div>
          )}

          {/* Version Badge */}
          {sidebarOpen && (
            <div className="mb-4 px-2">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-2 text-center">
                <div className="text-xs font-semibold text-purple-700">Mission Control v4.5</div>
                <div className="text-xs text-gray-600">Enhanced Edition</div>
              </div>
            </div>
          )}

          {/* Navigation Items */}
          <div className="space-y-2">
            {Object.entries(sections).map(([key, section]) => {
              const Icon = section.icon;
              const isNew = ['integration', 'action90', 'gaps', 'decisions'].includes(key);
              return (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition relative ${
                    activeSection === key 
                      ? `bg-${section.color}-100 text-${section.color}-700 font-medium` 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${activeSection === key ? `text-${section.color}-600` : 'text-gray-500'}`} />
                  {sidebarOpen && (
                    <div className="flex-1 text-left">
                      <div className="text-sm flex items-center gap-2">
                        {section.title}
                        {isNew && (
                          <span className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded font-bold">NEW</span>
                        )}
                      </div>
                      {activeSection === key && (
                        <div className="text-xs opacity-75">{section.description}</div>
                      )}
                    </div>
                  )}
                  {sidebarOpen && activeSection === key && (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default HauskatMissionControlV45;

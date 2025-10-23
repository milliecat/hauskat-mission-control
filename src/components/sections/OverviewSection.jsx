import React from 'react';
import { Cat, Heart, CheckCircle, Activity, Clock } from 'lucide-react';

const OverviewSection = React.memo(({ completedItems, onToggleComplete }) => {
  const weekTasks = [
    { id: 'week-1', task: 'Continue optimizing 3D cat game performance', priority: 'HIGH' },
    { id: 'week-2', task: 'Enhance multiplayer zone system stability', priority: 'HIGH' },
    { id: 'week-3', task: 'Add more zones beyond Home and Town', priority: 'MEDIUM' },
    { id: 'week-4', task: 'Implement additional cat customization', priority: 'MEDIUM' },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
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
            <div className="font-bold text-lg">Active Development</div>
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

      {/* Status Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-6 border-2 border-green-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-700">Complete</h3>
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">6/8</div>
          <div className="text-sm text-gray-600">Strategic foundations ready</div>
        </div>

        <div className="bg-white rounded-lg p-6 border-2 border-orange-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-700">In Progress</h3>
            <Activity className="w-6 h-6 text-orange-500" />
          </div>
          <div className="text-3xl font-bold text-orange-600 mb-2">8</div>
          <div className="text-sm text-gray-600">Critical gaps to address</div>
        </div>

        <div className="bg-white rounded-lg p-6 border-2 border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-700">MVP Timeline</h3>
            <Clock className="w-6 h-6 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
          <div className="text-sm text-gray-600">Weeks to beta launch</div>
        </div>
      </div>

      {/* This Week's Priorities */}
      <div className="bg-white rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">This Week's Priorities</h3>
          <span className="text-sm text-gray-500">Week of Oct 22, 2025</span>
        </div>
        <div className="space-y-3">
          {weekTasks.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <input
                type="checkbox"
                className="w-5 h-5 text-purple-600 rounded"
                onChange={() => onToggleComplete(item.id)}
                checked={completedItems.has(item.id)}
                aria-label={item.task}
              />
              <div className="flex-1">
                <div className={completedItems.has(item.id) ? 'line-through text-gray-400' : ''}>
                  {item.task}
                </div>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded ${
                  item.priority === 'HIGH' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {item.priority}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

OverviewSection.displayName = 'OverviewSection';

export default OverviewSection;

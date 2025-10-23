import React from 'react';
import { Calendar } from 'lucide-react';

const Action90Section = React.memo(({ completedItems, onToggleComplete }) => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl p-6">
      <div className="flex items-center gap-3 mb-2">
        <Calendar className="w-8 h-8" />
        <h2 className="text-3xl font-bold">90-Day Action Plan</h2>
      </div>
      <p className="text-lg opacity-90">Week-by-week execution roadmap</p>
    </div>
    <div className="bg-white rounded-xl p-6">
      <p className="text-gray-600">Detailed 90-day action plan coming soon...</p>
    </div>
  </div>
));

Action90Section.displayName = 'Action90Section';
export default Action90Section;

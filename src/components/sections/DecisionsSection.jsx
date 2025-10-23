import React from 'react';
import { GitBranch } from 'lucide-react';

const DecisionsSection = React.memo(({ completedItems, onToggleComplete }) => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-yellow-600 to-amber-600 text-white rounded-xl p-6">
      <div className="flex items-center gap-3 mb-2">
        <GitBranch className="w-8 h-8" />
        <h2 className="text-3xl font-bold">Decisions Tracker</h2>
      </div>
      <p className="text-lg opacity-90">Technical & business choices</p>
    </div>
    <div className="bg-white rounded-xl p-6">
      <p className="text-gray-600">Decision tracking coming soon...</p>
    </div>
  </div>
));

DecisionsSection.displayName = 'DecisionsSection';
export default DecisionsSection;

import React from 'react';
import { List } from 'lucide-react';

const DevSprintsSection = React.memo(({ completedItems, onToggleComplete }) => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl p-6">
      <div className="flex items-center gap-3 mb-2">
        <List className="w-8 h-8" />
        <h2 className="text-3xl font-bold">Dev Sprint Board</h2>
      </div>
      <p className="text-lg opacity-90">Actionable dev tickets & sprints</p>
    </div>
    <div className="bg-white rounded-xl p-6">
      <p className="text-gray-600">Sprint board coming soon...</p>
    </div>
  </div>
));

DevSprintsSection.displayName = 'DevSprintsSection';
export default DevSprintsSection;

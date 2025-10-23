import React from 'react';
import { CheckSquare } from 'lucide-react';

const GapsSection = React.memo(({ completedItems, onToggleComplete }) => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl p-6">
      <div className="flex items-center gap-3 mb-2">
        <CheckSquare className="w-8 h-8" />
        <h2 className="text-3xl font-bold">Gap Analysis</h2>
      </div>
      <p className="text-lg opacity-90">What we still need to build</p>
    </div>
    <div className="bg-white rounded-xl p-6">
      <p className="text-gray-600">Gap analysis details coming soon...</p>
    </div>
  </div>
));

GapsSection.displayName = 'GapsSection';
export default GapsSection;

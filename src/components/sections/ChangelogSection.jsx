import React from 'react';
import { BookOpen } from 'lucide-react';

const ChangelogSection = React.memo(() => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl p-6">
      <div className="flex items-center gap-3 mb-2">
        <BookOpen className="w-8 h-8" />
        <h2 className="text-3xl font-bold">Decision Log</h2>
      </div>
      <p className="text-lg opacity-90">Why & when decisions made</p>
    </div>
    <div className="bg-white rounded-xl p-6">
      <p className="text-gray-600">Decision changelog coming soon...</p>
    </div>
  </div>
));

ChangelogSection.displayName = 'ChangelogSection';
export default ChangelogSection;

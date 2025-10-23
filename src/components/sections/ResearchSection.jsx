import React from 'react';
import { FlaskConical } from 'lucide-react';

const ResearchSection = React.memo(() => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white rounded-xl p-6">
      <div className="flex items-center gap-3 mb-2">
        <FlaskConical className="w-8 h-8" />
        <h2 className="text-3xl font-bold">Research & Data</h2>
      </div>
      <p className="text-lg opacity-90">Pet passport, citizen science</p>
    </div>
    <div className="bg-white rounded-xl p-6">
      <p className="text-gray-600">Research data coming soon...</p>
    </div>
  </div>
));

ResearchSection.displayName = 'ResearchSection';
export default ResearchSection;

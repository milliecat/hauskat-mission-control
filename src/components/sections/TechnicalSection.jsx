import React from 'react';
import { Database } from 'lucide-react';

const TechnicalSection = React.memo(() => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-6">
      <div className="flex items-center gap-3 mb-2">
        <Database className="w-8 h-8" />
        <h2 className="text-3xl font-bold">Technical Architecture</h2>
      </div>
      <p className="text-lg opacity-90">Tech stack, integrations</p>
    </div>
    <div className="bg-white rounded-xl p-6">
      <p className="text-gray-600">Technical architecture coming soon...</p>
    </div>
  </div>
));

TechnicalSection.displayName = 'TechnicalSection';
export default TechnicalSection;

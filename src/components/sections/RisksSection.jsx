import React from 'react';
import { AlertCircle } from 'lucide-react';

const RisksSection = React.memo(() => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl p-6">
      <div className="flex items-center gap-3 mb-2">
        <AlertCircle className="w-8 h-8" />
        <h2 className="text-3xl font-bold">Risks & Blockers</h2>
      </div>
      <p className="text-lg opacity-90">Issues & dependencies</p>
    </div>
    <div className="bg-white rounded-xl p-6">
      <p className="text-gray-600">Risks and blockers tracking coming soon...</p>
    </div>
  </div>
));

RisksSection.displayName = 'RisksSection';
export default RisksSection;

import React from 'react';
import { DollarSign } from 'lucide-react';

const BusinessSection = React.memo(() => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-yellow-600 to-green-600 text-white rounded-xl p-6">
      <div className="flex items-center gap-3 mb-2">
        <DollarSign className="w-8 h-8" />
        <h2 className="text-3xl font-bold">Business Model</h2>
      </div>
      <p className="text-lg opacity-90">Revenue streams, growth</p>
    </div>
    <div className="bg-white rounded-xl p-6">
      <p className="text-gray-600">Business model details coming soon...</p>
    </div>
  </div>
));

BusinessSection.displayName = 'BusinessSection';
export default BusinessSection;

import React from 'react';
import { Sparkles } from 'lucide-react';

const FeaturesSection = React.memo(() => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl p-6">
      <div className="flex items-center gap-3 mb-2">
        <Sparkles className="w-8 h-8" />
        <h2 className="text-3xl font-bold">Features & Functions</h2>
      </div>
      <p className="text-lg opacity-90">All features from MVP to dream</p>
    </div>
    <div className="bg-white rounded-xl p-6">
      <p className="text-gray-600">Features list coming soon...</p>
    </div>
  </div>
));

FeaturesSection.displayName = 'FeaturesSection';
export default FeaturesSection;

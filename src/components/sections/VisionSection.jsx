import React from 'react';
import { Target } from 'lucide-react';

const VisionSection = React.memo(() => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6">
      <div className="flex items-center gap-3 mb-2">
        <Target className="w-8 h-8" />
        <h2 className="text-3xl font-bold">Vision & Strategy</h2>
      </div>
      <p className="text-lg opacity-90">Brand, mission, positioning</p>
    </div>
    <div className="bg-white rounded-xl p-6">
      <p className="text-gray-600">Vision and strategy details coming soon...</p>
    </div>
  </div>
));

VisionSection.displayName = 'VisionSection';
export default VisionSection;

import React from 'react';
import { Map } from 'lucide-react';

const RoadmapSection = React.memo(() => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl p-6">
      <div className="flex items-center gap-3 mb-2">
        <Map className="w-8 h-8" />
        <h2 className="text-3xl font-bold">Roadmap & Launch</h2>
      </div>
      <p className="text-lg opacity-90">Timeline, priorities</p>
    </div>
    <div className="bg-white rounded-xl p-6">
      <p className="text-gray-600">Roadmap details coming soon...</p>
    </div>
  </div>
));

RoadmapSection.displayName = 'RoadmapSection';
export default RoadmapSection;

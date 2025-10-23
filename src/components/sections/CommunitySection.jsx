import React from 'react';
import { Users } from 'lucide-react';

const CommunitySection = React.memo(() => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl p-6">
      <div className="flex items-center gap-3 mb-2">
        <Users className="w-8 h-8" />
        <h2 className="text-3xl font-bold">Community & Content</h2>
      </div>
      <p className="text-lg opacity-90">Knowledge hub, virality</p>
    </div>
    <div className="bg-white rounded-xl p-6">
      <p className="text-gray-600">Community content coming soon...</p>
    </div>
  </div>
));

CommunitySection.displayName = 'CommunitySection';
export default CommunitySection;

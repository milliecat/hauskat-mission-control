import React from 'react';
import { Users } from 'lucide-react';

const TeamSyncSection = React.memo(() => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl p-6">
      <div className="flex items-center gap-3 mb-2">
        <Users className="w-8 h-8" />
        <h2 className="text-3xl font-bold">Team Sync</h2>
      </div>
      <p className="text-lg opacity-90">Daily status & blockers</p>
    </div>
    <div className="bg-white rounded-xl p-6">
      <p className="text-gray-600">Team sync dashboard coming soon...</p>
    </div>
  </div>
));

TeamSyncSection.displayName = 'TeamSyncSection';
export default TeamSyncSection;

import React from 'react';
import { FileText } from 'lucide-react';

const TechSpecsSection = React.memo(() => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl p-6">
      <div className="flex items-center gap-3 mb-2">
        <FileText className="w-8 h-8" />
        <h2 className="text-3xl font-bold">Technical Specs</h2>
      </div>
      <p className="text-lg opacity-90">APIs, schemas, architecture</p>
    </div>
    <div className="bg-white rounded-xl p-6">
      <p className="text-gray-600">Technical specifications coming soon...</p>
    </div>
  </div>
));

TechSpecsSection.displayName = 'TechSpecsSection';
export default TechSpecsSection;

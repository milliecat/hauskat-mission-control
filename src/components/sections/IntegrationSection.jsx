import React from 'react';
import { Layers, ArrowRight, Sparkles } from 'lucide-react';
import { COLOR_CLASSES } from '../../constants/sections';

const IntegrationSection = React.memo(() => {
  const layers = [
    {
      layer: 'Layer 1: Identity',
      name: 'Profiles',
      description: 'MySpace for cats - Customizable profiles, emotional storytelling',
      features: ['Profile customization', 'Themes & CSS', 'Bio & personality', 'Photo galleries'],
      value: 'Expression & Belonging',
      color: 'purple',
      status: 'MVP Core',
    },
    {
      layer: 'Layer 2: Data Generation',
      name: 'Wellness Tracking',
      description: 'Daily mood & enrichment logging - Health observations, care patterns',
      features: ['Daily check-ins', 'Mood tracking', 'Energy levels', 'Pattern analytics'],
      value: 'Understanding & Awareness',
      color: 'blue',
      status: 'MVP Core',
    },
    {
      layer: 'Layer 3: Intelligence',
      name: 'Knowledge Hub',
      description: 'AI-powered Q&A - Pattern recognition, community wisdom',
      features: ['50 seed Q&As', 'Community answers', 'Expert badges', 'Upvoting system'],
      value: 'Learning & Trust',
      color: 'green',
      status: 'MVP Core',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <Layers className="w-8 h-8" />
          <h2 className="text-3xl font-bold">Integration Map</h2>
        </div>
        <p>How all the pieces fit together into one coherent system</p>
      </div>

      <div className="bg-white rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-6 text-center">The Emotional Operating System</h3>
        <div className="space-y-6">
          {layers.map((layer, idx) => {
            const colorClass = COLOR_CLASSES[layer.color];
            return (
              <div key={idx}>
                <div className={`${colorClass.bg} border-2 ${colorClass.border} rounded-lg p-6`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-sm font-semibold text-gray-500 mb-1">{layer.layer}</div>
                      <h4 className="text-xl font-bold text-gray-900">{layer.name}</h4>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">
                      {layer.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{layer.description}</p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {layer.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-center gap-2 text-xs">
                        <div className={`w-1.5 h-1.5 ${colorClass.bgDark} rounded-full`} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className={`w-4 h-4 ${colorClass.textDark}`} />
                    <span className="text-sm font-medium text-gray-700">{layer.value}</span>
                  </div>
                </div>
                {idx < layers.length - 1 && (
                  <div className="flex justify-center my-2">
                    <ArrowRight className="w-6 h-6 text-gray-400 rotate-90" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

IntegrationSection.displayName = 'IntegrationSection';

export default IntegrationSection;

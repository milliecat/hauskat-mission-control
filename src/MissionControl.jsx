import React, { Suspense, lazy } from 'react';
import { useMissionControl } from './hooks/useMissionControl';
import Sidebar from './components/Sidebar';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load section components for code splitting
const OverviewSection = lazy(() => import('./components/sections/OverviewSection'));
const IntegrationSection = lazy(() => import('./components/sections/IntegrationSection'));
const Action90Section = lazy(() => import('./components/sections/Action90Section'));
const GapsSection = lazy(() => import('./components/sections/GapsSection'));
const DecisionsSection = lazy(() => import('./components/sections/DecisionsSection'));
const VisionSection = lazy(() => import('./components/sections/VisionSection'));
const FeaturesSection = lazy(() => import('./components/sections/FeaturesSection'));
const ResearchSection = lazy(() => import('./components/sections/ResearchSection'));
const CommunitySection = lazy(() => import('./components/sections/CommunitySection'));
const BusinessSection = lazy(() => import('./components/sections/BusinessSection'));
const TechnicalSection = lazy(() => import('./components/sections/TechnicalSection'));
const RoadmapSection = lazy(() => import('./components/sections/RoadmapSection'));
const DevSprintsSection = lazy(() => import('./components/sections/DevSprintsSection'));
const TeamSyncSection = lazy(() => import('./components/sections/TeamSyncSection'));
const TechSpecsSection = lazy(() => import('./components/sections/TechSpecsSection'));
const RisksSection = lazy(() => import('./components/sections/RisksSection'));
const ChangelogSection = lazy(() => import('./components/sections/ChangelogSection'));

/**
 * Loading component for lazy-loaded sections
 */
const SectionLoader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      <p className="mt-2 text-gray-600">Loading...</p>
    </div>
  </div>
);

/**
 * Main Mission Control component - Refactored and optimized
 */
const HauskatMissionControl = () => {
  const { state, actions } = useMissionControl();

  const renderSection = () => {
    const sectionProps = {
      completedItems: state.completedItems,
      onToggleComplete: actions.toggleComplete,
    };

    const sections = {
      overview: <OverviewSection {...sectionProps} />,
      integration: <IntegrationSection {...sectionProps} />,
      action90: <Action90Section {...sectionProps} />,
      gaps: <GapsSection {...sectionProps} />,
      decisions: <DecisionsSection {...sectionProps} />,
      vision: <VisionSection {...sectionProps} />,
      features: <FeaturesSection {...sectionProps} />,
      research: <ResearchSection {...sectionProps} />,
      community: <CommunitySection {...sectionProps} />,
      business: <BusinessSection {...sectionProps} />,
      technical: <TechnicalSection {...sectionProps} />,
      roadmap: <RoadmapSection {...sectionProps} />,
      devSprints: <DevSprintsSection {...sectionProps} />,
      teamSync: <TeamSyncSection {...sectionProps} />,
      techSpecs: <TechSpecsSection {...sectionProps} />,
      risks: <RisksSection {...sectionProps} />,
      changelog: <ChangelogSection {...sectionProps} />,
    };

    return sections[state.activeSection] || sections.overview;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={state.sidebarOpen}
        activeSection={state.activeSection}
        onToggle={actions.toggleSidebar}
        onSectionChange={actions.setActiveSection}
      />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto">
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>{renderSection()}</Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default HauskatMissionControl;

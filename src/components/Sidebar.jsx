import React from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { SECTIONS, COLOR_CLASSES } from '../constants/sections';
import HauskatIcon from '../HauskatIcon';

/**
 * Sidebar navigation component
 */
const Sidebar = React.memo(({ isOpen, activeSection, onToggle, onSectionChange }) => {
  const newSections = ['integration', 'action90', 'gaps', 'decisions'];

  return (
    <div
      className={`${
        isOpen ? 'w-64' : 'w-16'
      } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {isOpen ? (
          <>
            <div className="flex items-center gap-2">
              <HauskatIcon className="w-8 h-8" />
              <span className="font-bold text-purple-700">Hauskat</span>
            </div>
            <button
              onClick={onToggle}
              className="p-1 hover:bg-gray-100 rounded transition"
              aria-label="Close sidebar"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>
          </>
        ) : (
          <button
            onClick={onToggle}
            className="p-1 hover:bg-gray-100 rounded transition"
            aria-label="Open sidebar"
            type="button"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-2">
          {Object.entries(SECTIONS).map(([key, section]) => {
            const Icon = section.icon;
            const isNew = newSections.includes(key);
            const isActive = activeSection === key;
            const colorClass = COLOR_CLASSES[section.color];

            return (
              <button
                key={key}
                onClick={() => onSectionChange(key)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition relative ${
                  isActive
                    ? `${colorClass.bg} ${colorClass.text} font-medium`
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
                aria-label={`Navigate to ${section.title}`}
                aria-current={isActive ? 'page' : undefined}
                type="button"
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 ${
                    isActive ? colorClass.textDark : 'text-gray-500'
                  }`}
                  aria-hidden="true"
                />
                {isOpen && (
                  <div className="flex-1 text-left min-w-0">
                    <div className="text-sm flex items-center gap-2">
                      <span className="truncate">{section.title}</span>
                      {isNew && (
                        <span
                          className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded font-bold flex-shrink-0"
                          aria-label="New section"
                        >
                          NEW
                        </span>
                      )}
                    </div>
                    {isActive && <div className="text-xs opacity-75">{section.description}</div>}
                  </div>
                )}
                {isOpen && isActive && (
                  <ChevronRight className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;

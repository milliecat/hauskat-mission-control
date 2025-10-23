import React from 'react';

/**
 * Template for section components
 * Usage: Create specific sections by importing and customizing this template
 */
export const createSection = ({ title, icon: Icon, gradient, description, children }) => {
  const Section = React.memo((props) => {
    return (
      <div className="space-y-6">
        <div className={`${gradient} text-white rounded-xl p-6`}>
          <div className="flex items-center gap-3 mb-2">
            <Icon className="w-8 h-8" />
            <h2 className="text-3xl font-bold">{title}</h2>
          </div>
          {description && <p className="text-lg opacity-90">{description}</p>}
        </div>

        <div className="bg-white rounded-xl p-6">
          {typeof children === 'function' ? children(props) : children}
        </div>
      </div>
    );
  });

  Section.displayName = `${title}Section`;
  return Section;
};

export default createSection;

// src/components/SkillsSelector.js

import React, { useState } from 'react';

// Enhanced skills with categories and descriptions
const SKILL_CATEGORIES = {
  "Marketing & Social Media": [
    { name: "SMM", description: "Social Media Marketing" },
    { name: "Copywriting", description: "Content writing and copy creation" },
    { name: "Content Creation", description: "Creating engaging content" },
    { name: "Canva", description: "Graphic design tool" },
    { name: "Video Editing", description: "Video content creation" }
  ],
  "Sales & Communication": [
    { name: "Sales", description: "Sales techniques and customer acquisition" },
    { name: "Public Speaking", description: "Presenting and public speaking" },
    { name: "Customer Service", description: "Customer support and service" },
    { name: "English B2", description: "Intermediate English proficiency" }
  ],
  "Design & Creative": [
    { name: "UI/UX Design", description: "User interface and experience design" },
    { name: "Figma", description: "Design and prototyping tool" },
    { name: "Webflow", description: "Website building platform" },
    { name: "Photoshop", description: "Image editing software" }
  ],
  "Technical & Business": [
    { name: "Python", description: "Programming language" },
    { name: "Excel", description: "Spreadsheet and data analysis" },
    { name: "Project Management", description: "Managing projects and teams" },
    { name: "Problem-Solving", description: "Analytical thinking and problem solving" }
  ]
};

export default function SkillsSelector({ selectedSkills, onSkillChange }) {
  const [activeCategory, setActiveCategory] = useState("Marketing & Social Media");
  const [showDescriptions, setShowDescriptions] = useState(false);

  return (
    <div>
      <label className="block fantasy-subtitle text-lg mb-3 text-white">
        What are your strongest skills?
      </label>
      <p className="fantasy-text text-sm text-gray-400 mb-4">
        Select the skills you're confident in. Don't worry if you don't have all of them - focus on what you know best!
      </p>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.keys(SKILL_CATEGORIES).map(category => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === category
                ? 'bg-gold-600 text-white'
                : 'fantasy-card text-gray-300 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="fantasy-subtitle text-white">{activeCategory}</h3>
          <button
            type="button"
            onClick={() => setShowDescriptions(!showDescriptions)}
            className="fantasy-text text-sm text-gold-400 hover:text-gold-300 uppercase tracking-wider"
          >
            {showDescriptions ? 'Hide' : 'Show'} descriptions
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SKILL_CATEGORIES[activeCategory].map((skill) => {
            const isSelected = selectedSkills.includes(skill.name);
            return (
              <div key={skill.name} className="relative">
                <button
                  type="button"
                  onClick={() => onSkillChange(skill.name)}
                  className={`
                    w-full p-3 rounded-lg border-2 transition-all duration-200 text-left
                    ${isSelected 
                      ? 'bg-gold-600 text-white border-gold-600' 
                      : 'fantasy-card text-gold-400 border-gold-500 hover:border-gold-400'
                    }
                  `}
                >
                  <div className="flex justify-between items-center">
                    <span className="fantasy-text font-semibold">{skill.name}</span>
                    {isSelected && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  {showDescriptions && (
                    <p className={`fantasy-text text-sm mt-1 ${isSelected ? 'text-gold-100' : 'text-gray-400'}`}>
                      {skill.description}
                    </p>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Skills Summary */}
      {selectedSkills.length > 0 && (
        <div className="fantasy-card p-4 bg-opacity-50">
          <h4 className="fantasy-subtitle text-gold-400 mb-2">
            Selected Skills ({selectedSkills.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map(skill => (
              <span key={skill} className="fantasy-badge gold flex items-center">
                {skill}
                <button
                  type="button"
                  onClick={() => onSkillChange(skill)}
                  className="ml-2 text-gold-400 hover:text-gold-300"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <p className="fantasy-text text-sm text-gold-300 mt-2">
            These skills will be used to match you with relevant quest opportunities.
          </p>
        </div>
      )}

      {/* Quick Add Popular Skills */}
      <div className="mt-6 fantasy-card p-4 bg-opacity-50">
        <h4 className="fantasy-subtitle text-white mb-3">Quick Add Popular Skills</h4>
        <div className="flex flex-wrap gap-2">
          {['SMM', 'Copywriting', 'Customer Service', 'Excel', 'Public Speaking'].map(skill => (
            <button
              key={skill}
              type="button"
              onClick={() => onSkillChange(skill)}
              disabled={selectedSkills.includes(skill)}
              className={`fantasy-badge ${
                selectedSkills.includes(skill)
                  ? 'green cursor-default'
                  : 'hover:border-gold-400'
              }`}
            >
              {skill} {selectedSkills.includes(skill) && '✓'}
            </button>
          ))}
        </div>
      </div>

      {/* Skill Confidence Levels */}
      {selectedSkills.length > 0 && (
        <div className="mt-6 fantasy-card p-4 bg-opacity-50">
          <h4 className="fantasy-subtitle text-bronze-400 mb-2">💡 Pro Tip</h4>
          <p className="fantasy-text text-sm text-bronze-300">
            Don't worry if you're not an expert in every skill. Many entry-level positions are looking for 
            people who are eager to learn and grow. Focus on your strengths and be honest about your experience level.
          </p>
        </div>
      )}
    </div>
  );
}
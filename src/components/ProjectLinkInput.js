// src/components/ProjectLinkInput.js

import React from 'react';

export default function ProjectLinkInput({ value, onChange }) {
  return (
    <div>
      <label htmlFor="projectLink" className="block text-lg font-bold text-gray-700 mb-2">
        Show your work (optional)
      </label>
      <p className="text-sm text-gray-500 mb-3">
        No formal experience? No problem. Link to your GitHub, blog, a design portfolio, or even an Instagram page you're proud of.
      </p>
      <div className="relative">
        {/* SVG Icon for visual flair */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.665l3-3z" />
            <path d="M8.603 3.799a4.49 4.49 0 01.012 6.355l-3.284 3.283a4.5 4.5 0 01-6.355-6.355l3.283-3.284a.75.75 0 011.06 1.06l-3.283 3.284a3 3 0 004.242 4.242l3.284-3.283a3 3 0 00-4.242-4.242.75.75 0 01-1.06-1.06z" />
          </svg>
        </div>
        <input
          type="url"
          id="projectLink"
          name="projectLink"
          value={value}
          onChange={onChange}
          className="
            w-full pl-10 p-3 border-2 border-gray-300 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200 text-gray-800
          "
          placeholder="https://github.com/your-username"
        />
      </div>
    </div>
  );
}
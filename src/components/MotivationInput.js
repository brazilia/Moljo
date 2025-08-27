// src/components/MotivationInput.js

import React from 'react';

export default function MotivationInput({ value, onChange }) {
  return (
    <div>
      <label htmlFor="motivation" className="block text-lg font-bold text-gray-700 mb-2">
        What are you excited to learn and do?
      </label>
      <p className="text-sm text-gray-500 mb-3">
        Tell companies what drives you. What new skills are you learning? What problems do you want to solve?
      </p>
      <textarea
        id="motivation"
        name="motivation"
        rows="5"
        value={value}
        onChange={onChange}
        className="
          w-full p-3 border-2 border-gray-300 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200 text-gray-800
        "
        placeholder="e.g., 'I am teaching myself UI/UX design because I am fascinated by creating easy-to-use apps. I would love to work with a team to help build a product that people genuinely enjoy...'"
      />
    </div>
  );
}
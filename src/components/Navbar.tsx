import React from 'react';
import { Calculator } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Calculator className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-gray-900">
                LLM Cost Calculator
              </h1>
              <span className="text-xs text-gray-500 hidden sm:block">
                2025 Edition
              </span>
            </div>
          </div>
          
          {/* Optional: Add navigation items or user menu here in the future */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {/* Future navigation items can go here */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
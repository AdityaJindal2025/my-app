'use client';

import { FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { BsFillMoonStarsFill } from 'react-icons/bs';

export default function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="flex justify-between items-center px-8 py-4 border-b bg-white">
      <div className="flex items-center">
        <button
          className="mr-4 text-gray-500 hover:text-gray-900 focus:outline-none text-2xl"
          onClick={() => setSidebarOpen((open) => !open)}
          aria-label={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
        >
          {sidebarOpen ? <span>&#10005;</span> : <span>&#9776;</span>}
        </button>
        <div>
          <span className="text-xs text-gray-400">Pages / Overview</span>
          <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="flex items-center text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> Operational
        </span>
        <a href="#" className="text-gray-400 hover:text-gray-700"><FaGithub size={20} /></a>
        <a href="#" className="text-gray-400 hover:text-gray-700"><FaTwitter size={20} /></a>
        <a href="#" className="text-gray-400 hover:text-gray-700"><FaEnvelope size={20} /></a>
        <button className="text-gray-400 hover:text-gray-700"><BsFillMoonStarsFill size={20} /></button>
      </div>
    </header>
  );
} 
'use client';

import { FaHome, FaCode, FaMagic, FaRegCreditCard, FaCog, FaGlobe, FaFileAlt, FaUserCircle, FaChevronDown, FaExternalLinkAlt } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar({ sidebarOpen }) {
  const pathname = usePathname();

  return (
    <>
      {sidebarOpen && (
        <aside className="w-80 bg-gray-50 text-gray-800 flex flex-col min-h-screen p-0">
          {/* Logo and brand */}
          <div className="flex items-center px-6 pt-8 pb-4">
            <div className="flex items-center space-x-3">
              {/* Placeholder for Tavily logo SVG */}
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <arrow x1="10" y1="30" x2="20" y2="10" stroke="#2563EB" strokeWidth="4" markerEnd="url(#arrowhead)" />
                <arrow x1="20" y1="10" x2="30" y2="20" stroke="#F59E42" strokeWidth="4" markerEnd="url(#arrowhead)" />
                <arrow x1="20" y1="10" x2="10" y2="20" stroke="#F43F5E" strokeWidth="4" markerEnd="url(#arrowhead)" />
                <defs>
                  <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L6,3 z" fill="#fff" />
                  </marker>
                </defs>
              </svg>
              <span className="text-3xl font-bold tracking-tight">Api Manager</span>
            </div>
          </div>
          
          {/* Account dropdown */}
          <div className="px-6 pb-4">
            <div className="relative">
              <button className="w-full flex items-center bg-[#e5e7eb] border border-[#d1d5db] rounded-lg px-4 py-2 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800">
                <span className="w-8 h-8 bg-[#d1d5db] rounded-full flex items-center justify-center text-gray-800 text-lg font-bold mr-3">a</span>
                <span className="flex-1 text-blue-600 text-base text-left font-semibold">Personal</span>
                <FaChevronDown className="ml-2 text-gray-500" />
              </button>
              {/* Dropdown menu placeholder */}
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-2">
            <ul className="space-y-1">
              <li>
                <Link 
                  href="/dashboards" 
                  className={`flex items-center px-4 py-3 rounded-lg font-semibold ${
                    pathname === '/dashboards' 
                      ? 'bg-[#e5e7eb] text-gray-900' 
                      : 'hover:bg-[#e5e7eb] text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <FaHome className="mr-3 text-xl" style={{ color: pathname === '/dashboards' ? '#374151' : '#6B7280' }} /> 
                  Overview
                </Link>
              </li>
              <li>
                <Link 
                  href="/api-playground" 
                  className={`flex items-center px-4 py-3 rounded-lg font-semibold ${
                    pathname === '/api-playground' 
                      ? 'bg-[#e5e7eb] text-gray-900' 
                      : 'hover:bg-[#e5e7eb] text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <FaCode className="mr-3 text-xl" style={{ color: pathname === '/api-playground' ? '#374151' : '#6B7280' }} /> 
                  API Playground
                </Link>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-3 rounded-lg hover:bg-[#e5e7eb] text-gray-700 hover:text-gray-900 font-semibold">
                  <FaMagic className="mr-3 text-xl text-gray-600" /> Use Cases
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-3 rounded-lg hover:bg-[#e5e7eb] text-gray-700 hover:text-gray-900 font-semibold">
                  <FaRegCreditCard className="mr-3 text-xl text-gray-600" /> Billing
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-3 rounded-lg hover:bg-[#e5e7eb] text-gray-700 hover:text-gray-900 font-semibold">
                  <FaCog className="mr-3 text-xl text-gray-600" /> Settings
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-3 rounded-lg hover:bg-[#e5e7eb] text-gray-700 hover:text-gray-900 font-semibold">
                  <FaFileAlt className="mr-3 text-xl text-gray-600" /> Documentation <FaExternalLinkAlt className="ml-2 text-xs text-gray-400" />
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-3 rounded-lg hover:bg-[#e5e7eb] text-gray-700 hover:text-gray-900 font-semibold">
                  <FaGlobe className="mr-3 text-xl text-gray-600" /> Tavily MCP <FaExternalLinkAlt className="ml-2 text-xs text-gray-400" />
                </a>
              </li>
            </ul>
          </nav>
          
          {/* User profile at bottom */}
          <div className="mt-auto px-6 py-6 border-t border-[#d1d5db] flex items-center">
            <span className="w-10 h-10 bg-[#d1d5db] rounded-full flex items-center justify-center text-gray-800 text-xl font-bold mr-3">a</span>
            <span className="flex-1 text-gray-900 font-semibold">aditya jindal</span>
            <button className="ml-2 text-gray-400 hover:text-gray-700">
              <FaExternalLinkAlt />
            </button>
          </div>
        </aside>
      )}
    </>
  );
} 
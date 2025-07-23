'use client';

import { FaTimes, FaEye, FaEyeSlash, FaCopy } from 'react-icons/fa';

export default function ApiKeyDetailsCard({ 
  apiKey, 
  isVisible, 
  onClose, 
  onToggleKeyVisibility, 
  onToggleUserNameVisibility, 
  onCopyToClipboard,
  visibleKeys,
  visibleUserNames
}) {
  if (!isVisible || !apiKey) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative w-full max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">API Key Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Tool Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tool Name</label>
              <div className="bg-gray-50 px-4 py-3 rounded-lg">
                <span className="text-gray-900 font-medium">{apiKey.name}</span>
              </div>
            </div>

            {/* API User Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">API User Name</label>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-50 px-4 py-3 rounded-lg">
                  <code className="text-sm">
                    {visibleUserNames && visibleUserNames[apiKey.id] ? (apiKey.userNameKey || '') : '*'.repeat((apiKey.userNameKey || '').length)}
                  </code>
                </div>
                <button
                  onClick={() => onToggleUserNameVisibility(apiKey.id)}
                  className="text-gray-500 hover:text-gray-800 p-2"
                  type="button"
                >
                  {visibleUserNames && visibleUserNames[apiKey.id] ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
                <button
                  onClick={() => onCopyToClipboard(apiKey.userNameKey || '', 'userNameKey')}
                  className="text-blue-600 hover:text-blue-800 p-2"
                  type="button"
                >
                  <FaCopy size={16} />
                </button>
              </div>
            </div>

            {/* API Key */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-50 px-4 py-3 rounded-lg">
                  <code className="text-sm">
                    {visibleKeys && visibleKeys[apiKey.id] ? apiKey.key : '*'.repeat(apiKey.key.length)}
                  </code>
                </div>
                <button
                  onClick={() => onToggleKeyVisibility(apiKey.id)}
                  className="text-gray-500 hover:text-gray-800 p-2"
                  type="button"
                >
                  {visibleKeys && visibleKeys[apiKey.id] ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
                <button
                  onClick={() => onCopyToClipboard(apiKey.key)}
                  className="text-blue-600 hover:text-blue-800 p-2"
                  type="button"
                >
                  <FaCopy size={16} />
                </button>
              </div>
            </div>

            {/* Key Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Key Type</label>
              <div className="bg-gray-50 px-4 py-3 rounded-lg">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${apiKey.type === 'production' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                  {apiKey.type === 'production' ? 'Production' : 'Development'}
                </span>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <div className="bg-gray-50 px-4 py-3 rounded-lg">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  apiKey.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {apiKey.status}
                </span>
              </div>
            </div>

            {/* Track Type */}
            {(apiKey.trackType && apiKey.trackType !== '') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Track</label>
                <div className="bg-gray-50 px-4 py-3 rounded-lg">
                  <span className="text-gray-900 capitalize">
                    {apiKey.trackType}
                  </span>
                </div>
              </div>
            )}

            {/* Subscription Type */}
            {apiKey.subscriptionType && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subscription Type</label>
                <div className="bg-gray-50 px-4 py-3 rounded-lg">
                  <span className="text-gray-900 capitalize">{apiKey.subscriptionType}</span>
                </div>
              </div>
            )}

            {/* Created Date */}
            {apiKey.created_at && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Activated Date</label>
                <div className="bg-gray-50 px-4 py-3 rounded-lg">
                  <span className="text-gray-900">{new Date(apiKey.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            )}

            {/* Last Used */}
            {apiKey.last_used && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Used</label>
                <div className="bg-gray-50 px-4 py-3 rounded-lg">
                  <span className="text-gray-900">{new Date(apiKey.last_used).toLocaleDateString()}</span>
                </div>
              </div>
            )}

            {/* Description */}
            {apiKey.description && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <div className="bg-gray-50 px-4 py-3 rounded-lg">
                  <span className="text-gray-900">{apiKey.description}</span>
                </div>
              </div>
            )}
          </div>

          {/* Close Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={onClose}
              className="px-6 py-2 text-base font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
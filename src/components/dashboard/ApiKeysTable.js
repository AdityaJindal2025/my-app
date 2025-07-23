'use client';

import { FaEye, FaEyeSlash, FaTrash, FaRegEdit, FaInfoCircle } from 'react-icons/fa';

export default function ApiKeysTable({ 
  apiKeys, 
  visibleKeys, 
  visibleUserNames,
  activeDeleteIcon,
  onToggleKeyVisibility, 
  onCopyToClipboard, 
  onToggleStatus, 
  onEdit, 
  onDeleteClick,
  onToggleUserNameVisibility,
  onShowDetails
}) {
  return (
    <div className="overflow-x-auto max-h-96 overflow-y-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Tool Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 whitespace-nowrap">API User Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50" style={{width: '220px'}}>API Key</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {apiKeys.map((key) => (
            <tr 
              key={key.id} 
              className="hover:bg-gray-50"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">{key.name}</div>
                  <div className="text-sm text-gray-500">{key.description}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-2">
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded w-full truncate block">
                    {visibleUserNames && visibleUserNames[key.id] ? (key.userNameKey || '') : '*'.repeat((key.userNameKey || '').length)}
                  </code>
                  <button
                    onClick={() => onToggleUserNameVisibility(key.id)}
                    className="text-gray-500 hover:text-gray-800 text-sm"
                    type="button"
                    aria-label={visibleUserNames && visibleUserNames[key.id] ? 'Hide API user name' : 'Show API user name'}
                  >
                    {visibleUserNames && visibleUserNames[key.id] ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                  <button
                    onClick={() => onCopyToClipboard(key.userNameKey || '', 'userNameKey')}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                    type="button"
                  >
                    Copy
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap" style={{width: '220px'}}>
                <div className="flex items-center space-x-2">
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded w-full truncate block">
                    {visibleKeys[key.id] ? key.key : '*'.repeat(key.key.length)}
                  </code>
                  <button
                    onClick={() => onToggleKeyVisibility(key.id)}
                    className="text-gray-500 hover:text-gray-800 text-sm"
                    type="button"
                    aria-label={visibleKeys[key.id] ? 'Hide API key' : 'Show API key'}
                  >
                    {visibleKeys[key.id] ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                  <button
                    onClick={() => onCopyToClipboard(key.key)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                    type="button"
                  >
                    Copy
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${key.type === 'production' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                  {key.type === 'production' ? 'Production' : 'Development'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => onToggleStatus(key.id)}
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    key.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {key.status}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onShowDetails(key)}
                    className="text-blue-600 hover:text-blue-900 flex items-center"
                    title="View API Key Details"
                    type="button"
                  >
                    <FaInfoCircle className="mr-1" />
                  </button>
                  <button
                    onClick={() => onEdit(key)}
                    className="text-blue-600 hover:text-blue-900 flex items-center"
                    title="Edit API Key"
                    type="button"
                  >
                    <FaRegEdit className="mr-1" />
                  </button>
                  <button
                    onClick={() => onDeleteClick(key.id)}
                    className="text-red-600 hover:text-red-900 flex items-center"
                    title="Delete API Key"
                    type="button"
                  >
                    <FaTrash className={activeDeleteIcon === key.id ? 'text-red-600 mr-1' : 'text-gray-400 mr-1'} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 
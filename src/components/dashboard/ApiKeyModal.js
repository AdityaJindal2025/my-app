'use client';

import { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { supabase } from '../../app/utils/supabaseClient';

export default function ApiKeyModal({ 
  isModalOpen, 
  editingKey, 
  formData, 
  setFormData, 
  onSubmit, 
  onClose 
}) {
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState(null); // null, 'valid', 'invalid'

  const validateApiKey = async () => {
    if (!formData.key || formData.key.trim() === '') {
      setValidationStatus('invalid');
      return;
    }

    setIsValidating(true);
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('key')
        .eq('key', formData.key.trim())
        .single();

      if (error && error.code === 'PGRST116') {
        // No record found - key is unique
        setValidationStatus('valid');
      } else if (data) {
        // Key already exists
        setValidationStatus('invalid');
      } else {
        setValidationStatus('invalid');
      }
    } catch (error) {
      console.error('Error validating API key:', error);
      setValidationStatus('invalid');
    } finally {
      setIsValidating(false);
    }
  };

  const handleKeyChange = (e) => {
    setFormData({ ...formData, key: e.target.value });
    setValidationStatus(null); // Reset validation status when key changes
  };

  const handleGenerateKey = () => {
    const randomKey = `pk_${Math.random().toString(36).substr(2, 9)}`;
    setFormData({ ...formData, key: randomKey });
    setValidationStatus(null); // Reset validation status when generating new key
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if API Key is validated when creating new key
    if (!editingKey && (!formData.key || formData.key.trim() === '' || validationStatus !== 'valid')) {
      alert('Please enter and validate your API Key before submitting.');
      return;
    }
    
    onSubmit(e);
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative w-full max-w-md mx-auto p-0">
        <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-bold text-center text-gray-900 mb-1">
            {editingKey ? 'Edit API Key' : 'Create a new API key'}
          </h2>
          <p className="text-center text-gray-500 mb-4 text-sm">
            {editingKey ? 'Update the API key details.' : 'Enter a name and limit for the new API key.'}
          </p>
          <form onSubmit={handleSubmit}>
            {/* Show all fields for both create and edit */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tool Name <span className="text-gray-400">— A unique name to identify this tool</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="Tool Name"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                API User Name <span className="text-gray-400">— Name of the user for this key</span>
              </label>
              <input
                type="text"
                value={formData.userName || ''}
                onChange={e => setFormData({ ...formData, userName: e.target.value })}
                placeholder="User Name"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                API Key <span className="text-gray-400">— You can enter or generate a key</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.key || ''}
                  onChange={handleKeyChange}
                  placeholder="pk_..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900"
                  required
                />
                <button
                  type="button"
                  onClick={handleGenerateKey}
                  className="px-3 py-2 bg-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-300"
                >
                  Generate
                </button>
                <button
                  type="button"
                  onClick={validateApiKey}
                  disabled={isValidating || !formData.key || formData.key.trim() === ''}
                  className="px-3 py-2 bg-blue-200 rounded-lg text-sm font-semibold hover:bg-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isValidating ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  ) : (
                    'Validate'
                  )}
                </button>
              </div>
              {/* Validation Status Indicator */}
              {validationStatus && (
                <div className="flex items-center mt-2">
                  {validationStatus === 'valid' ? (
                    <div className="flex items-center text-green-600">
                      <FaCheck className="mr-1" size={14} />
                      <span className="text-sm">API Key is unique and available</span>
                    </div>
                  ) : validationStatus === 'invalid' ? (
                    <div className="flex items-center text-red-600">
                      <FaTimes className="mr-1" size={14} />
                      <span className="text-sm">API Key already exists or is invalid</span>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
            {/* Track field */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Track <span className="text-gray-400">— Choose tracking type</span>
              </label>
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <select
                    value={formData.trackType || 'user'}
                    onChange={e => setFormData({ ...formData, trackType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900"
                  >
                    <option value="user">User</option>
                    <option value="usage">Usage</option>
                    <option value="days">Days</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notify When</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.trackLimit || ''}
                    onChange={e => setFormData({ ...formData, trackLimit: e.target.value })}
                    placeholder="Number"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900"
                    required
                  />
                </div>
              </div>
            </div>
            {/* Key Type field (always shown) */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Key Type <span className="text-gray-400">— Choose the environment for this key</span>
              </label>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  className={`flex flex-col items-start w-full border rounded-lg px-4 py-3 text-left mb-1 ${formData.type === 'development' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'} transition`}
                  onClick={() => setFormData({ ...formData, type: 'development' })}
                >
                  <div className="flex items-center mb-1">
                    <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-2 ${formData.type === 'development' ? 'border-blue-600' : 'border-gray-300'}`}> 
                      {formData.type === 'development' && <span className="w-2 h-2 bg-blue-600 rounded-full"></span>}
                    </span>
                    <span className="font-semibold text-gray-900">Development</span>
                  </div>
                </button>
                <button
                  type="button"
                  className={`flex flex-col items-start w-full border rounded-lg px-4 py-3 text-left ${formData.type === 'production' ? 'border-purple-600 bg-purple-50' : 'border-gray-200 bg-white'} transition`}
                  onClick={() => setFormData({ ...formData, type: 'production' })}
                >
                  <div className="flex items-center mb-1">
                    <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-2 ${formData.type === 'production' ? 'border-purple-600' : 'border-gray-300'}`}> 
                      {formData.type === 'production' && <span className="w-2 h-2 bg-purple-600 rounded-full"></span>}
                    </span>
                    <span className="font-semibold text-gray-900">Production</span>
                  </div>
                </button>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button
                type="submit"
                disabled={!editingKey && (validationStatus !== 'valid' || !formData.key || formData.key.trim() === '')}
                className="px-8 py-2 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingKey ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-2 text-base font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 
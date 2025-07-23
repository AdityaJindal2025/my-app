'use client';

import { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import Notification from '../../components/ui/Notification';
import { FaPlay, FaKey, FaCopy, FaEye, FaEyeSlash } from 'react-icons/fa';
import { supabase } from '../utils/supabaseClient';

export default function ApiPlayground() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState({ visible: false, message: '', type: 'success' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      setError('Please enter an API key');
      return;
    }

    setIsLoading(true);
    setError('');
    setResponse(null);

    try {
      // Check if API key exists in Supabase database
      const { data, error: supabaseError } = await supabase
        .from('api_keys')
        .select('*')
        .eq('key', apiKey.trim())
        .single();

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        // If no record found, supabaseError will contain details
        if (supabaseError.code === 'PGRST116') {
          // No rows returned
          setResponse({
            status: 'error',
            data: {
              message: 'API key not found in database',
              timestamp: new Date().toISOString(),
              error: 'Invalid API key'
            }
          });
          showNotification('API key not found in database', 'error');
        } else {
          setError('Failed to validate API key. Please try again.');
          showNotification('Failed to validate API key', 'error');
        }
      } else if (data) {
        // API key found in database - check status
        if (data.status === 'inactive') {
          setResponse({
            status: 'error',
            data: {
              message: 'Key Has Been Deactivated',
              timestamp: new Date().toISOString(),
              key_type: data.type || 'unknown',
              key_name: data.name,
              key_status: data.status
            }
          });
          showNotification('API key has been deactivated', 'error');
        } else {
          // API key is active
          setResponse({
            status: 'success',
            data: {
              message: 'API key is valid!',
              timestamp: new Date().toISOString(),
              key_type: data.type || 'unknown',
              permissions: ['read', 'write'],
              key_name: data.name,
              key_status: data.status
            }
          });
          showNotification('API key validated successfully!', 'success');
        }
      }
    } catch (err) {
      console.error('Error validating API key:', err);
      setError('Failed to validate API key. Please try again.');
      showNotification('Failed to validate API key', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ visible: true, message, type });
    setTimeout(() => {
      setNotification({ visible: false, message: '', type: 'success' });
    }, 3000); // 3 seconds
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      showNotification('API key copied to clipboard!', 'success');
    }).catch(() => {
      showNotification('Failed to copy API key', 'error');
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Notification notification={notification} />
      <Sidebar sidebarOpen={sidebarOpen} />
      
      <div className="flex-1 flex flex-col">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <div className="px-8 py-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">API Playground</h1>
              <p className="text-gray-600">Test your API keys and explore the Research API functionality.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* API Key Input Section */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FaKey className="mr-2 text-blue-600" />
                  API Key Validation
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter your API Key
                    </label>
                    <div className="relative">
                      <input
                        type={showApiKey ? 'text' : 'password'}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="pk_..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showApiKey ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      disabled={isLoading || !apiKey.trim()}
                      className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Validating...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <FaPlay className="mr-2" />
                          Validate Key
                        </div>
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => copyToClipboard(apiKey)}
                      disabled={!apiKey.trim()}
                      className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Copy API Key"
                    >
                      <FaCopy size={16} />
                    </button>
                  </div>
                </form>

                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}
              </div>

              {/* Response Section */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Response</h2>
                
                {response ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${response.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-sm font-medium text-gray-700">
                        {response.status === 'success' ? 'Valid API Key' : 'Invalid API Key'}
                      </span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <span className={`text-lg font-semibold ${response.status === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                        {response.status === 'success'
                          ? 'Your API key is valid and active!'
                          : 'The API key you entered is invalid. Please check and try again.'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FaKey className="mx-auto mb-3 text-gray-400" size={32} />
                    <p>Enter an API key and click "Validate Key" to see the response</p>
                  </div>
                )}
              </div>
            </div>

            {/* Documentation Section */}
            <div className="mt-8 bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">How to use the API Playground</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">1. Get your API Key</h3>
                  <p className="text-sm text-gray-600">Copy your API key from the dashboard. It starts with "pk_".</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">2. Enter the key</h3>
                  <p className="text-sm text-gray-600">Paste your API key in the input field above.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">3. Validate</h3>
                  <p className="text-sm text-gray-600">Click "Validate Key" to test if your key is working.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
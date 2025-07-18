'use client';

export default function ApiKeyModal({ 
  isModalOpen, 
  editingKey, 
  formData, 
  setFormData, 
  onSubmit, 
  onClose 
}) {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative w-full max-w-md mx-auto p-0">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
            {editingKey ? 'Edit API Key' : 'Create a new API key'}
          </h2>
          <p className="text-center text-gray-500 mb-6">
            {editingKey ? 'Update the API key details.' : 'Enter a name and limit for the new API key.'}
          </p>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Key Name <span className="text-gray-400">— A unique name to identify this key</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Key Name"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900"
                required
              />
            </div>
            <div className="mb-4">
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
                  <span className="text-xs text-gray-500">Rate limited to 100 requests/minute</span>
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
                  <span className="text-xs text-gray-500">Rate limited to 1,000 requests/minute</span>
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <input
                  type="checkbox"
                  checked={formData.limitEnabled}
                  onChange={e => {
                    console.log('Checkbox changed:', e.target.checked);
                    setFormData({ ...formData, limitEnabled: e.target.checked });
                  }}
                  className="mr-2"
                />
                Limit monthly usage<span className="text-gray-400">*</span>
              </label>
              <input
                type="number"
                min="1"
                value={formData.limitEnabled ? formData.limit : ''}
                onChange={e => {
                  console.log('Limit input changed:', e.target.value);
                  setFormData({ ...formData, limit: e.target.value });
                }}
                disabled={!formData.limitEnabled}
                placeholder="1000"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 disabled:opacity-50"
              />
              <p className="text-xs text-gray-400 mt-1">* If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.</p>
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <button
                type="submit"
                className="px-8 py-2 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
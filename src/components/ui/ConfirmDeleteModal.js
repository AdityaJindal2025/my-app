'use client';

import { FaTrash } from 'react-icons/fa';

export default function ConfirmDeleteModal({ confirmDelete, onCancel, onConfirm }) {
  if (!confirmDelete.visible) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <FaTrash className="text-red-600 mr-2" /> Confirm Deletion
        </h2>
        <p className="mb-6 text-gray-700">Are you sure you want to delete this API key? This action cannot be undone.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 text-base font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 text-base font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
} 
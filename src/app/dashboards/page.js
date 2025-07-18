'use client';

import { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import Notification from '../../components/ui/Notification';
import ConfirmDeleteModal from '../../components/ui/ConfirmDeleteModal';
import PlanCard from '../../components/dashboard/PlanCard';
import ApiKeyModal from '../../components/dashboard/ApiKeyModal';
import ApiKeysTable from '../../components/dashboard/ApiKeysTable';
import { useApiKeys } from '../../hooks/useApiKeys';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const {
    apiKeys,
    isModalOpen,
    editingKey,
    formData,
    setFormData,
    visibleKeys,
    notification,
    confirmDelete,
    activeDeleteIcon,
    handleSubmit,
    handleEdit,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    toggleStatus,
    copyToClipboard,
    toggleKeyVisibility,
    openCreateModal,
    closeModal
  } = useApiKeys();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Notification notification={notification} />
      <ConfirmDeleteModal 
        confirmDelete={confirmDelete}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
      
      <Sidebar sidebarOpen={sidebarOpen} />
      
      <div className="flex-1 flex flex-col">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <div className="px-8 py-6 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <PlanCard apiKeys={apiKeys} />
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="flex justify-between items-center px-6 py-4 border-b">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">API Keys</h3>
                  <p className="text-gray-500 text-sm">The key is used to authenticate your requests to the Research API.</p>
                </div>
                <button
                  onClick={openCreateModal}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  + Create New API Key
                </button>
              </div>
              
              <ApiKeysTable
                apiKeys={apiKeys}
                visibleKeys={visibleKeys}
                activeDeleteIcon={activeDeleteIcon}
                onToggleKeyVisibility={toggleKeyVisibility}
                onCopyToClipboard={copyToClipboard}
                onToggleStatus={toggleStatus}
                onEdit={handleEdit}
                onDeleteClick={handleDeleteClick}
              />
            </div>
            
            <ApiKeyModal
              isModalOpen={isModalOpen}
              editingKey={editingKey}
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              onClose={closeModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
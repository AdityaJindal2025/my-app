'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../app/utils/supabaseClient';

export function useApiKeys() {
  const [apiKeys, setApiKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'development',
    limit: '',
    limitEnabled: false,
  });
  const [visibleKeys, setVisibleKeys] = useState({});
  const [notification, setNotification] = useState({ visible: false, message: '' });
  const [confirmDelete, setConfirmDelete] = useState({ visible: false, keyId: null });
  const [activeDeleteIcon, setActiveDeleteIcon] = useState(null);

  // Fetch API keys on component mount
  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        const { data, error } = await supabase.from('api_keys').select('*');
        if (data) {
          setApiKeys(data);
        } else {
          console.error('Error fetching API keys:', error);
          // Fallback to mock data if Supabase is not configured
          setApiKeys([
            {
              id: 1,
              name: 'Development Key',
              description: 'API key for development environment',
              key: 'pk_dev_123456789',
              type: 'development',
              permissions: ['read', 'write'],
              status: 'active',
              createdAt: '2024-01-15',
              lastUsed: '2024-01-20'
            }
          ]);
        }
      } catch (error) {
        console.error('Supabase connection error:', error);
        // Fallback to mock data
        setApiKeys([
          {
            id: 1,
            name: 'Development Key',
            description: 'API key for development environment',
            key: 'pk_dev_123456789',
            type: 'development',
            permissions: ['read', 'write'],
            status: 'active',
            createdAt: '2024-01-15',
            lastUsed: '2024-01-20'
          }
        ]);
      }
    };

    fetchApiKeys();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingKey) {
        // Update existing key in Supabase
        const limitValue = formData.limitEnabled && formData.limit ? Number(formData.limit) : null;
        
        // Validate limit is a positive integer
        if (formData.limitEnabled && formData.limit && (isNaN(limitValue) || limitValue <= 0)) {
          alert('Please enter a valid positive number for the limit');
          return;
        }
        
        const { data, error } = await supabase
          .from('api_keys')
          .update({
            name: formData.name,
            description: formData.description,
            type: formData.type,
            limit: limitValue,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingKey.id)
          .select();

        if (error) {
          console.error('Error updating API key:', error);
          alert('Failed to update API key');
          return;
        }

        // Update local state
        setApiKeys(keys => keys.map(key =>
          key.id === editingKey.id
            ? { ...key, ...formData }
            : key
        ));
      } else {
        // Create new key in Supabase
        const limitValue = formData.limitEnabled && formData.limit ? Number(formData.limit) : null;
        
        // Validate limit is a positive integer
        if (formData.limitEnabled && formData.limit && (isNaN(limitValue) || limitValue <= 0)) {
          alert('Please enter a valid positive number for the limit');
          return;
        }
        
        const newKeyData = {
          name: formData.name,
          description: formData.description,
          type: formData.type,
          key: `pk_${Math.random().toString(36).substr(2, 9)}`,
          limit: limitValue,
          status: 'active',
          created_at: new Date().toISOString(),
          last_used: null
        };

        const { data, error } = await supabase
          .from('api_keys')
          .insert([newKeyData])
          .select();

        if (error) {
          console.error('Error creating API key:', error);
          alert('Failed to create API key');
          return;
        }

        // Update local state with the returned data
        if (data && data.length > 0) {
          setApiKeys(keys => [...keys, data[0]]);
        }
      }
      
      setIsModalOpen(false);
      setEditingKey(null);
      setFormData({ name: '', description: '', type: 'development', limit: '', limitEnabled: false });
    } catch (error) {
      console.error('Error saving API key:', error);
      alert('Failed to save API key');
    }
  };

  const handleEdit = (key) => {
    setEditingKey(key);
    setFormData({
      name: key.name,
      description: key.description,
      type: key.type || 'development',
      limit: key.limit ? key.limit.toString() : '',
      limitEnabled: key.limit ? true : false,
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setActiveDeleteIcon(id);
    setConfirmDelete({ visible: true, keyId: id });
  };

  const handleDeleteConfirm = async () => {
    const id = confirmDelete.keyId;
    setConfirmDelete({ visible: false, keyId: null });
    setActiveDeleteIcon(null);
    try {
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', id);
      if (error) {
        showNotification('Failed to delete API key');
        return;
      }
      setApiKeys(keys => keys.filter(key => key.id !== id));
      showNotification('API key deleted successfully');
    } catch (error) {
      showNotification('Failed to delete API key');
    }
  };

  const handleDeleteCancel = () => {
    setConfirmDelete({ visible: false, keyId: null });
    setActiveDeleteIcon(null);
  };

  const toggleStatus = async (id) => {
    try {
      const currentKey = apiKeys.find(key => key.id === id);
      const newStatus = currentKey.status === 'active' ? 'inactive' : 'active';
      
      const { error } = await supabase
        .from('api_keys')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) {
        console.error('Error updating API key status:', error);
        alert('Failed to update API key status');
        return;
      }

      setApiKeys(keys => keys.map(key => 
        key.id === id 
          ? { ...key, status: newStatus }
          : key
      ));
    } catch (error) {
      console.error('Error updating API key status:', error);
      alert('Failed to update API key status');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => showNotification('Copied API Key to clipboard', 'success'))
      .catch(() => showNotification('Failed to copy API Key', 'error'));
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ visible: true, message, type });
    setTimeout(() => {
      setNotification({ visible: false, message: '', type: 'success' });
    }, 2000);
  };

  const toggleKeyVisibility = (id) => {
    setVisibleKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openCreateModal = () => {
    setIsModalOpen(true);
    setEditingKey(null);
    setFormData({ name: '', description: '', type: 'development', limit: '', limitEnabled: false });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingKey(null);
    setFormData({ name: '', description: '', type: 'development', limit: '', limitEnabled: false });
  };

  return {
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
  };
} 
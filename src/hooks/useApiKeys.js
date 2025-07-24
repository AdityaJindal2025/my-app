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
    subscriptionType: 'monthly',
    expiryDate: '',
    trackType: 'user',
    trackLimit: '',
  });
  const [visibleKeys, setVisibleKeys] = useState({});
  const [visibleUserNames, setVisibleUserNames] = useState({});
  const [notification, setNotification] = useState({ visible: false, message: '' });
  const [confirmDelete, setConfirmDelete] = useState({ visible: false, keyId: null });
  const [activeDeleteIcon, setActiveDeleteIcon] = useState(null);
  const [selectedApiKey, setSelectedApiKey] = useState(null);
  const [isDetailsCardVisible, setIsDetailsCardVisible] = useState(false);

  // Function to check and update expired API keys
  const checkAndUpdateExpiredKeys = async (keys) => {
    if (!keys || keys.length === 0) return;
    
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Reset time to start of day for comparison

    console.log('Checking for expired API keys...', { currentDate, totalKeys: keys.length });

    for (const key of keys) {
      if (key.expiryDate && key.status === 'active') {
        const expiryDate = new Date(key.expiryDate);
        expiryDate.setHours(0, 0, 0, 0);

        console.log(`Checking key ${key.name}:`, { 
          expiryDate: key.expiryDate, 
          parsedExpiryDate: expiryDate, 
          currentDate, 
          isExpired: expiryDate <= currentDate 
        });

        if (expiryDate <= currentDate) {
          try {
            console.log(`Deactivating expired API key: ${key.name}`);
            
            // Update status to inactive in Supabase
            const { error } = await supabase
              .from('api_keys')
              .update({ status: 'inactive' })
              .eq('id', key.id);

            if (error) {
              console.error('Error updating expired API key status:', error);
            } else {
              console.log(`Successfully deactivated API key: ${key.name}`);
            }
          } catch (error) {
            console.error('Error updating expired API key status:', error);
          }
        }
      }
    }

    // Refresh the API keys list to reflect the updated statuses
    try {
      const { data, error } = await supabase.from('api_keys').select('*');
      if (data && !error) {
        console.log('Refreshing API keys list after expiry check');
        setApiKeys(data);
      } else if (error) {
        console.error('Error refreshing API keys:', error);
      }
    } catch (error) {
      console.error('Error refreshing API keys:', error);
    }
  };

  // Fetch API keys on component mount
  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        const { data, error } = await supabase.from('api_keys').select('*');
        if (data) {
          console.log('Fetched API keys:', data.length);
          // Check for expired keys and update their status
          await checkAndUpdateExpiredKeys(data);
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

    // Set up periodic check for expired keys (every 5 minutes for testing, change to hourly in production)
    const interval = setInterval(async () => {
      console.log('Running periodic expiry check...');
      const { data } = await supabase.from('api_keys').select('*');
      if (data) {
        await checkAndUpdateExpiredKeys(data);
      }
    }, 5 * 60 * 1000); // Check every 5 minutes for testing

    return () => clearInterval(interval);
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
            userNameKey: formData.userName,
            description: formData.description,
            type: formData.type,
            limit: limitValue,
            trackType: formData.trackType,
            trackLimit: formData.trackLimit ? Number(formData.trackLimit) : null,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingKey.id)
          .select();

        if (error) {
          console.error('Error updating API key:', error);
          alert('Failed to update API key');
          return;
        }

        // Update local state with the actual updated record from Supabase
        if (data && data.length > 0) {
          setApiKeys(keys => keys.map(key =>
            key.id === editingKey.id
              ? data[0]
              : key
          ));
        }
      } else {
        // Create new key in Supabase
        const limitValue = formData.limitEnabled && formData.limit ? Number(formData.limit) : null;
        
        // Validate limit is a positive integer
        if (formData.limitEnabled && formData.limit && (isNaN(limitValue) || limitValue <= 0)) {
          alert('Please enter a valid positive number for the limit');
          return;
        }
        
        const newKeyData = {
          name: formData.name, // Tool Name
          userNameKey: formData.userName, // API User Name
          description: formData.description,
          type: formData.type,
          key: formData.key || `pk_${Math.random().toString(36).substr(2, 9)}`,
          limit: limitValue,
          trackType: formData.trackType,
          trackLimit: formData.trackLimit ? Number(formData.trackLimit) : null,
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
      setFormData({ name: '', description: '', type: 'development', limit: '', limitEnabled: false, trackType: 'user', trackLimit: '' });
    } catch (error) {
      console.error('Error saving API key:', error);
      alert('Failed to save API key');
    }
  };

  const handleEdit = (key) => {
    setEditingKey(key);
    setFormData({
      name: key.name,
      userName: key.userNameKey || '',
      key: key.key || '',
      description: key.description,
      type: key.type || 'development',
      limit: key.limit ? key.limit.toString() : '',
      limitEnabled: key.limit ? true : false,
      trackType: key.trackType || 'user',
      trackLimit: key.trackLimit ? key.trackLimit.toString() : '',
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

  const copyToClipboard = (text, fieldType) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        if (fieldType === 'userNameKey') {
          showNotification('Copied API User Name to clipboard', 'success');
        } else {
          showNotification('Copied API Key to clipboard', 'success');
        }
      })
      .catch(() => showNotification('Failed to copy', 'error'));
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

  const toggleUserNameVisibility = (id) => {
    setVisibleUserNames((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShowDetails = (apiKey) => {
    setSelectedApiKey(apiKey);
    setIsDetailsCardVisible(true);
  };

  const closeDetailsCard = () => {
    setIsDetailsCardVisible(false);
    setSelectedApiKey(null);
  };

  const openCreateModal = () => {
    setIsModalOpen(true);
    setEditingKey(null);
    setFormData({ name: '', description: '', type: 'development', limit: '', limitEnabled: false, trackType: 'user', trackLimit: '' });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingKey(null);
    setFormData({ name: '', description: '', type: 'development', limit: '', limitEnabled: false, trackType: 'user', trackLimit: '' });
  };

  return {
    apiKeys,
    isModalOpen,
    editingKey,
    formData,
    setFormData,
    visibleKeys,
    visibleUserNames,
    notification,
    confirmDelete,
    activeDeleteIcon,
    selectedApiKey,
    isDetailsCardVisible,
    handleSubmit,
    handleEdit,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    toggleStatus,
    copyToClipboard,
    toggleKeyVisibility,
    toggleUserNameVisibility,
    handleShowDetails,
    closeDetailsCard,
    openCreateModal,
    closeModal
  };
} 
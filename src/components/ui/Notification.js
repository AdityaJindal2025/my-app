'use client';

export default function Notification({ notification }) {
  if (!notification.visible) return null;

  const isSuccess = notification.type === 'success';
  const bgColor = isSuccess ? 'bg-green-600' : 'bg-red-600';
  const iconColor = isSuccess ? '#34d399' : '#ef4444';

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 ${bgColor} text-white px-6 py-3 rounded-lg flex items-center shadow-lg`}>
      <svg className="w-6 h-6 mr-2 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        {isSuccess ? (
          <>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill={iconColor}/>
            <path stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4-4"/>
          </>
        ) : (
          <>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill={iconColor}/>
            <path stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6m0-6l6 6"/>
          </>
        )}
      </svg>
      <span className="font-semibold">{notification.message}</span>
    </div>
  );
} 
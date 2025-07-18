'use client';

export default function PlanCard({ apiKeys = [] }) {
  // Calculate usage based on number of API keys
  const totalKeys = apiKeys.length;
  const maxKeys = 1000; // Maximum allowed keys
  const usagePercentage = Math.min((totalKeys / maxKeys) * 100, 100);
  
  // Determine plan type based on usage
  const getPlanType = () => {
    if (totalKeys === 0) return 'Free';
    if (totalKeys <= 5) return 'Starter';
    if (totalKeys <= 20) return 'Professional';
    return 'Enterprise';
  };

  return (
    <div className="rounded-xl p-6 mb-8 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 relative overflow-hidden shadow">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-white bg-white/30 px-2 py-1 rounded">CURRENT PLAN</span>
        <button className="bg-white/30 text-white px-3 py-1 rounded hover:bg-white/50 font-medium">Manage Plan</button>
      </div>
      <div className="text-3xl font-bold text-white mb-2">{getPlanType()}</div>
      <div className="flex items-center justify-between">
        <div className="text-white/80">API Keys Created</div>
        <div className="text-white/80 text-sm">{totalKeys} / {maxKeys} Keys</div>
      </div>
      <div className="w-full h-2 bg-white/30 rounded mt-2 mb-2">
        <div 
          className="h-2 bg-white/80 rounded transition-all duration-300" 
          style={{ width: `${usagePercentage}%` }}
        ></div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-white/80">Plan</span>
          <label className="inline-flex items-center cursor-pointer ml-2">
            <input type="checkbox" className="sr-only" />
            <span className="w-8 h-4 bg-white/30 rounded-full flex items-center p-1">
              <span className="w-3 h-3 bg-white rounded-full shadow"></span>
            </span>
            <span className="ml-2 text-xs text-white/80">Pay as you go</span>
          </label>
        </div>
        <div className="text-xs text-white/80">
          {totalKeys > 0 ? `${Math.round(usagePercentage)}% used` : 'No keys created yet'}
        </div>
      </div>
    </div>
  );
} 
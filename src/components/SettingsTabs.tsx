'use client';
import {Info, LockKeyhole, MessageSquareDot } from 'lucide-react';

export type Tab = 'profile' | 'security' | 'notifications';

interface SettingsTabsProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  layout?: 'horizontal' | 'vertical';
}

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  {
    id: 'profile',
    label: 'Profile Info',
    icon: <Info size={16} className='rotate-180' />,
  },
  {
    id: 'security',
    label: 'Security',
    icon: <LockKeyhole size={16} />,
  },
  {
    id: 'notifications',
    label: 'Notification',
    icon: <MessageSquareDot size={16} />,
  },
];

export default function SettingsTabs({
  activeTab,
  onTabChange,
  layout = 'horizontal',
}: SettingsTabsProps) {
  if (layout === 'vertical') {
    return (
      <div className="flex flex-col gap-1">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[13px] font-medium w-full text-left transition-all duration-150 ${
                isActive
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }`}
            >
              <span
                className={
                  isActive ? 'text-gray-900' : 'text-gray-400'
                }
              >
                {tab.icon}
              </span>
              {tab.label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex gap-0 border rounded-md border-[#E5E5E5] p-3 mb-6">
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-medium -mb-px transition-all duration-150 whitespace-nowrap ${
              isActive
                ? 'bg-[#F7F7F7] rounded-md text-[#1F1844]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
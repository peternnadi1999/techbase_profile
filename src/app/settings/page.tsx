'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import SettingsTabs, { Tab } from '@/components/SettingsTabs';
import ProfileForm from '@/components/ProfileForm';
import SecurityTab from '@/components/SecurityTab';
import NotificationsTab from '@/components/NotificationsTab';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  const tabContent = {
    profile: (
      <div>
        <h2 className="text-[20px] font-semibold font-sans text-[#202020] mb-5">Profile Info</h2>
        <ProfileForm />
      </div>
    ),
    security: <SecurityTab />,
    notifications: <NotificationsTab />,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8">

        <h1 className="text-[20px] font-bold text-gray-900 mb-5 tracking-tight">Settings</h1>

        <div className="block md:hidden bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} layout="vertical" />
          </div>

          <div className="p-5">
            {tabContent[activeTab]}
          </div>
        </div>

        <div className="hidden md:block bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-7">
          <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} layout="horizontal" />
          {tabContent[activeTab]}
        </div>
      </main>
    </div>
  );
}

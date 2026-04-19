import { MessageSquareDot } from 'lucide-react';
import React from 'react';

export default function NotificationsTab() {
  return (
    <div className="flex flex-col items-center gap-3 py-12">
      <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center">
        <MessageSquareDot size={26} color='#9ca3af'/>
       
      </div>
      <p className="text-[14px] font-semibold text-gray-500">Notification settings coming soon</p>
      <p className="text-[12px] text-gray-400">Email, push, and in-app preferences</p>
    </div>
  );
}

import { LockKeyhole } from 'lucide-react';

export default function SecurityTab() {
  return (
    <div className="flex flex-col items-center gap-3 py-12">
      <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center">
         <LockKeyhole size={26} color='#9ca3af'/>
      </div>
      <p className="text-[14px] font-semibold text-gray-500">Security settings coming soon</p>
      <p className="text-[12px] text-gray-400">Password, 2FA, and session management</p>
    </div>
  );
}

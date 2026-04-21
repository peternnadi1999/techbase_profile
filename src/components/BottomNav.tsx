'use client';

import { Home, FileText, Smartphone, Headphones } from 'lucide-react';

export default function BottomNav() {
  return (
    <div className="fixed left-3 rounded-2xl bottom-0 right-3 z-50 bg-white md:hidden">
      <div className="flex justify-around items-center h-[65px] px-4">
        
        <NavItem icon={<Home size={20} />} label="Home" />
        <NavItem icon={<FileText size={20} />} label="Requests" />
        <NavItem icon={<Smartphone size={20} />} label="Devices" />
        <NavItem icon={<Headphones size={20} />} label="Support" />

      </div>
    </div>
  );
}

function NavItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex flex-col items-center justify-center text-[#202020] hover:text-gray-900 transition">
      {icon}
      <span className="text-[12px] font-normal text-[#202020] mt-1">{label}</span>
    </button>
  );
}
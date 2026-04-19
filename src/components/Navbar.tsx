'use client';

import { Bell, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useUserService } from '../lib/service/userService';

export default function Navbar() {
  const { useGetProfile } = useUserService();
  const { data, isLoading } = useGetProfile();

  const user = data?.data;

  const userName = user?.name || 'User';
  const userAvatar = user?.profileImage || '';

  const initials = userName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <nav className="h-[60px] bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-50 shadow-sm">

      {/* Logo */}
      <div className="flex items-center gap-1.5">
        <Image src="/logo.png" alt="Techbase Logo" width={100} height={100} />
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-7">
        {['Home', 'Reports', 'Devices', 'Support'].map(link => (
          <a
            key={link}
            href="#"
            className="text-[13px] font-medium text-gray-500 hover:text-gray-900 transition-colors duration-150 no-underline"
          >
            {link}
          </a>
        ))}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">

        {/* Notification */}
        <button className="p-1.5 border rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors duration-150">
          <Bell size={18} />
        </button>

        {/* User */}
        <div className="flex items-center gap-2 cursor-pointer">

          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#fef3f0] border-2 border-gray-200 flex items-center justify-center flex-shrink-0">
            {userAvatar ? (
              <Image
                src={userAvatar}
                alt={userName}
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <span className="text-[11px] font-bold text-[#E84B2A]">
                {initials}
              </span>
            )}
          </div>

          {/* Name */}
          <span className="hidden sm:block text-[13px] font-medium text-gray-800">
            {isLoading ? 'Loading...' : userName}
          </span>

          <ChevronDown
            size={14}
            className="hidden sm:block text-gray-400"
          />
        </div>
      </div>
    </nav>
  );
}
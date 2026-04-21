import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'sonner';
import { ReactQueryProvider } from '@/providers/query-provider';
import BottomNav from '@/components/BottomNav';

export const metadata: Metadata = {
  title: 'Techbase',
  description: 'Manage your Techbase profile and settings',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-gray-100 text-gray-900">
        <ReactQueryProvider>
          {children}
          <BottomNav />
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}

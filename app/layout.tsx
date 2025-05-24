import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { BookmarkProvider } from '@/context/bookmark-context';
import { AuthProvider } from '@/context/auth-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HR Performance Dashboard',
  description: 'A modern dashboard for HR managers to track employee performance',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <BookmarkProvider>
              {children}
              <Toaster />
            </BookmarkProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
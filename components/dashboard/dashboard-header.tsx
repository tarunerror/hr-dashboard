'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ModeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Users, Bookmark, BarChart3, Home } from 'lucide-react';
import { useAuth } from '@/context/auth-context';

export function DashboardHeader() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6" />
          <span className="font-bold text-lg">HR Dashboard</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className={`text-sm font-medium transition-colors hover:text-primary ${pathname === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </div>
          </Link>
          <Link href="/bookmarks" className={`text-sm font-medium transition-colors hover:text-primary ${pathname === '/bookmarks' ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className="flex items-center gap-1">
              <Bookmark className="h-4 w-4" />
              <span>Bookmarks</span>
            </div>
          </Link>
          <Link href="/analytics" className={`text-sm font-medium transition-colors hover:text-primary ${pathname === '/analytics' ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </div>
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={logout}>Logout</Button>
          <ModeToggle />
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <span className="sr-only">Toggle menu</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
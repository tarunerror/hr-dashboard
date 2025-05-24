'use client';

import { useEffect, useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { BookmarkedEmployees } from '@/components/bookmark/bookmarked-employees';
import { useBookmark } from '@/context/bookmark-context';
import { fetchEmployees } from '@/lib/data';
import { Employee } from '@/types/employee';

export default function BookmarksPage() {
  const { bookmarks } = useBookmark();
  const [bookmarkedEmployees, setBookmarkedEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBookmarkedEmployees = async () => {
      setIsLoading(true);
      try {
        const allEmployees = await fetchEmployees();
        const filtered = allEmployees.filter(emp => bookmarks.includes(emp.id));
        setBookmarkedEmployees(filtered);
      } catch (error) {
        console.error('Failed to load bookmarked employees:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBookmarkedEmployees();
  }, [bookmarks]);

  return (
    <div className="min-h-screen">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Bookmarked Employees</h1>
        <BookmarkedEmployees 
          employees={bookmarkedEmployees} 
          isLoading={isLoading} 
        />
      </main>
    </div>
  );
}
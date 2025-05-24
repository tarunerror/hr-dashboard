'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface BookmarkContextType {
  bookmarks: number[];
  toggleBookmark: (id: number) => void;
  isBookmarked: (id: number) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const { toast } = useToast();

  // Load bookmarks from localStorage on component mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('hr-dashboard-bookmarks');
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (error) {
        console.error('Failed to parse bookmarks from localStorage:', error);
      }
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('hr-dashboard-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (id: number) => {
    setBookmarks(prev => {
      const isCurrentlyBookmarked = prev.includes(id);
      
      if (isCurrentlyBookmarked) {
        toast({
          title: "Bookmark removed",
          description: "Employee has been removed from your bookmarks.",
        });
        return prev.filter(bookmarkId => bookmarkId !== id);
      } else {
        toast({
          title: "Bookmark added",
          description: "Employee has been added to your bookmarks.",
        });
        return [...prev, id];
      }
    });
  };

  const isBookmarked = (id: number) => {
    return bookmarks.includes(id);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmark() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmark must be used within a BookmarkProvider');
  }
  return context;
}
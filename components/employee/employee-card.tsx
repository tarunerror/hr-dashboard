'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Bookmark, BookmarkCheck, UserPlus, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useBookmark } from '@/context/bookmark-context';
import { Employee } from '@/types/employee';
import { useToast } from '@/hooks/use-toast';

interface EmployeeCardProps {
  employee: Employee;
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  const { isBookmarked, toggleBookmark } = useBookmark();
  const { toast } = useToast();
  const isMarked = isBookmarked(employee.id);

  const handlePromote = () => {
    toast({
      title: "Employee promoted",
      description: `${employee.firstName} ${employee.lastName} has been promoted.`,
    });
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="relative p-6 pb-0 flex flex-col items-center">
        <div className="relative h-24 w-24 rounded-full overflow-hidden mb-4">
          <Image 
            src={employee.image} 
            alt={`${employee.firstName} ${employee.lastName}`}
            fill
            className="object-cover"
          />
        </div>
        <h3 className="font-semibold text-lg">{employee.firstName} {employee.lastName}</h3>
        <p className="text-sm text-muted-foreground">{employee.company?.title}</p>
        <Badge variant="outline" className="mt-2">
          {employee.company?.department}
        </Badge>
        
        <div className="flex items-center mt-3 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < (employee.performanceRating || 0)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-medium">Email:</span> {employee.email}
          </p>
          <p className="text-sm">
            <span className="font-medium">Age:</span> {employee.age}
          </p>
          <p className="text-sm">
            <span className="font-medium">Phone:</span> {employee.phone}
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0 flex justify-between gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/employee/${employee.id}`}>
            <ExternalLink className="h-4 w-4 mr-1" />
            View
          </Link>
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => toggleBookmark(employee.id)}
        >
          {isMarked ? (
            <>
              <BookmarkCheck className="h-4 w-4 mr-1 text-green-500" />
              Saved
            </>
          ) : (
            <>
              <Bookmark className="h-4 w-4 mr-1" />
              Save
            </>
          )}
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handlePromote}
        >
          <UserPlus className="h-4 w-4 mr-1" />
          Promote
        </Button>
      </CardFooter>
    </Card>
  );
}
'use client';

import Image from 'next/image';
import { Star, Mail, Phone, MapPin, Building, Bookmark, BookmarkCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Employee } from '@/types/employee';
import { useBookmark } from '@/context/bookmark-context';

interface EmployeeHeaderProps {
  employee: Employee;
}

export function EmployeeHeader({ employee }: EmployeeHeaderProps) {
  const { isBookmarked, toggleBookmark } = useBookmark();
  const isMarked = isBookmarked(employee.id);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="md:flex">
          <div className="relative w-full md:w-64 h-48 md:h-auto">
            <Image 
              src={employee.image} 
              alt={`${employee.firstName} ${employee.lastName}`}
              className="object-cover"
              fill
            />
          </div>
          
          <div className="p-6 flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">
                  {employee.firstName} {employee.lastName}
                </h2>
                <p className="text-muted-foreground">{employee.company?.title}</p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Button 
                  variant={isMarked ? "default" : "outline"}
                  onClick={() => toggleBookmark(employee.id)}
                  className={isMarked ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {isMarked ? (
                    <>
                      <BookmarkCheck className="h-4 w-4 mr-2" />
                      Bookmarked
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-4 w-4 mr-2" />
                      Bookmark
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <Badge className="mr-2">
                {employee.company?.department}
              </Badge>
              <div className="flex items-center">
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
                <span className="ml-2 text-sm font-medium">
                  {employee.performanceRating}/5
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{employee.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{employee.phone}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{employee.address.city}, {employee.address.state}</span>
              </div>
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{employee.company?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
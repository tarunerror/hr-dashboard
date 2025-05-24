import { ExternalLink, AlertCircle } from 'lucide-react';
import { EmployeeCard } from '@/components/employee/employee-card';
import { Employee } from '@/types/employee';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface BookmarkedEmployeesProps {
  employees: Employee[];
  isLoading: boolean;
}

export function BookmarkedEmployees({ employees, isLoading }: BookmarkedEmployeesProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-[400px] bg-muted animate-pulse rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 mt-8 border rounded-lg border-dashed text-center">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No bookmarked employees</h3>
        <p className="text-muted-foreground mb-4">
          You haven't bookmarked any employees yet. Browse the employee directory and bookmark the ones you want to track.
        </p>
        <Button asChild>
          <Link href="/">
            <ExternalLink className="h-4 w-4 mr-2" />
            Go to Employee Directory
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
      {employees.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  );
}
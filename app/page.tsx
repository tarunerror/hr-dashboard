import { Suspense } from 'react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { EmployeeGrid } from '@/components/employee/employee-grid';
import { EmployeeGridSkeleton } from '@/components/employee/employee-grid-skeleton';
import { SearchFilters } from '@/components/search/search-filters';
import { CreateUserDialog } from '@/components/user/create-user-dialog';
import { AuthCheck } from '@/components/auth/auth-check';
import { fetchEmployees } from '@/lib/data';

export default async function Home() {
  let employees = [];
  try {
    employees = await fetchEmployees();
  } catch (error) {
    console.error('Failed to fetch employees:', error);
  }

  return (
    <AuthCheck>
      <div className="min-h-screen">
        <DashboardHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Employee Directory</h1>
            <CreateUserDialog />
          </div>
          <SearchFilters />
          <Suspense fallback={<EmployeeGridSkeleton />}>
            <EmployeeGrid employees={employees} />
          </Suspense>
        </main>
      </div>
    </AuthCheck>
  );
}
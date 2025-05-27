import { Suspense } from 'react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { EmployeeProfile } from '@/components/employee/employee-profile';
import { EmployeeProfileSkeleton } from '@/components/employee/employee-profile-skeleton';
import { fetchEmployeeById } from '@/lib/data';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function EmployeeDetailPage({ params }: { params: { id: string } }) {
  try {
    const employee = await fetchEmployeeById(params.id);
    
    if (!employee) {
      notFound();
    }

    return (
      <div className="min-h-screen">
        <DashboardHeader />
        <main className="container mx-auto px-4 py-8">
          <Suspense fallback={<EmployeeProfileSkeleton />}>
            <EmployeeProfile employee={employee} />
          </Suspense>
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error loading employee:', error);
    notFound();
  }
}
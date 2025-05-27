import { Suspense } from 'react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { EmployeeProfile } from '@/components/employee/employee-profile';
import { EmployeeProfileSkeleton } from '@/components/employee/employee-profile-skeleton';
import { fetchEmployeeById } from '@/lib/data';

export default async function EmployeeDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<EmployeeProfileSkeleton />}>
          <EmployeeProfile id={params.id} />
        </Suspense>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  try {
    // Pre-generate only the first 3 employee pages to reduce build load
    return Array.from({ length: 3 }, (_, i) => ({
      id: String(i + 1),
    }));
  } catch (error) {
    // If there's any error during static params generation,
    // return an empty array to prevent build failure
    console.error('Error generating static params:', error);
    return [];
  }
}
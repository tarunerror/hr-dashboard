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
  // Pre-generate the first 10 employee pages
  return Array.from({ length: 10 }, (_, i) => ({
    id: String(i + 1),
  }));
}
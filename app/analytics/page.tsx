import { Suspense } from 'react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { AnalyticsDashboard } from '@/components/analytics/analytics-dashboard';
import { AnalyticsSkeleton } from '@/components/analytics/analytics-skeleton';

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Performance Analytics</h1>
        <Suspense fallback={<AnalyticsSkeleton />}>
          <AnalyticsDashboard />
        </Suspense>
      </main>
    </div>
  );
}
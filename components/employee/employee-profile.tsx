import { Suspense } from 'react';
import { fetchEmployeeById } from '@/lib/data';
import { EmployeeHeader } from './employee-header';
import { EmployeeTabs } from './employee-tabs';
import { notFound } from 'next/navigation';

export async function EmployeeProfile({ id }: { id: string }) {
  const employee = await fetchEmployeeById(id);
  
  if (!employee) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <EmployeeHeader employee={employee} />
      <EmployeeTabs employee={employee} />
    </div>
  );
}
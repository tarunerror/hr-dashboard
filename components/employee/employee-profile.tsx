import { EmployeeHeader } from './employee-header';
import { EmployeeTabs } from './employee-tabs';
import { Employee } from '@/types/employee';

interface EmployeeProfileProps {
  employee: Employee;
}

export function EmployeeProfile({ employee }: EmployeeProfileProps) {
  return (
    <div className="space-y-6">
      <EmployeeHeader employee={employee} />
      <EmployeeTabs employee={employee} />
    </div>
  );
}
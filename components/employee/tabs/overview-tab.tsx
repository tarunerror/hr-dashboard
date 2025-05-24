import { Star, Calendar } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Employee } from '@/types/employee';
import { formatDate } from '@/lib/utils';

interface OverviewTabProps {
  employee: Employee;
}

export function OverviewTab({ employee }: OverviewTabProps) {
  const performanceHistory = employee.performanceHistory || [];
  
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Personal Information</CardTitle>
            <CardDescription>Employee details and contact information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="grid grid-cols-3">
                <span className="text-sm font-medium">Full Name</span>
                <span className="text-sm col-span-2">{employee.firstName} {employee.lastName}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-sm font-medium">Email</span>
                <span className="text-sm col-span-2">{employee.email}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-sm font-medium">Phone</span>
                <span className="text-sm col-span-2">{employee.phone}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-sm font-medium">Address</span>
                <span className="text-sm col-span-2">
                  {employee.address.address}, {employee.address.city}, {employee.address.state} {employee.address.postalCode}
                </span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-sm font-medium">Age</span>
                <span className="text-sm col-span-2">{employee.age} years</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Employment Information</CardTitle>
            <CardDescription>Position and department details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="grid grid-cols-3">
                <span className="text-sm font-medium">Job Title</span>
                <span className="text-sm col-span-2">{employee.company?.title}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-sm font-medium">Department</span>
                <span className="text-sm col-span-2">{employee.company?.department}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-sm font-medium">Company</span>
                <span className="text-sm col-span-2">{employee.company?.name}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-sm font-medium">Current Rating</span>
                <div className="col-span-2 flex items-center">
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
                  <span className="ml-2 text-sm">
                    ({employee.performanceRating}/5)
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-sm font-medium">Active Projects</span>
                <span className="text-sm col-span-2">
                  {(employee.projects || []).filter(p => p.status === 'in-progress').length} active
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Performance History</CardTitle>
          <CardDescription>Annual performance review results</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Reviewed By</TableHead>
                <TableHead>Comments</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {performanceHistory.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      {formatDate(review.date)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{review.reviewedBy}</TableCell>
                  <TableCell className="max-w-xs truncate" title={review.comments}>
                    {review.comments}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
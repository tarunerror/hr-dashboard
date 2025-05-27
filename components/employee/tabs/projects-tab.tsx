import { Calendar, Clock, BarChart } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Project } from '@/types/employee';
import { formatDate } from '@/lib/utils';

interface ProjectsTabProps {
  projects: Project[];
}

export function ProjectsTab({ projects }: ProjectsTabProps) {
  // Sort projects by status (in-progress first, then planned, then completed)
  const sortedProjects = [...projects].sort((a, b) => {
    const statusOrder = { 'in-progress': 0, 'planned': 1, 'completed': 2 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {sortedProjects.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No projects found for this employee.</p>
            </CardContent>
          </Card>
        ) : (
          sortedProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>{project.name}</CardTitle>
                  <Badge
                    className={`
                      ${project.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : ''}
                      ${project.status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' : ''}
                      ${project.status === 'planned' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100' : ''}
                    `}
                  >
                    {project.status === 'in-progress' ? 'In Progress' : 
                     project.status === 'planned' ? 'Planned' : 'Completed'}
                  </Badge>
                </div>
                <CardDescription>Role: {project.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Start: {formatDate(project.startDate)}</span>
                    </div>
                    {project.endDate && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>End: {formatDate(project.endDate)}</span>
                      </div>
                    )}
                    {!project.endDate && project.status === 'in-progress' && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Ongoing</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Contribution</span>
                      <span>{project.contribution}%</span>
                    </div>
                    <Progress value={project.contribution} className="h-2" />
                  </div>
                  
                  {project.status === 'in-progress' && (
                    <div className="pt-2 text-sm text-muted-foreground">
                      <p className="flex items-center">
                        <BarChart className="h-4 w-4 mr-2" />
                        <span>Active project with ongoing contributions</span>
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
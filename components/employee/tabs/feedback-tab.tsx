import { MessageSquare, ThumbsUp, AlertTriangle, Info } from 'lucide-react';
import { format } from 'date-fns';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Feedback } from '@/types/employee';
import { formatDate } from '@/lib/utils';

interface FeedbackTabProps {
  feedback: Feedback[];
}

export function FeedbackTab({ feedback }: FeedbackTabProps) {
  // Sort feedback by date (newest first)
  const sortedFeedback = [...feedback].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getFeedbackIcon = (type: 'praise' | 'improvement' | 'general') => {
    switch (type) {
      case 'praise':
        return <ThumbsUp className="h-5 w-5 text-green-500" />;
      case 'improvement':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'general':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <MessageSquare className="h-5 w-5 text-gray-500" />;
    }
  };

  const getFeedbackColor = (type: 'praise' | 'improvement' | 'general') => {
    switch (type) {
      case 'praise':
        return 'border-l-4 border-green-500 dark:bg-green-950/20';
      case 'improvement':
        return 'border-l-4 border-amber-500 dark:bg-amber-950/20';
      case 'general':
        return 'border-l-4 border-blue-500 dark:bg-blue-950/20';
      default:
        return '';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {sortedFeedback.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No feedback available for this employee.</p>
            </CardContent>
          </Card>
        ) : (
          sortedFeedback.map((item) => (
            <Card key={item.id} className={`overflow-hidden ${getFeedbackColor(item.type)}`}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    {getFeedbackIcon(item.type)}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback>
                            {item.from.split(' ').map(name => name[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{item.from}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(item.date)}</p>
                        </div>
                      </div>
                      <div>
                        <span className="text-xs font-medium uppercase px-2 py-1 rounded-full bg-secondary">
                          {item.type}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm mt-2">{item.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
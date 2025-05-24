import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function EmployeeGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
      {Array.from({ length: 8 }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <div className="p-6 pb-0 flex flex-col items-center">
            <Skeleton className="h-24 w-24 rounded-full mb-4" />
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-6 w-28 mb-3" />
            
            <div className="flex items-center gap-1 my-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-4" />
              ))}
            </div>
          </div>
          
          <CardContent className="p-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </CardContent>
          
          <CardFooter className="p-6 pt-0 flex justify-between gap-2">
            <Skeleton className="h-9 w-[72px]" />
            <Skeleton className="h-9 w-[72px]" />
            <Skeleton className="h-9 w-[72px]" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
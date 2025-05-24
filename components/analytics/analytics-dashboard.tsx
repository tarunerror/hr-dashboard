'use client';

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus, Users, Star, BookmarkIcon } from 'lucide-react';
import { fetchDepartmentAnalytics, getBookmarkTrends } from '@/lib/data';

export async function AnalyticsDashboard() {
  const departmentData = await fetchDepartmentAnalytics();
  const bookmarkTrends = getBookmarkTrends();
  
  const sortedDepartments = [...departmentData].sort((a, b) => b.employeeCount - a.employeeCount);
  const totalEmployees = sortedDepartments.reduce((sum, dept) => sum + dept.employeeCount, 0);
  const totalRatings = sortedDepartments.reduce((sum, dept) => sum + (dept.averageRating * dept.employeeCount), 0);
  const overallAverageRating = totalRatings / totalEmployees;
  const highestRatedDept = [...sortedDepartments].sort((a, b) => b.averageRating - a.averageRating)[0];
  const lowestRatedDept = [...sortedDepartments].sort((a, b) => a.averageRating - b.averageRating)[0];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-2 shadow-md rounded-md">
          <p className="font-medium">{label}</p>
          <p className="text-sm">
            Employees: <span className="font-medium">{payload[0].payload.employeeCount}</span>
          </p>
          <p className="text-sm">
            Avg. Rating: <span className="font-medium">{payload[1].payload.averageRating}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-muted-foreground mr-2" />
              <span className="text-2xl font-bold">{totalEmployees}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-2xl font-bold">{overallAverageRating.toFixed(1)}</span>
              <span className="text-muted-foreground ml-1">/5</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Highest Rated Dept</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div className="flex items-center">
                <span className="text-lg font-semibold">{highestRatedDept.name}</span>
              </div>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-medium">{highestRatedDept.averageRating.toFixed(1)}</span>
                <TrendingUp className={`h-4 w-4 ml-2 ${highestRatedDept.performanceTrend > 0 ? 'text-green-500' : 'text-red-500'}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Bookmark Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BookmarkIcon className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-2xl font-bold">{bookmarkTrends.reduce((sum, item) => sum + item.count, 0)}</span>
              <span className="text-muted-foreground ml-1">last 6 months</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Department Performance</CardTitle>
          <CardDescription>Employee count and average performance ratings by department</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bar" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                <TabsTrigger value="table">Table View</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="bar" className="w-full">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={sortedDepartments}
                    margin={{ top: 10, right: 30, left: 0, bottom: 70 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45}
                      textAnchor="end"
                      height={70}
                    />
                    <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--chart-1))" />
                    <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="employeeCount" name="Employee Count" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="right" dataKey="averageRating" name="Average Rating" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="table">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-medium">Department</th>
                      <th className="px-4 py-3 font-medium">Employees</th>
                      <th className="px-4 py-3 font-medium">Avg. Rating</th>
                      <th className="px-4 py-3 font-medium">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedDepartments.map((dept) => (
                      <tr key={dept.name} className="border-b">
                        <td className="px-4 py-3 font-medium">{dept.name}</td>
                        <td className="px-4 py-3">{dept.employeeCount}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <span>{dept.averageRating.toFixed(1)}</span>
                            <div className="ml-2 flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < Math.round(dept.averageRating)
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            {dept.performanceTrend > 0 ? (
                              <>
                                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                                <span className="text-green-500">+{dept.performanceTrend.toFixed(2)}</span>
                              </>
                            ) : dept.performanceTrend < 0 ? (
                              <>
                                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                                <span className="text-red-500">{dept.performanceTrend.toFixed(2)}</span>
                              </>
                            ) : (
                              <>
                                <Minus className="h-4 w-4 text-gray-500 mr-1" />
                                <span className="text-gray-500">0.00</span>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Bookmark Trends</CardTitle>
          <CardDescription>Employee bookmarks over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={bookmarkTrends}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  name="Bookmarks"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
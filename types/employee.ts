export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  image: string;
  address: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
  company?: {
    name: string;
    department: string;
    title: string;
  };
  performanceRating?: number;
  performanceHistory?: PerformanceHistory[];
  projects?: Project[];
  feedback?: Feedback[];
}

export interface PerformanceHistory {
  id: number;
  date: string;
  rating: number;
  reviewedBy: string;
  comments: string;
}

export interface Project {
  id: number;
  name: string;
  role: string;
  startDate: string;
  endDate?: string;
  status: 'completed' | 'in-progress' | 'planned';
  contribution: number;
}

export interface Feedback {
  id: number;
  date: string;
  from: string;
  type: 'praise' | 'improvement' | 'general';
  message: string;
}

export interface DepartmentData {
  name: string;
  employeeCount: number;
  averageRating: number;
  performanceTrend: number;
}

export interface BookmarkTrend {
  month: string;
  count: number;
}

export type FilterOptions = {
  departments: string[];
  ratings: number[];
  searchTerm: string;
};
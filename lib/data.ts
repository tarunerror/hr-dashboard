import { Employee, PerformanceHistory, Project, Feedback, DepartmentData, BookmarkTrend } from '@/types/employee';

const departments = [
  'Engineering',
  'Marketing',
  'Sales',
  'Human Resources',
  'Finance',
  'Product',
  'Customer Support',
  'Operations'
];

const jobTitles: Record<string, string[]> = {
  'Engineering': ['Software Engineer', 'Frontend Developer', 'Backend Developer', 'DevOps Engineer', 'QA Engineer'],
  'Marketing': ['Marketing Specialist', 'Content Manager', 'SEO Specialist', 'Social Media Manager', 'Brand Strategist'],
  'Sales': ['Sales Representative', 'Account Executive', 'Sales Manager', 'Business Development', 'Sales Analyst'],
  'Human Resources': ['HR Specialist', 'Recruiter', 'HR Manager', 'Talent Acquisition', 'HR Coordinator'],
  'Finance': ['Financial Analyst', 'Accountant', 'Finance Manager', 'Payroll Specialist', 'Financial Controller'],
  'Product': ['Product Manager', 'Product Designer', 'UX Designer', 'Product Analyst', 'Product Owner'],
  'Customer Support': ['Support Specialist', 'Customer Success Manager', 'Support Engineer', 'Customer Advocate', 'Support Lead'],
  'Operations': ['Operations Manager', 'Logistics Coordinator', 'Operations Analyst', 'Facilities Manager', 'Supply Chain Specialist']
};

const firstNames = [
  'Arjun', 'Priya', 'Rahul', 'Neha', 'Vikram',
  'Anjali', 'Arun', 'Meera', 'Karthik', 'Divya',
  'Rajesh', 'Anita', 'Suresh', 'Kavita', 'Amit',
  'Pooja', 'Deepak', 'Sunita', 'Sanjay', 'Ritu'
];

const lastNames = [
  'Patel', 'Kumar', 'Singh', 'Shah', 'Sharma',
  'Verma', 'Gupta', 'Malhotra', 'Kapoor', 'Mehta',
  'Reddy', 'Joshi', 'Nair', 'Iyer', 'Rao'
];

export async function fetchEmployees(): Promise<Employee[]> {
  try {
    const response = await fetch('https://dummyjson.com/users?limit=20');
    if (!response.ok) {
      console.error('API response not ok:', response.status, response.statusText);
      return [];
    }
    
    const data = await response.json();
    if (!data?.users || !Array.isArray(data.users)) {
      console.error('Invalid API response format');
      return [];
    }
    
    return data.users.map((user: any) => {
      try {
        const department = getRandomDepartment();
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        
        return {
          ...user,
          firstName,
          lastName,
          company: {
            name: user.company?.name || 'Acme Inc.',
            department,
            title: getRandomJobTitle(department)
          },
          performanceRating: getRandomRating(),
          performanceHistory: generatePerformanceHistory(),
          projects: generateProjects(),
          feedback: generateFeedback()
        };
      } catch (error) {
        console.error('Error processing user data:', error);
        return null;
      }
    }).filter(Boolean) as Employee[];
  } catch (error) {
    console.error('Error fetching employees:', error);
    return [];
  }
}

export async function fetchEmployeeById(id: string): Promise<Employee | null> {
  try {
    const response = await fetch(`https://dummyjson.com/users/${id}`, {
      next: { revalidate: 0 },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch employee with ID ${id}`);
    }
    
    const user = await response.json();
    
    const department = getRandomDepartment();
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    const employee: Employee = {
      ...user,
      firstName,
      lastName,
      company: {
        name: user.company?.name || 'Acme Inc.',
        department,
        title: getRandomJobTitle(department)
      },
      performanceRating: getRandomRating(),
      performanceHistory: generatePerformanceHistory(),
      projects: generateProjects(),
      feedback: generateFeedback()
    };
    
    return employee;
  } catch (error) {
    console.error(`Error fetching employee with ID ${id}:`, error);
    return null;
  }
}

export async function fetchDepartmentAnalytics(): Promise<DepartmentData[]> {
  const employees = await fetchEmployees();
  
  const departmentMap = new Map<string, Employee[]>();
  
  employees.forEach(employee => {
    const dept = employee.company?.department || 'Unknown';
    if (!departmentMap.has(dept)) {
      departmentMap.set(dept, []);
    }
    departmentMap.get(dept)!.push(employee);
  });
  
  return Array.from(departmentMap.entries()).map(([name, employees]) => {
    const totalRatings = employees.reduce((sum, emp) => sum + (emp.performanceRating || 0), 0);
    const averageRating = totalRatings / employees.length;
    
    return {
      name,
      employeeCount: employees.length,
      averageRating: parseFloat(averageRating.toFixed(2)),
      performanceTrend: parseFloat((Math.random() * 2 - 1).toFixed(2))
    };
  });
}

export function getBookmarkTrends(): BookmarkTrend[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const currentMonth = new Date().getMonth();
  
  return Array.from({ length: 6 }, (_, i) => {
    const monthIndex = (currentMonth - i + 12) % 12;
    return {
      month: months[monthIndex],
      count: Math.floor(Math.random() * 20 + 5)
    };
  }).reverse();
}

function getRandomDepartment(): string {
  return departments[Math.floor(Math.random() * departments.length)];
}

function getRandomJobTitle(department: string): string {
  const titles = jobTitles[department] || ['Employee'];
  return titles[Math.floor(Math.random() * titles.length)];
}

function getRandomRating(): number {
  return Math.floor(Math.random() * 5) + 1;
}

function generatePerformanceHistory(): PerformanceHistory[] {
  const reviews = [];
  const currentYear = new Date().getFullYear();
  
  for (let i = 0; i < 3; i++) {
    reviews.push({
      id: i + 1,
      date: `${currentYear - i}-06-15`,
      rating: Math.floor(Math.random() * 5) + 1,
      reviewedBy: getRandomReviewerName(),
      comments: getRandomReviewComment()
    });
  }
  
  return reviews;
}

function getRandomReviewerName(): string {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
}

function getRandomReviewComment(): string {
  const comments = [
    'Consistently meets expectations and delivers quality work.',
    'Exceeds expectations in most areas. A valuable team member.',
    'Shows great potential but needs improvement in meeting deadlines.',
    'Outstanding performance and leadership skills.',
    'Needs improvement in communication and teamwork.',
    'Strong technical skills but could improve in documentation.',
    'Great team player who consistently supports colleagues.',
    'Shows initiative and drives projects forward effectively.',
    'Needs to work on time management and prioritization.',
    'Excellent problem-solving abilities and creative thinking.'
  ];
  
  return comments[Math.floor(Math.random() * comments.length)];
}

function generateProjects(): Project[] {
  const projectNames = [
    'Website Redesign',
    'Mobile App Development',
    'Data Migration',
    'Cloud Infrastructure',
    'Marketing Campaign',
    'Product Launch',
    'Customer Research',
    'Process Optimization',
    'Compliance Update',
    'Security Audit'
  ];
  
  const roles = [
    'Team Lead',
    'Developer',
    'Designer',
    'Analyst',
    'Coordinator',
    'Consultant',
    'Subject Matter Expert'
  ];
  
  const statuses = ['completed', 'in-progress', 'planned'] as const;
  const currentYear = new Date().getFullYear();
  
  const count = Math.floor(Math.random() * 3) + 2;
  
  return Array.from({ length: count }, (_, i) => {
    const startYear = currentYear - Math.floor(Math.random() * 3);
    const startMonth = Math.floor(Math.random() * 12) + 1;
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    let endDate;
    if (status === 'completed') {
      const endYear = startYear + (Math.random() > 0.7 ? 1 : 0);
      const endMonth = Math.floor(Math.random() * 12) + 1;
      endDate = `${endYear}-${endMonth.toString().padStart(2, '0')}-15`;
    }
    
    return {
      id: i + 1,
      name: projectNames[Math.floor(Math.random() * projectNames.length)],
      role: roles[Math.floor(Math.random() * roles.length)],
      startDate: `${startYear}-${startMonth.toString().padStart(2, '0')}-01`,
      endDate,
      status,
      contribution: Math.floor(Math.random() * 40) + 60
    };
  });
}

function generateFeedback(): Feedback[] {
  const feedbackTypes = ['praise', 'improvement', 'general'] as const;
  
  const feedbackMessages = {
    praise: [
      'Excellent collaboration skills demonstrated during the project.',
      'Went above and beyond to help the team meet deadlines.',
      'Provided innovative solutions to complex problems.',
      'Demonstrated great leadership in challenging situations.',
      'Consistently delivers high-quality work.'
    ],
    improvement: [
      'Could improve communication with stakeholders.',
      'Needs to focus more on documentation.',
      'Should work on time management skills.',
      'Would benefit from more detailed planning.',
      'Could improve technical knowledge in specific areas.'
    ],
    general: [
      'Consistent contributor to team success.',
      'Works well under pressure.',
      'Good team player who supports colleagues.',
      'Demonstrates good problem-solving abilities.',
      'Adapts well to changing priorities.'
    ]
  };
  
  const count = Math.floor(Math.random() * 4) + 3;
  const currentYear = new Date().getFullYear();
  
  return Array.from({ length: count }, (_, i) => {
    const type = feedbackTypes[Math.floor(Math.random() * feedbackTypes.length)];
    const year = currentYear - Math.floor(Math.random() * 2);
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    
    return {
      id: i + 1,
      date: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
      from: getRandomReviewerName(),
      type,
      message: feedbackMessages[type][Math.floor(Math.random() * feedbackMessages[type].length)]
    };
  });
}
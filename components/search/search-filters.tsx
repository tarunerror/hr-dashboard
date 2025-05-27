'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { 
  Search, 
  Filter, 
  X, 
  Check 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Checkbox } from '@/components/ui/checkbox';
import { FilterOptions } from '@/types/employee';

const DEPARTMENTS = [
  'Engineering',
  'Marketing',
  'Sales',
  'Human Resources',
  'Finance',
  'Product',
  'Customer Support',
  'Operations'
];

const RATINGS = [1, 2, 3, 4, 5];

export function SearchFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    departments: [],
    ratings: [],
    searchTerm: ''
  });

  const [openFilter, setOpenFilter] = useState(false);

  // Initialize filters from URL params on component mount
  useEffect(() => {
    const currentSearchTerm = searchParams.get('search') || '';
    const currentDepartments = searchParams.get('departments')?.split(',').filter(Boolean) || [];
    const currentRatings = searchParams.get('ratings')?.split(',').map(Number).filter(Boolean) || [];
    
    setSearchTerm(currentSearchTerm);
    setFilters({
      departments: currentDepartments,
      ratings: currentRatings,
      searchTerm: currentSearchTerm
    });
  }, [searchParams]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update the filters state
    setFilters(prev => ({
      ...prev,
      searchTerm
    }));
    
    // Update URL with search params
    updateSearchParams({
      ...filters,
      searchTerm
    });
  };

  // Toggle department filter
  const toggleDepartment = (department: string) => {
    setFilters(prev => {
      const newDepartments = prev.departments.includes(department)
        ? prev.departments.filter(d => d !== department)
        : [...prev.departments, department];
      
      const newFilters = {
        ...prev,
        departments: newDepartments
      };
      
      // Update URL with new filters
      updateSearchParams(newFilters);
      
      return newFilters;
    });
  };

  // Toggle rating filter
  const toggleRating = (rating: number) => {
    setFilters(prev => {
      const newRatings = prev.ratings.includes(rating)
        ? prev.ratings.filter(r => r !== rating)
        : [...prev.ratings, rating];
      
      const newFilters = {
        ...prev,
        ratings: newRatings
      };
      
      // Update URL with new filters
      updateSearchParams(newFilters);
      
      return newFilters;
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      departments: [],
      ratings: [],
      searchTerm: ''
    });
    
    // Update URL with cleared filters
    router.push(pathname);
  };

  // Update search params in URL
  const updateSearchParams = (newFilters: FilterOptions) => {
    const params = new URLSearchParams();
    
    if (newFilters.searchTerm) {
      params.set('search', newFilters.searchTerm);
    }
    
    if (newFilters.departments.length > 0) {
      params.set('departments', newFilters.departments.join(','));
    }
    
    if (newFilters.ratings.length > 0) {
      params.set('ratings', newFilters.ratings.join(','));
    }
    
    // Update the URL with new params
    router.push(`${pathname}?${params.toString()}`);
  };

  // Calculate active filters count
  const activeFiltersCount = 
    (filters.departments.length > 0 ? 1 : 0) + 
    (filters.ratings.length > 0 ? 1 : 0);

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearchSubmit} className="flex w-full items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, email, or department..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <Popover open={openFilter} onOpenChange={setOpenFilter}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="shrink-0 flex items-center gap-1">
              <Filter className="h-4 w-4 mr-1" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px] p-0" align="end">
            <Command>
              <CommandInput placeholder="Search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                
                <CommandGroup heading="Departments">
                  {DEPARTMENTS.map((department) => (
                    <CommandItem
                      key={department}
                      onSelect={() => toggleDepartment(department)}
                    >
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={filters.departments.includes(department)}
                          onCheckedChange={() => toggleDepartment(department)}
                        />
                        <span>{department}</span>
                      </div>
                      {filters.departments.includes(department) && (
                        <Check className="ml-auto h-4 w-4" />
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
                
                <CommandSeparator />
                
                <CommandGroup heading="Performance Rating">
                  {RATINGS.map((rating) => (
                    <CommandItem
                      key={rating}
                      onSelect={() => toggleRating(rating)}
                    >
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={filters.ratings.includes(rating)}
                          onCheckedChange={() => toggleRating(rating)}
                        />
                        <span>{rating} {rating === 1 ? 'Star' : 'Stars'}</span>
                      </div>
                      {filters.ratings.includes(rating) && (
                        <Check className="ml-auto h-4 w-4" />
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
                
                <CommandSeparator />
                
                <div className="p-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={clearFilters}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Clear Filters
                  </Button>
                </div>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Button type="submit">Search</Button>
      </form>
      
      {/* Active filters display */}
      {(filters.departments.length > 0 || filters.ratings.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {filters.departments.map(dept => (
            <Badge key={dept} variant="secondary" className="flex items-center gap-1">
              {dept}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => toggleDepartment(dept)}
              />
            </Badge>
          ))}
          
          {filters.ratings.map(rating => (
            <Badge key={rating} variant="secondary" className="flex items-center gap-1">
              {rating} {rating === 1 ? 'Star' : 'Stars'}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => toggleRating(rating)}
              />
            </Badge>
          ))}
          
          {(filters.departments.length > 0 || filters.ratings.length > 0) && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-xs"
              onClick={clearFilters}
            >
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
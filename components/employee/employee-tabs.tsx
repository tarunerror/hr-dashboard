'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OverviewTab } from './tabs/overview-tab';
import { ProjectsTab } from './tabs/projects-tab';
import { FeedbackTab } from './tabs/feedback-tab';
import { Employee } from '@/types/employee';

interface EmployeeTabsProps {
  employee: Employee;
}

export function EmployeeTabs({ employee }: EmployeeTabsProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <Card>
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={tabVariants}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="overview">
              <OverviewTab employee={employee} />
            </TabsContent>
            <TabsContent value="projects">
              <ProjectsTab projects={employee.projects || []} />
            </TabsContent>
            <TabsContent value="feedback">
              <FeedbackTab feedback={employee.feedback || []} />
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </Card>
  );
}
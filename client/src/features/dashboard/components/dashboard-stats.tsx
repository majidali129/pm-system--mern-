import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Check, Clock, Folder } from "lucide-react";
import { cn } from "@/lib/utils";

type DashboardStatsProps = {
  activeProjects: number;
  completedTasks: number;
  teamMembers: number;
  upcomingDeadlines: number;
};
export const DashboardStats = ({
  activeProjects,
  completedTasks,
  teamMembers,
  upcomingDeadlines,
}: DashboardStatsProps) => {
  const stats = [
    {
      title: "Active Projects",
      value: activeProjects,
      icon: Folder,
      change: "+2 from last month",
      color: "text-primary",
    },
    {
      title: "Tasks Completed",
      value: completedTasks,
      icon: Check,
      change: "+18% from last week",
      color: "text-green-500",
    },
    {
      title: "Team Members",
      value: teamMembers,
      icon: Users,
      change: "Accross all projects",
      color: "text-orange-500",
    },
    {
      title: "Upcoming Deadlines",
      value: upcomingDeadlines,
      icon: Clock,
      change: "Due this week",
      color: "text-destructive",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="gap-3">
            <CardHeader className="">
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground/80 font-normal">
                  {stat.title}
                </CardTitle>
                <Icon className={cn("h-4 w-4", stat.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground/90">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

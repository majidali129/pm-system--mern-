import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  Target,
  FolderOpen,
  Download,
  Filter,
  RefreshCw,
} from "lucide-react";
// import { useProjectStats } from "@/features/projects/hooks/use-project-stats";

// Mock data for reports
const mockProjectStats = {
  total: 12,
  active: 5,
  completed: 4,
  onHold: 2,
  cancelled: 1,
  totalBudget: 850000,
  totalSpent: 520000,
  averageProgress: 68,
};

const mockTaskStats = {
  total: 156,
  todo: 45,
  inProgress: 38,
  inReview: 23,
  completed: 42,
  overdue: 8,
  completionRate: 73,
  averageTimeToComplete: 4.2, // days
};

const mockTeamStats = {
  totalTeams: 8,
  totalMembers: 34,
  activeMembers: 31,
  averageTeamSize: 4.25,
  mostProductiveTeam: "Frontend Development Team",
  domains: [
    { name: "Frontend", teams: 2, members: 8 },
    { name: "Backend", teams: 2, members: 6 },
    { name: "Design", teams: 1, members: 5 },
    { name: "DevOps", teams: 1, members: 4 },
    { name: "QA", teams: 2, members: 11 },
  ],
};

const mockProjectProgress = [
  {
    name: "E-commerce Platform",
    progress: 85,
    status: "active",
    budget: 150000,
    spent: 127500,
  },
  {
    name: "Mobile Banking App",
    progress: 45,
    status: "active",
    budget: 200000,
    spent: 90000,
  },
  {
    name: "Analytics Dashboard",
    progress: 100,
    status: "completed",
    budget: 80000,
    spent: 75000,
  },
  {
    name: "Cloud Migration",
    progress: 30,
    status: "on-hold",
    budget: 120000,
    spent: 36000,
  },
  {
    name: "AI Chatbot",
    progress: 15,
    status: "cancelled",
    budget: 90000,
    spent: 13500,
  },
];

const mockTasksByPriority = [
  { priority: "urgent", count: 12, color: "bg-red-500" },
  { priority: "high", count: 28, color: "bg-orange-500" },
  { priority: "medium", count: 67, color: "bg-blue-500" },
  { priority: "low", count: 49, color: "bg-gray-500" },
];

const mockTeamPerformance = [
  {
    team: "Frontend Development",
    tasksCompleted: 45,
    efficiency: 92,
    members: 4,
  },
  { team: "Backend API", tasksCompleted: 38, efficiency: 88, members: 3 },
  { team: "UI/UX Design", tasksCompleted: 32, efficiency: 85, members: 3 },
  { team: "DevOps", tasksCompleted: 28, efficiency: 90, members: 2 },
  { team: "Quality Assurance", tasksCompleted: 52, efficiency: 87, members: 5 },
];

const mockRecentActivity = [
  {
    type: "project",
    action: "completed",
    item: "Analytics Dashboard",
    time: "2 hours ago",
  },
  {
    type: "task",
    action: "assigned",
    item: "API Integration",
    time: "4 hours ago",
  },
  {
    type: "team",
    action: "added",
    item: "John Doe to Frontend Team",
    time: "1 day ago",
  },
  {
    type: "project",
    action: "created",
    item: "Customer Portal",
    time: "2 days ago",
  },
  {
    type: "task",
    action: "overdue",
    item: "Database Migration",
    time: "3 days ago",
  },
];

const statusColors = {
  active: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  "on-hold": "bg-yellow-100 text-yellow-800",
  cancelled: "bg-red-100 text-red-800",
  planning: "bg-purple-100 text-purple-800",
};

export const Reports = () => {
  const [dateRange, setDateRange] = useState("30");
  const [activeTab, setActiveTab] = useState("overview");
  // const { projectStats } = useProjectStats();

  // console.log("projectStats", projectStats);
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "project":
        return <FolderOpen className="w-4 h-4" />;
      case "task":
        return <Target className="w-4 h-4" />;
      case "team":
        return <Users className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Track performance and insights across your projects and teams
          </p>
        </div>

        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 3 months</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Projects
                </CardTitle>
                <FolderOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockProjectStats.total}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +2 from last month
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Tasks
                </CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockTaskStats.total}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +15 from last week
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Team Members
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockTeamStats.totalMembers}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-blue-600 flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    Across {mockTeamStats.totalTeams} teams
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Budget Utilization
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(
                    (mockProjectStats.totalSpent /
                      mockProjectStats.totalBudget) *
                      100
                  )}
                  %
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatCurrency(mockProjectStats.totalSpent)} of{" "}
                  {formatCurrency(mockProjectStats.totalBudget)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Project Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Project Status Distribution</CardTitle>
                <CardDescription>
                  Current status of all projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {mockProjectStats.active}
                      </span>
                      <div className="w-20">
                        <Progress
                          value={
                            (mockProjectStats.active / mockProjectStats.total) *
                            100
                          }
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {mockProjectStats.completed}
                      </span>
                      <div className="w-20">
                        <Progress
                          value={
                            (mockProjectStats.completed /
                              mockProjectStats.total) *
                            100
                          }
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">On Hold</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {mockProjectStats.onHold}
                      </span>
                      <div className="w-20">
                        <Progress
                          value={
                            (mockProjectStats.onHold / mockProjectStats.total) *
                            100
                          }
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Cancelled</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {mockProjectStats.cancelled}
                      </span>
                      <div className="w-20">
                        <Progress
                          value={
                            (mockProjectStats.cancelled /
                              mockProjectStats.total) *
                            100
                          }
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Task Priority Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Task Priority Breakdown</CardTitle>
                <CardDescription>
                  Distribution of tasks by priority level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTasksByPriority.map((item) => (
                    <div
                      key={item.priority}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 ${item.color} rounded-full`}
                        ></div>
                        <span className="text-sm capitalize">
                          {item.priority}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {item.count}
                        </span>
                        <div className="w-20">
                          <Progress
                            value={(item.count / mockTaskStats.total) * 100}
                            className="h-2"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest updates across your projects and teams
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50"
                  >
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium capitalize">
                          {activity.type}
                        </span>{" "}
                        {activity.action}:{" "}
                        <span className="font-medium">{activity.item}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Project Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Project Progress Overview</CardTitle>
                <CardDescription>
                  Current progress of all active projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProjectProgress.map((project, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {project.name}
                          </span>
                          <Badge
                            variant="outline"
                            className={
                              statusColors[
                                project.status as keyof typeof statusColors
                              ]
                            }
                          >
                            {project.status}
                          </Badge>
                        </div>
                        <span className="text-sm font-medium">
                          {project.progress}%
                        </span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Budget Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Budget Analysis</CardTitle>
                <CardDescription>
                  Budget utilization across projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProjectProgress.map((project, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {project.name}
                        </span>
                        <span className="text-sm">
                          {formatCurrency(project.spent)} /{" "}
                          {formatCurrency(project.budget)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={(project.spent / project.budget) * 100}
                          className="h-2 flex-1"
                        />
                        <span className="text-xs text-muted-foreground">
                          {Math.round((project.spent / project.budget) * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Project Statistics */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Average Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockProjectStats.averageProgress}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Across all projects
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Budget Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(
                    (mockProjectStats.totalSpent /
                      mockProjectStats.totalBudget) *
                      100
                  )}
                  %
                </div>
                <p className="text-xs text-muted-foreground">
                  Budget utilization rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(
                    (mockProjectStats.completed / mockProjectStats.total) * 100
                  )}
                  %
                </div>
                <p className="text-xs text-muted-foreground">
                  Projects completed successfully
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockTaskStats.completionRate}%
                </div>
                <Progress
                  value={mockTaskStats.completionRate}
                  className="mt-2 h-2"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Overdue Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {mockTaskStats.overdue}
                </div>
                <p className="text-xs text-muted-foreground">
                  Require immediate attention
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">In Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {mockTaskStats.inProgress}
                </div>
                <p className="text-xs text-muted-foreground">
                  Currently being worked on
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Avg. Completion Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockTaskStats.averageTimeToComplete}
                </div>
                <p className="text-xs text-muted-foreground">Days per task</p>
              </CardContent>
            </Card>
          </div>

          {/* Task Status Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Task Status Breakdown</CardTitle>
              <CardDescription>
                Current distribution of tasks by status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">
                    {mockTaskStats.todo}
                  </div>
                  <p className="text-sm text-muted-foreground">To Do</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {mockTaskStats.inProgress}
                  </div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {mockTaskStats.inReview}
                  </div>
                  <p className="text-sm text-muted-foreground">In Review</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {mockTaskStats.completed}
                  </div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {mockTaskStats.overdue}
                  </div>
                  <p className="text-sm text-muted-foreground">Overdue</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Priority Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Task Priority Distribution</CardTitle>
              <CardDescription>
                Tasks organized by priority levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {mockTasksByPriority.map((item) => (
                  <div
                    key={item.priority}
                    className="text-center p-4 border rounded-lg"
                  >
                    <div
                      className={`w-4 h-4 ${item.color} rounded-full mx-auto mb-2`}
                    ></div>
                    <div className="text-2xl font-bold">{item.count}</div>
                    <p className="text-sm text-muted-foreground capitalize">
                      {item.priority}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Teams Tab */}
        <TabsContent value="teams" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total Teams</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockTeamStats.totalTeams}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across all domains
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Active Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockTeamStats.activeMembers}
                </div>
                <p className="text-xs text-muted-foreground">
                  Out of {mockTeamStats.totalMembers} total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Avg. Team Size</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockTeamStats.averageTeamSize}
                </div>
                <p className="text-xs text-muted-foreground">
                  Members per team
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Top Performer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-bold">
                  {mockTeamStats.mostProductiveTeam}
                </div>
                <p className="text-xs text-muted-foreground">
                  Highest task completion
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Team Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
              <CardDescription>
                Task completion and efficiency metrics by team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTeamPerformance.map((team, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>
                          {team.team.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{team.team}</h4>
                        <p className="text-sm text-muted-foreground">
                          {team.members} members
                        </p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold">
                            {team.tasksCompleted}
                          </div>
                          <p className="text-xs text-muted-foreground">Tasks</p>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold">
                            {team.efficiency}%
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Efficiency
                          </p>
                        </div>
                      </div>
                      <Progress value={team.efficiency} className="w-24 h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Domain Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Team Distribution by Domain</CardTitle>
              <CardDescription>
                Teams and members organized by expertise area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockTeamStats.domains.map((domain, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">{domain.name}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Teams:</span>
                        <span className="font-medium">{domain.teams}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Members:</span>
                        <span className="font-medium">{domain.members}</span>
                      </div>
                      <Progress
                        value={
                          (domain.members / mockTeamStats.totalMembers) * 100
                        }
                        className="h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

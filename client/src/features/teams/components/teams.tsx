import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Plus, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamsList } from "./teams-list";

const teamMembers = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Senior Designer",
    department: "Design",
    email: "alice@company.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    avatar: "/placeholder.svg",
    status: "Online",
    currentProject: "Website Redesign",
    tasksCompleted: 24,
    totalTasks: 30,
    skills: ["UI/UX Design", "Figma", "Prototyping", "User Research"],
    joinDate: "2022-03-15",
    workload: 85,
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Full Stack Developer",
    department: "Engineering",
    email: "bob@company.com",
    phone: "+1 (555) 234-5678",
    location: "New York, NY",
    avatar: "/placeholder.svg",
    status: "Online",
    currentProject: "API Integration",
    tasksCompleted: 18,
    totalTasks: 22,
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    joinDate: "2021-11-08",
    workload: 78,
  },
  {
    id: 3,
    name: "Carol Davis",
    role: "Product Manager",
    department: "Product",
    email: "carol@company.com",
    phone: "+1 (555) 345-6789",
    location: "Austin, TX",
    avatar: "/placeholder.svg",
    status: "Away",
    currentProject: "Mobile App Development",
    tasksCompleted: 15,
    totalTasks: 20,
    skills: ["Product Strategy", "Agile", "Analytics", "User Stories"],
    joinDate: "2020-07-22",
    workload: 92,
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Mobile Developer",
    department: "Engineering",
    email: "david@company.com",
    phone: "+1 (555) 456-7890",
    location: "Seattle, WA",
    avatar: "/placeholder.svg",
    status: "Offline",
    currentProject: "Mobile App Development",
    tasksCompleted: 12,
    totalTasks: 18,
    skills: ["React Native", "Swift", "Kotlin", "Firebase"],
    joinDate: "2023-01-10",
    workload: 68,
  },
  {
    id: 5,
    name: "Eve Brown",
    role: "QA Engineer",
    department: "Engineering",
    email: "eve@company.com",
    phone: "+1 (555) 567-8901",
    location: "Denver, CO",
    avatar: "/placeholder.svg",
    status: "Online",
    currentProject: "API Integration",
    tasksCompleted: 8,
    totalTasks: 12,
    skills: ["Test Automation", "Selenium", "Jest", "Manual Testing"],
    joinDate: "2022-09-05",
    workload: 75,
  },
  {
    id: 6,
    name: "Frank Miller",
    role: "Backend Developer",
    department: "Engineering",
    email: "frank@company.com",
    phone: "+1 (555) 678-9012",
    location: "Chicago, IL",
    avatar: "/placeholder.svg",
    status: "Online",
    currentProject: "API Integration",
    tasksCompleted: 20,
    totalTasks: 25,
    skills: ["Python", "Django", "AWS", "Docker"],
    joinDate: "2021-05-18",
    workload: 88,
  },
];
const departments = [
  {
    name: "Engineering",
    members: teamMembers.filter((m) => m.department === "Engineering"),
    color: "bg-primary/10 text-primary border-primary/20",
  },
  {
    name: "Design",
    members: teamMembers.filter((m) => m.department === "Design"),
    color: "bg-accent/10 text-accent-foreground border-accent/20",
  },
  {
    name: "Product",
    members: teamMembers.filter((m) => m.department === "Product"),
    color: "bg-warning/10 text-warning border-warning/20",
  },
];

export const Teams = () => {
  return (
    <section className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>Teams</h2>
          <p className="text-muted-foreground">
            Manage your team members and departments
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Member
        </Button>
      </div>
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="gap-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-foreground/80  font-normal">
              Total Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMembers.length}</div>
            <p className="text-xs text-muted-foreground">Active team members</p>
          </CardContent>
        </Card>
        <Card className="gap-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-foreground/80 font-normal">
              Departments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments.length}</div>
            <p className="text-xs text-muted-foreground">Active departments</p>
          </CardContent>
        </Card>
        <Card className="gap-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-foreground/80 font-normal">
              Online
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamMembers.filter((m) => m.status === "Online").length}
            </div>
            <p className="text-xs text-muted-foreground">Members online</p>
          </CardContent>
        </Card>
        <Card className="gap-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-foreground/80 font-normal">
              Avg Workload
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                teamMembers.reduce((acc, m) => acc + m.workload, 0) /
                  teamMembers.length
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">Team capacity</p>
          </CardContent>
        </Card>
      </div>
      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search team members..." className="pl-10" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <TeamsList />
    </section>
  );
};

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Mail, Phone, MapPin } from "lucide-react";

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

const getStatusColor = (status: string) => {
  switch (status) {
    case "Online":
      return "bg-success h-3 w-3 rounded-full";
    case "Away":
      return "bg-warning h-3 w-3 rounded-full";
    case "Offline":
      return "bg-muted h-3 w-3 rounded-full";
    default:
      return "bg-muted h-3 w-3 rounded-full";
  }
};

const getWorkloadColor = (workload: number) => {
  if (workload >= 90) return "text-destructive";
  if (workload >= 80) return "text-warning";
  return "text-success";
};

export const TeamsList = () => {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList>
        <TabsTrigger value="all">All Members</TabsTrigger>
        <TabsTrigger value="departments">Departments</TabsTrigger>
        <TabsTrigger value="workload">Workload</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="space-y-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <Card
              key={member.id}
              className=" transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Avatar className="h-11 w-11">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-0.5 right-0 ${getStatusColor(
                        member.status
                      )} border-2 border-primary`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className=" truncate">{member.name}</CardTitle>
                    <CardDescription className="mt-0.5">
                      {member.role}
                    </CardDescription>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {member.department}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{member.location}</span>
                  </div>
                </div>

                {/* Current Project */}
                <div>
                  <div className="text-sm font-medium mb-2">
                    Current Project
                  </div>
                  <Badge variant="outline">{member.currentProject}</Badge>
                </div>

                {/* Task Progress */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-medium">Tasks Progress</span>
                    <span className="text-muted-foreground">
                      {member.tasksCompleted}/{member.totalTasks}
                    </span>
                  </div>
                  <Progress
                    value={(member.tasksCompleted / member.totalTasks) * 100}
                    className="h-2"
                  />
                </div>

                {/* Workload */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-medium">Workload</span>
                    <span className={getWorkloadColor(member.workload)}>
                      {member.workload}%
                    </span>
                  </div>
                  <Progress value={member.workload} className="h-2" />
                </div>

                {/* Skills */}
                <div>
                  <div className="text-sm font-medium mb-2">Skills</div>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="departments" className="space-y-6">
        {departments.map((dept) => (
          <Card key={dept.name}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-3">
                    {dept.name}
                    <Badge className={dept.color}>
                      {dept.members.length} members
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Average workload:{" "}
                    {Math.round(
                      dept.members.reduce((acc, m) => acc + m.workload, 0) /
                        dept.members.length
                    )}
                    %
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {dept.members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="text-sm">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 ${getStatusColor(
                          member.status
                        )} border-2 border-background`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{member.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {member.role}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`text-xs ${getWorkloadColor(
                            member.workload
                          )}`}
                        >
                          {member.workload}% workload
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </TabsContent>

      <TabsContent value="workload" className="space-y-4">
        <div className="space-y-3">
          {teamMembers
            .sort((a, b) => b.workload - a.workload)
            .map((member) => (
              <Card
                key={member.id}
                className="hover:shadow-card transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-11 w-11">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 ${getStatusColor(
                          member.status
                        )} border-2 border-background`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {member.role} • {member.department}
                          </p>
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-lg font-bold ${getWorkloadColor(
                              member.workload
                            )}`}
                          >
                            {member.workload}%
                          </div>
                          <div className="text-xs text-muted-foreground">
                            workload
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Current project: {member.currentProject}</span>
                          <span className="text-muted-foreground">
                            {member.tasksCompleted}/{member.totalTasks} tasks
                          </span>
                        </div>
                        <Progress value={member.workload} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

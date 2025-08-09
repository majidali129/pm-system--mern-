import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TabsContent } from "@/components/ui/tabs";

const recentProjects = [
  {
    name: "Website Redesign",
    role: "Lead Designer",
    completion: 85,
    status: "In Progress",
  },
  {
    name: "Mobile App Development",
    role: "UI Designer",
    completion: 100,
    status: "Completed",
  },
  {
    name: "API Integration",
    role: "Design Consultant",
    completion: 60,
    status: "In Progress",
  },
];

const skills = [
  { name: "UI/UX Design", level: 95, category: "Design" },
  { name: "Figma", level: 90, category: "Tools" },
  { name: "Prototyping", level: 85, category: "Design" },
  { name: "User Research", level: 80, category: "Research" },
  { name: "Design Systems", level: 88, category: "Design" },
  { name: "React", level: 75, category: "Development" },
];

export const ProfileOverview = () => {
  return (
    <TabsContent value="overview" className="space-y-6">
      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Projects</CardTitle>
          <CardDescription>Your latest project involvement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentProjects.map((project, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border"
              >
                <div className="flex-1">
                  <div className="font-medium">{project.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {project.role}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Progress
                      value={project.completion}
                      className="flex-1 h-2"
                    />
                    <span className="text-sm text-muted-foreground min-w-[3rem]">
                      {project.completion}%
                    </span>
                  </div>
                </div>
                <Badge
                  variant={
                    project.status === "Completed" ? "default" : "secondary"
                  }
                  className="ml-3"
                >
                  {project.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Skills & Expertise</CardTitle>
          <CardDescription>
            Your technical and professional skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{skill.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {skill.category}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {skill.level}%
                  </span>
                </div>
                <Progress value={skill.level} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

import { Mail, Phone, MapPin, Calendar, Camera } from "lucide-react";

const userStats = {
  projectsCompleted: 24,
  tasksCompleted: 187,
  hoursWorked: 1240,
  teamCollaborations: 15,
  efficiency: 89,
  currentStreak: 12,
};

export const UserProfileCard = () => {
  return (
    <div className="lg:col-span-1 space-y-6">
      <Card>
        <CardHeader className="text-center">
          <div className="relative mx-auto">
            <Avatar className="h-24 w-24 mx-auto">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="text-2xl">AC</AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              variant="outline"
              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            <CardTitle>Alice Chen</CardTitle>
            <CardDescription>Senior Designer</CardDescription>
            <Badge variant="outline">Design Team</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              alice@company.com
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              +1 (555) 123-4567
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              San Francisco, CA
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Joined March 2022
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Profile Completion</span>
              <span className="text-muted-foreground">85%</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Stats</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {userStats.projectsCompleted}
            </div>
            <div className="text-xs text-muted-foreground">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {userStats.tasksCompleted}
            </div>
            <div className="text-xs text-muted-foreground">Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {userStats.hoursWorked}
            </div>
            <div className="text-xs text-muted-foreground">Hours</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {userStats.efficiency}%
            </div>
            <div className="text-xs text-muted-foreground">Efficiency</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

export const ProfileActivities = () => {
  return (
    <TabsContent value="activity" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest actions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                action: "Completed task 'Design login page mockups'",
                time: "2 hours ago",
                type: "task",
              },
              {
                action: "Updated project 'Website Redesign' status",
                time: "4 hours ago",
                type: "project",
              },
              {
                action: "Added comment to 'Mobile App Development'",
                time: "1 day ago",
                type: "comment",
              },
              {
                action: "Joined team meeting for API Integration",
                time: "2 days ago",
                type: "meeting",
              },
              {
                action: "Uploaded design assets to project",
                time: "3 days ago",
                type: "upload",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg border"
              >
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div className="flex-1">
                  <div className="font-medium">{activity.action}</div>
                  <div className="text-sm text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {activity.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

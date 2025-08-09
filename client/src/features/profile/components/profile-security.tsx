import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Shield } from "lucide-react";
export const ProfileSecurity = () => {
  return (
    <TabsContent value="security" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </CardTitle>
          <CardDescription>Manage your account security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Password</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Last changed 30 days ago
                </span>
                <Button variant="outline" size="sm">
                  Change Password
                </Button>
              </div>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Add an extra layer of security
                </span>
                <Button variant="outline" size="sm">
                  Enable 2FA
                </Button>
              </div>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium mb-2">Active Sessions</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <div className="text-sm font-medium">Current session</div>
                    <div className="text-xs text-muted-foreground">
                      San Francisco, CA • Chrome
                    </div>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

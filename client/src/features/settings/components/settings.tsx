import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Users,
  Palette,
  Database,
  Download,
  Trash2,
  Plus,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";

export const Settings = () => {
  return (
    <section className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>Settings</h2>
          <p className="text-muted-foreground">
            Manage your application settings and preferences
          </p>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          {/* Organization Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                <h4>Organization Settings</h4>
              </CardTitle>
              <CardDescription>
                Manage your organization's basic information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="orgName">Organization Name</Label>
                  <Input id="orgName" defaultValue="Acme Corp" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue="https://acme.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  defaultValue="A leading project management company"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Default Timezone</Label>
                <Select defaultValue="pst">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pst">Pacific Standard Time</SelectItem>
                    <SelectItem value="est">Eastern Standard Time</SelectItem>
                    <SelectItem value="cst">Central Standard Time</SelectItem>
                    <SelectItem value="mst">Mountain Standard Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance
              </CardTitle>
              <CardDescription>
                Customize the look and feel of your application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <Select defaultValue="system">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Compact Mode</div>
                  <div className="text-sm text-muted-foreground">
                    Use condensed layout for more content
                  </div>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">High Contrast</div>
                  <div className="text-sm text-muted-foreground">
                    Improve visibility with higher contrast
                  </div>
                </div>
                <Switch />
              </div>
              <div className="space-y-2">
                <Label>Font Size</Label>
                <div className="px-2">
                  <Slider
                    defaultValue={[16]}
                    max={24}
                    min={12}
                    step={1}
                    className="w-48"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>12px</span>
                    <span>24px</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Application behavior settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Auto-save</div>
                  <div className="text-sm text-muted-foreground">
                    Automatically save changes
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Keyboard Shortcuts</div>
                  <div className="text-sm text-muted-foreground">
                    Enable keyboard navigation
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Default View</Label>
                <Select defaultValue="kanban">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="list">List View</SelectItem>
                    <SelectItem value="kanban">Kanban Board</SelectItem>
                    <SelectItem value="calendar">Calendar View</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          {/* Email Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Email Notifications
              </CardTitle>
              <CardDescription>
                Configure when and how you receive email notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Project Updates</div>
                  <div className="text-sm text-muted-foreground">
                    Get notified when projects are updated
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Task Assignments</div>
                  <div className="text-sm text-muted-foreground">
                    When you're assigned new tasks
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Due Date Reminders</div>
                  <div className="text-sm text-muted-foreground">
                    Reminders for upcoming deadlines
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Team Mentions</div>
                  <div className="text-sm text-muted-foreground">
                    When someone mentions you
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Weekly Reports</div>
                  <div className="text-sm text-muted-foreground">
                    Weekly productivity summaries
                  </div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Push Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Push Notifications</CardTitle>
              <CardDescription>
                Real-time notifications in your browser
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Enable Push Notifications</div>
                  <div className="text-sm text-muted-foreground">
                    Receive real-time updates
                  </div>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Urgent Tasks Only</div>
                  <div className="text-sm text-muted-foreground">
                    Only high priority notifications
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Quiet Hours</Label>
                <div className="grid gap-2 md:grid-cols-2">
                  <Select defaultValue="22:00">
                    <SelectTrigger>
                      <SelectValue placeholder="Start time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20:00">8:00 PM</SelectItem>
                      <SelectItem value="21:00">9:00 PM</SelectItem>
                      <SelectItem value="22:00">10:00 PM</SelectItem>
                      <SelectItem value="23:00">11:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="08:00">
                    <SelectTrigger>
                      <SelectValue placeholder="End time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="06:00">6:00 AM</SelectItem>
                      <SelectItem value="07:00">7:00 AM</SelectItem>
                      <SelectItem value="08:00">8:00 AM</SelectItem>
                      <SelectItem value="09:00">9:00 AM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          {/* Team Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Management
              </CardTitle>
              <CardDescription>
                Manage team members and permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-medium">Team Members</div>
                  <div className="text-sm text-muted-foreground">
                    6 active members
                  </div>
                </div>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Invite Member
                </Button>
              </div>
              <Separator />
              <div className="space-y-3">
                {[
                  {
                    name: "Alice Chen",
                    role: "Admin",
                    email: "alice@company.com",
                    status: "Active",
                  },
                  {
                    name: "Bob Smith",
                    role: "Member",
                    email: "bob@company.com",
                    status: "Active",
                  },
                  {
                    name: "Carol Davis",
                    role: "Member",
                    email: "carol@company.com",
                    status: "Pending",
                  },
                ].map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {member.email}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          member.status === "Active" ? "default" : "secondary"
                        }
                      >
                        {member.status}
                      </Badge>
                      <Select defaultValue={member.role.toLowerCase()}>
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="member">Member</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Permissions */}
          <Card>
            <CardHeader>
              <CardTitle>Default Permissions</CardTitle>
              <CardDescription>
                Set default permissions for new team members
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Create Projects</div>
                  <div className="text-sm text-muted-foreground">
                    Allow members to create new projects
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Invite Members</div>
                  <div className="text-sm text-muted-foreground">
                    Allow members to invite others
                  </div>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Delete Tasks</div>
                  <div className="text-sm text-muted-foreground">
                    Allow members to delete tasks
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Export Data</div>
                  <div className="text-sm text-muted-foreground">
                    Allow data export permissions
                  </div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Configure security and authentication settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Two-Factor Authentication</div>
                  <div className="text-sm text-muted-foreground">
                    Require 2FA for all team members
                  </div>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Single Sign-On (SSO)</div>
                  <div className="text-sm text-muted-foreground">
                    Enable SSO with your identity provider
                  </div>
                </div>
                <Switch />
              </div>
              <div className="space-y-2">
                <Label>Session Timeout</Label>
                <Select defaultValue="24">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="8">8 hours</SelectItem>
                    <SelectItem value="24">24 hours</SelectItem>
                    <SelectItem value="168">1 week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Password Policy</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      Minimum length: 8 characters
                    </span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Require special characters</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Require numbers</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data & Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data & Privacy
              </CardTitle>
              <CardDescription>
                Manage your data and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Analytics</div>
                  <div className="text-sm text-muted-foreground">
                    Allow usage analytics collection
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Data Export</div>
                  <div className="text-sm text-muted-foreground">
                    Export all your organization data
                  </div>
                </div>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Data Retention</div>
                  <div className="text-sm text-muted-foreground">
                    How long to keep deleted items
                  </div>
                </div>
                <Select defaultValue="30">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          {/* Connected Apps */}
          <Card>
            <CardHeader>
              <CardTitle>Connected Applications</CardTitle>
              <CardDescription>
                Manage your third-party integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "Slack",
                  description: "Team communication",
                  connected: true,
                  icon: "💬",
                },
                {
                  name: "GitHub",
                  description: "Code repository",
                  connected: true,
                  icon: "🐙",
                },
                {
                  name: "Google Calendar",
                  description: "Calendar sync",
                  connected: false,
                  icon: "📅",
                },
                {
                  name: "Figma",
                  description: "Design collaboration",
                  connected: true,
                  icon: "🎨",
                },
                {
                  name: "Jira",
                  description: "Issue tracking",
                  connected: false,
                  icon: "🔧",
                },
              ].map((app, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{app.icon}</div>
                    <div>
                      <div className="font-medium">{app.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {app.description}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {app.connected ? (
                      <>
                        <Badge variant="default">Connected</Badge>
                        <Button variant="outline" size="sm">
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <>
                        <Badge variant="secondary">Not Connected</Badge>
                        <Button size="sm">Connect</Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* API Access */}
          <Card>
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>Manage API keys and webhooks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">API Keys</div>
                  <div className="text-sm text-muted-foreground">
                    2 active keys
                  </div>
                </div>
                <Button variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Generate Key
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Webhooks</div>
                  <div className="text-sm text-muted-foreground">
                    1 active webhook
                  </div>
                </div>
                <Button variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Webhook
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">API Documentation</div>
                  <div className="text-sm text-muted-foreground">
                    View integration guides
                  </div>
                </div>
                <Button variant="outline" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  View Docs
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          {/* Current Plan */}
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>
                Manage your subscription and billing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-primary/5">
                <div>
                  <div className="font-medium text-lg">Pro Plan</div>
                  <div className="text-sm text-muted-foreground">
                    Up to 25 team members
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">$29</div>
                  <div className="text-sm text-muted-foreground">per month</div>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-lg font-bold">6/25</div>
                  <div className="text-sm text-muted-foreground">
                    Team Members
                  </div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-lg font-bold">Unlimited</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button>Upgrade Plan</Button>
                <Button variant="outline">Manage Subscription</Button>
              </div>
            </CardContent>
          </Card>

          {/* Billing History */}
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>
                View your payment history and invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    date: "Jan 1, 2024",
                    amount: "$29.00",
                    status: "Paid",
                    invoice: "INV-001",
                  },
                  {
                    date: "Dec 1, 2023",
                    amount: "$29.00",
                    status: "Paid",
                    invoice: "INV-002",
                  },
                  {
                    date: "Nov 1, 2023",
                    amount: "$29.00",
                    status: "Paid",
                    invoice: "INV-003",
                  },
                ].map((payment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{payment.date}</div>
                      <div className="text-sm text-muted-foreground">
                        {payment.invoice}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-medium">{payment.amount}</div>
                        <Badge variant="default" className="text-xs">
                          {payment.status}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>
                Irreversible and destructive actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Cancel Subscription</div>
                  <div className="text-sm text-muted-foreground">
                    Cancel your current subscription
                  </div>
                </div>
                <Button variant="destructive" size="sm">
                  Cancel Plan
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Delete Organization</div>
                  <div className="text-sm text-muted-foreground">
                    Permanently delete your organization and all data
                  </div>
                </div>
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};

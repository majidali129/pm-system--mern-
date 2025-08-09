import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit2 } from "lucide-react";
import { ProfileOverview } from "./profile-overview";
import { ProfileSettings } from "./profile-settings";
import { ProfileActivities } from "./profile-activities";
import { ProfileSecurity } from "./profile-security";
import { UserProfileCard } from "./user-profile-card";

export const Profile = () => {
  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>
        <Button className="gap-2">
          <Edit2 className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <UserProfileCard />

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <ProfileOverview />

            <ProfileSettings />

            <ProfileActivities />

            <ProfileSecurity />
          </Tabs>
        </div>
      </div>
    </div>
  );
};

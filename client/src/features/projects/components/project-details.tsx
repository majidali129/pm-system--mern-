import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { projectStatusColor } from "@/utils/constants";
import { statusIcons } from "@/utils/constants";
import { formatCurrency } from "@/utils/helpers";
import { format } from "date-fns";
import {
  Clock,
  Target,
  Plus,
  Settings,
  Building2,
  Users,
  User,
  Calendar,
  DollarSign,
  X,
  UserPlus,
  ClipboardList,
  SearchX,
  Loader,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { DatePicker } from "@/components/date-picker";
import { ReusableDialog } from "@/components/re-usable-dialog";
import { AssignTaskForm } from "../../tasks/components/assign-task-form";
import { ProjectTasksList } from "./projec-tasks-list";
import { useUser } from "@/features/auth/hooks/use-user";
import { isPmOrAdmin } from "@/utils/is-pm-or-admin";
import { isOwner as isOwnerApi } from "@/utils/is-owner";
import { Placeholder } from "@/components/placeholder";
import { Spinner } from "@/components/spinner";
import { useProject } from "../hooks/use-project";
import type { ProjectStatus } from "@/types";
import { useStatusUpdate } from "../hooks/use-status-update";
import { useEndDataUpdate } from "../hooks/use-endData-update";
import { useUsers } from "@/features/auth/hooks/use-users";
import { useAllocateTeam } from "../hooks/use-allocate-team";
import { useProjectTasks } from "../hooks/use-project-tasks";
import { useRemoveTeamMember } from "../hooks/use-remove-team-member";

const ProjectDetails = () => {
  const [openAddTeamMember, setOpenAddTeamMember] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isDateDialogOpen, setIsDateDialogOpen] = useState(false);
  const [domainFilter, setDomainFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const { projectId } = useParams<{ projectId: string }>();
  const [newStatus, setNewStatus] = useState<ProjectStatus | null>(null);
  const [newEndDate, setNewEndDate] = useState("");
  const { updateStatus, updatingStatus } = useStatusUpdate(projectId!);
  const { updateEndDate, updatingEndDate } = useEndDataUpdate(projectId!);
  const { user, loadingUser } = useUser();
  const { project, loadingProjectInfo } = useProject(projectId!);
  const { projectTasks, loadingTasks } = useProjectTasks(projectId!);
  const { loadingUsers, users } = useUsers(domainFilter);
  const { allocateTeam, allocatingTeam } = useAllocateTeam(projectId!);
  const { removeMember, removingMember } = useRemoveTeamMember(projectId!);
  console.log(users);

  // MOVE TO TOP ON MOUNT
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (project) {
      setNewStatus(project.status);
      setNewEndDate(project.endDate);
    }
  }, [project]);

  if (loadingUser || !user) return <Spinner />;
  if (loadingProjectInfo) return <Spinner />;
  if (loadingUsers || !users) return <Spinner />;
  if (loadingTasks || !projectTasks) return <Spinner />;
  if (!project)
    return (
      <Placeholder
        icon={<SearchX className="w-8 h-8" />}
        title="Project not found."
        description="The project you’re looking for doesn’t exist, may have been removed, or you don’t have permission to view it."
      />
    );

  const isManagerOrAdmin = isPmOrAdmin(user.role);
  const isOwner = isOwnerApi(user.name, project.createdBy.name);

  const availableDomains = Array.from(
    new Set(users.map((user) => user?.domain))
  );

  const handleUserAllocation = () => {
    allocateTeam(selectedUsers, {
      onSettled: () => {
        setOpenAddTeamMember(false);
        setDomainFilter("all");
        setSelectedUsers([]);
      },
    });
  };

  const handleStatusUpdate = () => {
    if (newStatus)
      updateStatus(newStatus, {
        onSettled: () => {
          setIsStatusDialogOpen(false);
        },
      });
  };
  const handleDateUpdate = () => {
    if (newEndDate)
      updateEndDate(new Date(newEndDate), {
        onSettled: () => {
          setIsDateDialogOpen(false);
        },
      });
  };

  const udpateStatusButton =
    isManagerOrAdmin && isOwner ? (
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Target className="w-4 h-4 mr-2" />
          Update Status
        </Button>
      </DialogTrigger>
    ) : null;

  const updateDueDateButton =
    isManagerOrAdmin && isOwner ? (
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Calendar className="w-4 h-4 mr-2" />
          Update Due Date
        </Button>
      </DialogTrigger>
    ) : null;

  const editProjectButton =
    isManagerOrAdmin && isOwner ? (
      <DialogTrigger asChild>
        <Button size="sm" className="w-full" variant="outline">
          <Settings />
          Edit Project
        </Button>
      </DialogTrigger>
    ) : null;

  const StatusIcon = statusIcons[project.status];
  const totalTeamMembersToProject = project.members.length || 0;
  const allocatedUserIDs = project.members.map((member) => member._id);
  const availableUsers = users.filter(
    (user) => !allocatedUserIDs?.includes(user._id)
  );
  const filteredAvailableusers =
    domainFilter === "all"
      ? availableUsers
      : availableUsers.filter((user) => user.domain === domainFilter);

  const addMemberToTeamButton =
    allocatedUserIDs?.length === 0 && isManagerOrAdmin ? (
      <DialogTrigger asChild>
        <Button size="sm" onClick={() => setOpenAddTeamMember(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </DialogTrigger>
    ) : null;

  const assignTaskButton =
    isManagerOrAdmin && isOwner && totalTeamMembersToProject > 0 ? (
      <DialogTrigger asChild>
        <Button size="sm" className="w-full">
          <UserPlus className="w-4 h-4 mr-2" />
          Assign Task
        </Button>
      </DialogTrigger>
    ) : null;

  return (
    <section className="space-y-10 md:space-y-8">
      {/* Header */}
      <div className="flex-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-wrap">{project.name}</h2>
            <Badge className={projectStatusColor[project.status]}>
              <StatusIcon />
              {project.status}
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground">
            {" "}
            Project ID: <span className="text-sm">{project._id} </span>
          </p>
        </div>
      </div>

      {/* Project Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.progress}%</div>
            <Progress value={project.progress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Usage</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {project.spent
                ? `${Math.round((project.spent / project.budget) * 100)}%`
                : "0%"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {formatCurrency(project.spent)} / {formatCurrency(project.budget)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalTeamMembersToProject}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.ceil(
                (new Date(project.endDate).getTime() -
                  new Date(project.startDate).getTime()) /
                  (1000 * 60 * 60 * 24)
              )}{" "}
              days
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {format(project.startDate, "MMM dd yyyy")} -{" "}
              {format(project.endDate, "MMM dd, yyyy")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectTasks.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {projectTasks.filter((task) => task.status === "done").length ||
                0}{" "}
              completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Project Details */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-7 md:space-y-5">
          {/* Description */}
          <Card className="gap-3 ">
            <CardHeader>
              <CardTitle>
                <h3>Project Description</h3>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </CardContent>
          </Card>

          {/* Project Tasks */}
          <ProjectTasksList project={project} />

          {/* Allocated Teams */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  <h3>
                    {" "}
                    Allocated Team <Badge className="ml-2">
                      Team-Alpha
                    </Badge>{" "}
                  </h3>
                </CardTitle>
                {isManagerOrAdmin &&
                  project.members &&
                  project.members.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setOpenAddTeamMember(true)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add More
                    </Button>
                  )}
              </div>
              <CardDescription>
                Team members currently working on this project
              </CardDescription>
            </CardHeader>
            <CardContent>
              {project.members.length === 0 ? (
                <div className="text-center py-8">
                  <Building2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3>No Team Member Allocated Yet.</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This project doesn't have any team to work yet.
                  </p>
                  {isManagerOrAdmin && (
                    <Button onClick={() => setOpenAddTeamMember(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Members
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Users className="w-4 h-4" />
                      Team Members ({project.members.length})
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-2 py-2">
                      {project.members.map((member) => (
                        <div
                          key={member._id}
                          className="flex items-center justify-between gap-2 text-sm shadow-lg border border-input rounded py-1.5 px-2"
                        >
                          <div className="flex items-center gap-1.5">
                            <Avatar className="w-8 h-8">
                              <AvatarImage
                                src={`/placeholder.svg?height=24&width=24`}
                                alt={member.name}
                              />
                              <AvatarFallback className="text-xs">
                                {member.name
                                  .split(".")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="truncate">{member.name}</span>
                          </div>
                          <Button
                            size="icon"
                            disabled={removingMember}
                            variant="outline"
                            className="rounded-full hover:bg-destructive/10"
                            onClick={() => removeMember(member._id)}
                          >
                            <X className="text-destructive" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Info */}
          <Card className="">
            <CardHeader>
              <CardTitle>
                <h3>Project Information</h3>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Created By</Label>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    {project.createdBy.name.replace("-", " ")}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-sm font-medium">Timeline</Label>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>
                      Start: {format(project.startDate, "MMM dd, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>End: {format(project.endDate, "MMM dd, yyyy")}</span>
                  </div>
                </div>
              </div>

              {isManagerOrAdmin && (
                <>
                  <Separator />

                  {isOwner && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Budget Details
                      </Label>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Total Budget:</span>
                          <span className="font-medium">
                            {formatCurrency(project.budget)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Amount Spent:</span>
                          <span className="font-medium">
                            {formatCurrency(project.spent)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Remaining:</span>
                          <span className="font-medium text-green-600">
                            {formatCurrency(project.budget - project.spent)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {project.tags && project.tags.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Tags</Label>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <Separator />

              <div className="space-y-1 text-xs text-muted-foreground">
                <div>
                  Created:{" "}
                  {format(project.createdAt, "MMM dd, yyyy 'at' HH:mm")}
                </div>
                <div>
                  Updated:{" "}
                  {format(project.updatedAt, "MMM dd, yyyy 'at' HH:mm")}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          {isManagerOrAdmin && (
            <Card>
              <CardHeader>
                <CardTitle>
                  <h3>Quick Actions</h3>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-col gap-2">
                  <Dialog
                    open={!!openAddTeamMember}
                    onOpenChange={setOpenAddTeamMember}
                  >
                    {addMemberToTeamButton}
                    <DialogContent className=" !max-w-2xl max-h-[80vh] md:max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Allocate Teams to Project</DialogTitle>
                        <DialogDescription>
                          Select teams from different domains to assign to this
                          project
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4">
                        {/* Domain Filter */}
                        <div className="space-y-2">
                          <Label>Filter by Domain</Label>
                          <Select
                            value={domainFilter}
                            onValueChange={setDomainFilter}
                          >
                            <SelectTrigger className="w-full text-start text-sm !outline-1 outline-border py-1.5 px-2 rounded">
                              <SelectValue placeholder="Select domain" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Domains</SelectItem>
                              {availableDomains.map((domain) => (
                                <SelectItem key={domain} value={domain}>
                                  {domain}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Available Teams */}
                        <div className="space-y-3">
                          <Label>Available Teams {availableUsers.length}</Label>
                          {availableUsers.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                              <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                              <p>No users available for allocation</p>
                              {domainFilter !== "all" && (
                                <p className="text-sm">
                                  Try changing the domain filter
                                </p>
                              )}
                            </div>
                          )}
                          <div className="grid gap-3 max-h-60 overflow-y-auto">
                            {filteredAvailableusers.map((user) => (
                              <div
                                key={user._id}
                                className="flex items-start space-x-3 p-3 border rounded hover:bg-gray-50 dark:hover:bg-zinc-800/20"
                              >
                                <Checkbox
                                  id={user._id}
                                  checked={selectedUsers.includes(user._id)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedUsers([
                                        ...selectedUsers,
                                        user._id,
                                      ]);
                                    } else {
                                      setSelectedUsers(
                                        selectedUsers.filter(
                                          (sUser) => sUser !== user._id
                                        )
                                      );
                                    }
                                  }}
                                />
                                <div className="flex-1 space-y-2">
                                  <div className="flex items-center justify-between">
                                    <Label htmlFor={user._id}>
                                      <h4 className="font-medium text-sm">
                                        {user.name}
                                      </h4>
                                    </Label>
                                    <Badge variant="outline">
                                      {user.domain}
                                    </Badge>
                                  </div>
                                  {/* <p className="text-sm text-muted-foreground">
                            {user.description}
                          </p> */}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Selected Teams Summary */}
                        <div className="p-3 bg-gray-50 border border-input dark:bg-zinc-800/20 rounded">
                          <p className="text-sm font-normal text-primary/80">
                            {selectedUsers.length} user(s) selected for
                            allocation
                          </p>
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                          <Button
                            variant="outline"
                            onClick={() => setOpenAddTeamMember(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            disabled={selectedUsers.length === 0}
                            onClick={handleUserAllocation}
                          >
                            {allocatingTeam ? (
                              <>
                                <Loader /> Wait
                              </>
                            ) : (
                              "Allocate Selected Teams"
                            )}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <>
                    <ReusableDialog
                      className="sm:!max-w-[35rem]  max-h-[50vh] md:max-h-[90vh] overflow-y-auto"
                      children={<AssignTaskForm project={project} />}
                      trigger={assignTaskButton}
                    />
                    {/* Status Update Dialog */}
                    <Dialog
                      open={isStatusDialogOpen}
                      onOpenChange={setIsStatusDialogOpen}
                    >
                      {udpateStatusButton}
                      <DialogContent className="!max-w-sm px-4 md:px-6">
                        <DialogHeader>
                          <DialogTitle>Update Project Status</DialogTitle>
                          <DialogDescription>
                            Change the current status of this project
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Current Status</Label>
                            <div className="flex items-center gap-2 p-2 border rounded">
                              <StatusIcon className="w-4 h-4" />
                              <span className="capitalize">
                                {project.status.replace("-", " ")}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>New Status</Label>
                            <Select
                              value={newStatus!}
                              onValueChange={(value: ProjectStatus) =>
                                setNewStatus(value)
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="planning">
                                  Planning
                                </SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="on_hold">On Hold</SelectItem>
                                <SelectItem value="completed">
                                  Completed
                                </SelectItem>
                                <SelectItem value="cancelled">
                                  Cancelled
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex justify-end gap-2 pt-4">
                            <Button
                              variant="outline"
                              onClick={() => setIsStatusDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleStatusUpdate}
                              disabled={newStatus === project.status}
                            >
                              {updatingStatus ? (
                                <>
                                  <Loader /> Wait
                                </>
                              ) : (
                                " Update Status"
                              )}
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    {/* Due Date Update Dialog */}
                    <Dialog
                      open={isDateDialogOpen}
                      onOpenChange={setIsDateDialogOpen}
                    >
                      {updateDueDateButton}
                      <DialogContent className="!max-w-sm px-4 md:px-6">
                        <DialogHeader>
                          <DialogTitle>Update Due Date</DialogTitle>
                          <DialogDescription>
                            Change the project's end date
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Current Due Date</Label>
                            <div className="flex items-center gap-2 p-2 border rounded">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {format(project.endDate, "MMM dd, yyyy")}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <DatePicker
                              label="New Due Date"
                              defaultValue={newEndDate}
                              onDateChange={(date) =>
                                setNewEndDate(date.toISOString())
                              }
                            />
                          </div>
                          <div className="flex justify-end gap-2 pt-4">
                            <Button
                              variant="outline"
                              onClick={() => setIsDateDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleDateUpdate}
                              disabled={
                                new Date(newEndDate).getTime() ===
                                new Date(project.endDate).getTime()
                              }
                            >
                              {updatingEndDate ? (
                                <>
                                  <Loader /> Wait
                                </>
                              ) : (
                                "Update Due Date"
                              )}
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </>

                  <ReusableDialog
                    className="sm:!max-w-[35rem] max-h-[80vh] md:max-h-[90vh] overflow-y-auto"
                    children={<h1>Project Edit Form</h1>}
                    trigger={editProjectButton}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export { ProjectDetails };

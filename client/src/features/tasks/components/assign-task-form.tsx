import { DatePicker } from "@/components/date-picker";
import { FormItem } from "@/components/form/form-item";
import { SortFilterSelect } from "@/components/sort-filter-select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Priority, Project, TaskType } from "@/types";
import { taskPriorityOptions, taskTypeOptions } from "@/utils/constants";
import { format } from "date-fns";
import { Loader, Plus, Target, X } from "lucide-react";
import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/features/auth/hooks/use-user";
import { Spinner } from "@/components/spinner";
import type { AssignTaskPayload } from "@/api/task-service";
import { useAssignTask } from "../hooks/use-assign-task";

const initialState: AssignTaskPayload = {
  title: "",
  description: "",
  type: "feature",
  priority: "medium",
  tags: [],
  estimatedTime: "",
  dueDate: format(new Date(), "dd MM yyyy"),
  assignee: "",
  project: "",
};

type AssignTaskFormProps = {
  project: Project;
  onClose?: () => void;
};
export const AssignTaskForm = ({ project, onClose }: AssignTaskFormProps) => {
  const [formData, setFormData] = useState(initialState);
  const [newTag, setNewTag] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { user, loadingUser } = useUser();
  const { assignTask, assigningTask } = useAssignTask(project._id);

  if (!user || loadingUser) return <Spinner />;
  const projectTeamMembers = project.members;

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !selectedTags.includes(newTag.trim())) {
      const updatedTags = [...selectedTags, newTag.trim()];
      setSelectedTags(updatedTags);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = selectedTags.filter((tag) => tag !== tagToRemove);
    setSelectedTags(updatedTags);
  };

  const handleKeyPress = (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newTask = {
      ...formData,
      tags: selectedTags,
      project: project._id,
    } satisfies AssignTaskPayload as AssignTaskPayload;

    assignTask(newTask, {
      onSettled: () => {
        onClose?.();
      },
    });
  };

  return (
    <Card className="w-full shadow-none border-none py-6 ">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Target className="w-6 h-6" />
          Assign New Task
        </CardTitle>
        <CardDescription>
          Create and assign a task to a team member.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormItem
            name="title"
            label="Task Title"
            value={formData.title}
            onChange={handleOnChange}
            placeholder="Fix login fail..."
          />
          <FormItem
            name="description"
            label="Description"
            textarea
            value={formData.description}
            onChange={handleOnChange}
            placeholder="Describe the task objectives..."
          />

          <div className="space-y-1.5">
            <Label>Select assignee</Label>
            <Select
              value={formData.assignee!}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, assignee: value }))
              }
            >
              <SelectTrigger className="w-full text-start text-sm !outline-1 outline-border py-1.5 px-2 rounded">
                <SelectValue placeholder="Choose target user" />
              </SelectTrigger>
              <SelectContent>
                {projectTeamMembers?.map((member) => (
                  <SelectItem key={member._id} value={member._id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 *:w-full">
            <SortFilterSelect
              className="w-full"
              label="Set Priority"
              value={formData.priority}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  priority: value as Priority,
                }))
              }
              options={taskPriorityOptions}
            />
            <SortFilterSelect
              className="w-full"
              label="Select type"
              value={formData.type}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, type: value as TaskType }))
              }
              options={taskTypeOptions}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DatePicker
              label="Due Date"
              defaultValue={format(formData.dueDate!, "d MM yyyy")}
              onDateChange={(date) =>
                setFormData((prev) => ({
                  ...prev,
                  dueDate: date.toISOString(),
                }))
              }
            />
            <FormItem
              label="Estimated Time"
              value={formData.estimatedTime}
              onChange={handleOnChange}
              name="estimatedTime"
            />
          </div>

          <div className="space-y-1">
            <div className="flex gap-2 items-center">
              <div className="w-full">
                <FormItem
                  required={false}
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  label="Tags"
                  name="tags"
                  placeholder="Add a tag..."
                  onKeyPress={handleKeyPress}
                />
              </div>
              <Button
                type="button"
                onClick={addTag}
                variant="outline"
                className="translate-y-2.5"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className=" p-0 w-4 h-4"
                      onClick={() => removeTag(tag)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {assigningTask ? (
                <>
                  <Loader /> Wait
                </>
              ) : (
                "Assign Task"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

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
import { useAppDispatch } from "@/store/hooks";
import type { Priority, Task, TaskType } from "@/types";
import { taskPriorityOptions, taskTypeOptions } from "@/utils/constants";
import { format } from "date-fns";
import { Plus, Target, X } from "lucide-react";
import {
  useId,
  useState,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { addTask } from "../task-slice";
import { useUser } from "@/features/auth/hooks/use-user";

const initialState: Omit<Task, "id" | "createdAt" | "updatedAt" | "status"> = {
  title: "",
  description: "",
  assignee: null,
  project: null,
  isPersonal: true,
  type: "feature",
  priority: "medium",
  dueDate: null,
  tags: [],
  estimatedTime: "",
  createdBy: "",
};

type CreateTaskFormProps = {
  onClose?: () => void;
};

export const CreateTaskForm = ({ onClose }: CreateTaskFormProps) => {
  const id = useId();
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { user } = useUser();

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
    setLoading(true);
    const newTask: Task = {
      id: `task-${Math.floor(Math.random() * 2919)}-${id}`,
      ...formData,
      status: "todo",
      tags: selectedTags,
      createdBy: user?.user_metadata.userName, // this'll be current user
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch(addTask({ task: newTask }));

    onClose?.();
  };
  return (
    <Card className="w-full shadow-none border-none py-6">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Target className="w-6 h-6" />
          Create New Task
        </CardTitle>
        <CardDescription>
          Fill in the details below to create a new task.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormItem
            name="title"
            label="Title"
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
              label="estimatedTime"
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

          {/* Form Actions */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => onClose?.()}>
              Cancel
            </Button>
            <Button type="submit">{loading ? "Wait..." : "Create Task"}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

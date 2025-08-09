import { DatePicker } from "@/components/date-picker";
import { FormItem } from "@/components/form/form-item";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/types";
import { Plus, Target, X } from "lucide-react";
import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import type { NewProjectPayload } from "@/api/project-service";
import { useCreateProject } from "../hooks/use-create-project";

const initialState: Pick<
  Project,
  "name" | "description" | "budget" | "spent" | "startDate" | "endDate" | "tags"
> = {
  name: "",
  description: "",
  budget: 0,
  spent: 0,
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  tags: [],
};

type CreateProjectFormProps = {
  onClose?: () => void;
};

export const CreateProjectForm = ({ onClose }: CreateProjectFormProps) => {
  const [formData, setFormData] = useState(initialState);
  const [newTag, setNewTag] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { createProject, creatingProject } = useCreateProject();

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
      e.stopPropagation();
      addTag();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newProject: NewProjectPayload = {
      ...formData,
      tags: selectedTags,
    };
    createProject(newProject, {
      onSettled: () => {
        setFormData(initialState);
        onClose?.();
      },
    });
  };

  return (
    <Card className="w-full shadow-none border-none py-6 ">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Target className="w-6 h-6" />
          Create New Project
        </CardTitle>
        <CardDescription>
          Fill in the details below to create a new project.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5 ">
          <FormItem
            name="name"
            label="Project Name"
            value={formData.name}
            onChange={handleOnChange}
            placeholder="Mobile booking app..."
          />
          <FormItem
            name="description"
            label="Description"
            textarea
            value={formData.description}
            onChange={handleOnChange}
            placeholder="Describe the project objectives, scope, and key deliverables..."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormItem
              name="budget"
              label="Total Budget ($)"
              value={formData.budget.toString()}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, budget: +e.target.value }))
              }
              placeholder="Total allocated budget for the project"
              type="number"
            />

            <FormItem
              name="spent"
              label="Amount Spent ($)"
              value={formData.spent.toString()}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, spent: +e.target.value }))
              }
              placeholder="Amount already spent on the project"
              type="number"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <DatePicker
              label="Start Date"
              defaultValue={formData.startDate!}
              onDateChange={(date) =>
                setFormData((prev) => ({
                  ...prev,
                  startDate: date.toISOString()!,
                }))
              }
            />
            <DatePicker
              defaultValue={formData.endDate!}
              label="End Date"
              onDateChange={(date) =>
                setFormData((prev) => ({
                  ...prev,
                  endDate: date.toISOString()!,
                }))
              }
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
          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => onClose?.()}>
              Cancel
            </Button>
            <Button type="submit">
              {creatingProject ? "Wait..." : "Create Project"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

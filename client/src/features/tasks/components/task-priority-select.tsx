import { SortFilterSelect } from "@/components/sort-filter-select";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { applyTaskFilters } from "../task-slice";
import type { Priority } from "@/types";

const priorityOptions = [
  { label: "All Priority", value: "all" },
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
  { label: "Urgent", value: "urgent" },
];

export const TaskPrioritySelect = () => {
  const priority = useAppSelector((state) => state.tasks.taskFilters.priority);
  const dispatch = useAppDispatch();
  const onPriorityChange = (value: string) => {
    dispatch(applyTaskFilters({ priority: value as Priority }));
  };

  return (
    <SortFilterSelect
      className="w-full"
      options={priorityOptions}
      value={priority}
      onValueChange={onPriorityChange}
    />
  );
};

import { SortFilterSelect } from "@/components/sort-filter-select";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { applyTaskFilters } from "../task-slice";
import type { TaskStatus } from "@/types";

const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Todo", value: "todo" },
  { label: "In-Progress", value: "progress" },
  { label: "Review", value: "review" },
  { label: "Done", value: "done" },
  { label: "Overdue", value: "overdue" },
];

export const TaskStatusSelect = () => {
  const status = useAppSelector((state) => state.tasks.taskFilters.status);
  const dispatch = useAppDispatch();
  const onStatusChange = (value: string) => {
    dispatch(applyTaskFilters({ status: value as TaskStatus }));
  };

  return (
    <SortFilterSelect
      className="w-full"
      options={statusOptions}
      value={status}
      onValueChange={onStatusChange}
    />
  );
};

import { SortFilterSelect } from "@/components/sort-filter-select";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { ProjectStatus } from "@/types";
import { applyProjectFilters } from "../project-slice";

const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Planning", value: "planning" },
  { label: "Active", value: "active" },
  { label: "On-Hold", value: "on-hold" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export const ProjectStatusSelect = () => {
  const status = useAppSelector(
    (state) => state.projects.projectFilters.status
  );
  const dispatch = useAppDispatch();
  const onStatusChange = (value: string) => {
    dispatch(applyProjectFilters({ status: value as ProjectStatus }));
  };

  return (
    <SortFilterSelect
      className="!w-full"
      options={statusOptions}
      value={status}
      onValueChange={onStatusChange}
    />
  );
};

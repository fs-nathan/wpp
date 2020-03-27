import { useEffect, useMemo } from "react";
import { useList } from "react-use";
import { taskPriorityMap, taskStatusMap } from "../contants/attrs";
export const useCustomList = ({
  tasks,
  isToggleSortName,
  statusFilter,
  keyword = ""
}) => {
  const [
    list,
    {
      set,
      push,
      updateAt,
      insertAt,
      update,
      updateFirst,
      upsert,
      sort,
      filter,
      removeAt,
      clear,
      reset
    }
  ] = useList(tasks);
  const sortMemo = useMemo(
    () => (a, b) =>
      !isToggleSortName
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name),
    [isToggleSortName]
  );
  const filterStatusMemo = useMemo(
    () => item =>
      ["waiting", "doing", "complete", "expired", "stop"]
        .map(key => statusFilter[key] && taskStatusMap[key])
        .find(value => item.status_code == value) &&
      ["priority_hight", "priority_medium", "priority_low"]
        .map(key => statusFilter[key] && taskPriorityMap[key])
        .find(key => true || item.priority_code == key),
    [statusFilter]
  );
  const filterKeyWordMemo = useMemo(
    () => item => item.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1,
    [keyword]
  );
  useEffect(() => {
    set(tasks);
    sort(sortMemo);
    if (Object.values(statusFilter).filter(item => item).length) {
      filter(item => filterStatusMemo(item) && filterKeyWordMemo(item));
    }
  }, [
    filter,
    filterKeyWordMemo,
    filterStatusMemo,
    isToggleSortName,
    set,
    sort,
    sortMemo,
    statusFilter,
    tasks
  ]);
  return [
    list,
    {
      set,
      push,
      updateAt,
      insertAt,
      update,
      updateFirst,
      upsert,
      sort,
      filter,
      removeAt,
      clear,
      reset
    }
  ];
};

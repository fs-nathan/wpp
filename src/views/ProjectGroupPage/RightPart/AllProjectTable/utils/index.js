import moment from "moment";

export const _sortByDescGroupTable = (data = [], key = null) => {
  let result = [...data];

  switch (key) {
    case "name":
      result = result.sort((a, b) => b["name"].localeCompare(a["name"]));
      break;
    case "label":
      result = result.sort((a, b) => {
        const labelA = a?.project_label?.name || "";
        const labelB = b?.project_label?.name || "";
        return labelB.localeCompare(labelA);
      });
      break;
    case "progress":
      result = result.sort((a, b) => {
        const currentDay = moment().startOf("day");
        const startDateA = moment(a.date_start, "DD/MM/YYYY");
        const delayDayA = currentDay.diff(startDateA, "days") || 0;
        const startDateB = moment(b.date_start, "DD/MM/YYYY");
        const delayDayB = currentDay.diff(startDateB, "days") || 0;
        return parseFloat(delayDayB) - parseFloat(delayDayA);
      });
      break;
    case "start_date":
      result = result.sort((a, b) => {
        const startDateA = moment(a.date_start, "DD/MM/YYYY").unix();
        const startDateB = moment(b.date_start, "DD/MM/YYYY").unix();
        return parseFloat(startDateB) - parseFloat(startDateA);
      });
      break;
    case "end_date":
      result = result.sort((a, b) => {
        const startDateA = moment(a.date_end, "DD/MM/YYYY").unix();
        const startDateB = moment(b.date_end, "DD/MM/YYYY").unix();
        return parseFloat(startDateB) - parseFloat(startDateA);
      });
      break;
    case "count_task":
      result = result.sort(
        (a, b) =>
          parseFloat(b?.statistic?.total_task || 0) -
          parseFloat(a?.statistic?.total_task || 0)
      );
      break;
    case "completed":
      result = result.sort(
        (a, b) => parseFloat(b.complete || 0) - parseFloat(a.complete || 0)
      );
      break;
    case "priority":
      result = result.sort((a, b) => b.priority_code - a.priority_code);
      break;
    case "members":
      result = result.sort((a, b) => b.members.length - a.members.length);
      break;
    default:
      break;
  }

  return result;
};

export const _sortByAscGroupTable = (data = [], key = null) => {
  let result = [...data];

  switch (key) {
    case "name":
      result = result.sort((a, b) => a["name"].localeCompare(b["name"]));
      break;
    case "label":
      result = result.sort((a, b) => {
        const labelA = a?.project_label?.name || "";
        const labelB = b?.project_label?.name || "";
        return labelA.localeCompare(labelB);
      });
      break;
    case "progress":
      result = result.sort((a, b) => {
        const currentDay = moment().startOf("day");
        const startDateA = moment(a.date_start, "DD/MM/YYYY");
        const delayDayA = currentDay.diff(startDateA, "days") || 0;
        const startDateB = moment(b.date_start, "DD/MM/YYYY");
        const delayDayB = currentDay.diff(startDateB, "days") || 0;
        return parseFloat(delayDayA) - parseFloat(delayDayB);
      });
      break;
    case "start_date":
      result = result.sort((a, b) => {
        const startDateA = moment(a.date_start, "DD/MM/YYYY").unix();
        const startDateB = moment(b.date_start, "DD/MM/YYYY").unix();
        return parseFloat(startDateA) - parseFloat(startDateB);
      });
      break;
    case "end_date":
      result = result.sort((a, b) => {
        const startDateA = moment(a.date_end, "DD/MM/YYYY").unix();
        const startDateB = moment(b.date_end, "DD/MM/YYYY").unix();
        return parseFloat(startDateA) - parseFloat(startDateB);
      });
      break;
    case "count_task":
      result = result.sort(
        (a, b) =>
          parseFloat(a?.statistic?.total_task || 0) -
          parseFloat(b?.statistic?.total_task || 0)
      );
      break;
    case "completed":
      result = result.sort(
        (a, b) => parseFloat(a.complete || 0) - parseFloat(b.complete || 0)
      );
      break;
    case "priority":
      result = result.sort((a, b) => a.priority_code - b.priority_code);
      break;
    case "members":
      result = result.sort((a, b) => a.members.length - b.members.length);
      break;
    default:
      break;
  }

  return result;
};

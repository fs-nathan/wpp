import moment from "moment";
import { get } from ".";

export const formatTime = (timeRange, string) =>
  get(timeRange, string)
    ? moment(get(timeRange, string)).format("YYYY-MM-DD")
    : undefined;

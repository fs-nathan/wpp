import moment from "moment";

export const formatTime = time =>
  time ? moment(time).format("YYYY-MM-DD") : undefined;

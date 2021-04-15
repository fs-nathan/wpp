import {WORKPLACE_TYPES} from "../../constants/constants";
import * as images from "../../assets";

export const resolvedWorkType = (type) => {
  switch (type) {
    case WORKPLACE_TYPES.JOB: return images.check_64;
    case WORKPLACE_TYPES.PROJECT: return images.speed_64;
    case WORKPLACE_TYPES.PROCESS: return images.workfollow_64;
    default: return images.speed_64;
  }
}

export function decodePriorityCode(priorityCode) {
  switch (priorityCode) {
    case 0:
      return {
        color: '#4caf50',
        background: '#4caf5042',
      };
    case 1:
      return {
        color: '#ff9800',
        background: '#ff980038',
      };
    case 2:
      return {
        color: '#fe0707',
        background: '#ff050524',
      };
    default:
      return {
        color: '#53d7fc',
      };
  }
}
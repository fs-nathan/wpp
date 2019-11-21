const DEFAULT_MAX_LENGTH = 120
export const isLongerContent = str => str.length > DEFAULT_MAX_LENGTH
export const getCollapseText = str => isLongerContent(str) ? str.substring(0, DEFAULT_MAX_LENGTH - 3) + "..." : str
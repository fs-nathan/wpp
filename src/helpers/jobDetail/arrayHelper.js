const TASK_STATUS = {
    DEFAULT: 0,
    COMPLETED: 1
}

export const filterUncompleteSubTask = subTasks => subTasks.filter(task => task.status === TASK_STATUS.DEFAULT)
export const filterCompleteSubTask = subTasks => subTasks.filter(task => task.status === TASK_STATUS.COMPLETED)

const CM_DC_TYPE = {
    DECISION: 0,
    COMMAND: 1,
}
export const filterCommandItem = arr => arr.filter(item => item.type === CM_DC_TYPE.COMMAND)
export const filterDecisionItem = arr => arr.filter(item => item.type === CM_DC_TYPE.DECISION)
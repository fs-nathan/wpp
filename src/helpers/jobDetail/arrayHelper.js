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

const OFFER_STATUS = {
    PENDING: 0,
    APPROVED: 1,
}

export const filterPendingItem = arr => arr.filter(item => item.type === OFFER_STATUS.PENDING)
export const filterApprovedItem = arr => arr.filter(item => item.type === OFFER_STATUS.APPROVED)

const REMIND_TYPE = {
    TIME: 0,
    SCHEDULE: 1,
}

export const filterRemindTime = arr => arr.filter(item => item.type === REMIND_TYPE.TIME)
export const filterRemindSchedule = arr => arr.filter(item => item.type === REMIND_TYPE.SCHEDULE)

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

export const filterPendingItem = arr => arr.filter(item => item.status === OFFER_STATUS.PENDING)
export const filterApprovedItem = arr => arr.filter(item => item.status === OFFER_STATUS.APPROVED)

export const DEFAULT_OFFER_ITEM = { offer_id: "", content: "", user_hander: [], files: [] }

// Remove duplicate user (by their id)
export const getIndividualHandleUsers =
    arr => arr.reduce((prev, next) => prev.find(item => item.id === next.id) ? prev : [...prev, next], [])

export const filterTaskByType = (groups, idx) => {
    return idx === 0
        ? groups
        : groups.map(item => ({ ...item, tasks: item.tasks.filter(task => task.status_code == idx - 1) }))
}

export const searchTaskByTaskName = (groups, keyword) => {
    return keyword
        ? groups.map(item => ({ ...item, tasks: item.tasks.filter(task => task.name.match(keyword)) }))
        : groups
}

// let test=[]
// let list = Arr.map(item=>{
//   item.images.map(testhh=>{
//     test.push(testhh)
//   })
// })

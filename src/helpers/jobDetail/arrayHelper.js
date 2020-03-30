const TASK_STATUS = {
    DEFAULT: 0,
    COMPLETED: 1
}

export const CHAT_TYPE = {
    REMIND_TASK: 0,
    IMAGE: 1,
    FILE: 2,
    TEXT: 3
}

export const isNotifyText = chatType => {
    return chatType !== CHAT_TYPE.REMIND_TASK
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
    APPROVED: 0,
    PENDING: 1,
}

export const filterPendingItem = arr => arr.filter(item => item.status === OFFER_STATUS.PENDING)
export const filterApprovedItem = arr => arr.filter(item => item.status === OFFER_STATUS.APPROVED)

export const DEFAULT_OFFER_ITEM = {
    offer_id: "", content: "", user_hander: [],
    files: [], priority: 0, offer_group_id: null,
}

// Remove duplicate user (by their id)
export const getIndividualHandleUsers =
    (arr = []) => arr.reduce((prev, next) => prev.find(item => item.id === next.id) ? prev : [...prev, next], [])

export const filterTaskByType = (groups, idx) => {
    return idx === 0
        ? groups
        : groups.map(item => ({ ...item, tasks: item.tasks.filter(task => Number(task.status_code) === idx - 1) }))
}

export const searchTaskByTaskName = (groups, keyword) => {
    const filteredGroup = groups.filter(({ tasks }) => tasks.length);
    return keyword
        ? filteredGroup.map(item => ({
            ...item,
            tasks: item.tasks.filter(task => task.name.toLowerCase().match(keyword.toLowerCase()))
        }))
        : groups
}
export const searchProjectByProjectName = (groups, keyword) => {
    return keyword
        ? groups
            .filter(group => group.projects.length)
            .map(item => ({ ...item, projects: item.projects.filter(project => project.name.toLowerCase().match(keyword.toLowerCase())) }))
        : groups
}

export const searchArrayTabpart = (array, keyword, field) => {
    return keyword
        ? array.filter(item => item[field].toLowerCase().match(keyword.toLowerCase()))
        : array
}
export const searchAttributesArray = (array, keyword, field, object) => {
    return keyword
        ? array
            .filter(item => item[object].length)
            .map(item => ({ ...item, [object]: item[object].filter(item => item[field].toLowerCase().match(keyword.toLowerCase())) }))
        : array
}
export const getFirstProjectDetail = projectGroups => {
    let projectDetail
    try {
        projectDetail = projectGroups.find(project => project.projects.length).projects[0] || {}
    } catch {
        projectDetail = {}
    }
    return projectDetail
}
export const getFirstTaskId = payload => {
    let taskId
    try {
        taskId = payload.tasks[0].tasks[0].id
    } catch {
        taskId = ""
    }
    return taskId
}
const TASK_STATUS = {
    DEFAULT: 0,
    COMPLETED: 1
}

export const CHAT_TYPE = {
    TEXT: 0,
    FILE: 1,
    IMAGE: 2,
    UPDATE_TASK_NAME: 3,
    UPDATE_DURATION: 4,
    CREATE_NEW_SUB_TASK: 5,
    DELETE_SUB_TASK: 6,
    CREATE_REMIND: 7,
    DELETE_REMIND: 8,
    SHARE_LOCATION: 9,
    CREATE_OFFER: 10,
    DELETE_OFFER: 11,
    HANDLE_OFFER: 12,
    CREATE_COMMAND_DECIDED: 13,
    DELETE_COMMAND_DECIDED: 14,
    ADD_NEW_MEMBER: 15,
    REMOVE_MEMBER: 16,
    HANDLE_REMIND: 17,
    SHARE_FILE: 18,
    EDIT_PRIORITY: 19,
    EXTEND_TIME: 20,
    UPDATE_COMPLETE: 21,
    COMPLETE_SUBTASK: 22,
    DELETE_FILE: 23,
    PIN_TASK: 24,
    CANCEL_PIN_TASK: 25,
    STOP_TASK: 26,
    CANCEL_STOP_TASK: 27,
    PIN_REMIND: 28,
    CANCEL_PIN_REMIND: 29,
    CHAT_STICKER: 30,
    CHAT_FORWARD_FILE: 31,
    QUICK_LIKE: 32,
    UPDATE_GROUP_TASK: 33,
    UPDATE_TYPE_ASSIGN_TASK: 34,
    UPDATE_SCHEDULE_TASK: 35,
    DELETE_SHARE_LOCATION: 36,
    UPDATE_SUBTASK: 37,
    UPDATE_REMIND: 38,
    UPDATE_OFFER: 39,
    UPDATE_COMMAND_DECIDED: 40,
    UPDATE_ROLE_MEMBER: 41,
    HANDLE_REMIND_WITH_DURATION: 42,
    CREATE_REMIND_WITH_DURATION: 43,
    DELETE_OFFER_HANDLE: 44,
    CHAT_FILE_FROM_GOOGLE_DRIVER: 45,
    UPLOADING_IMAGES: 101,
    UPLOADING_FILE: 102,
    DATE_TIME_CHAT_HISTORY: 202,
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

export const filterNoGroupTaskByType = (tasks, idx) => {
    return idx === 0
        ? tasks
        : tasks.filter(task => Number(task.status_code) === idx - 1)
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

export const searchNoGroupTaskByName = (tasks, keyword) => {
    return keyword
        ? tasks.filter(task => task.name.toLowerCase().match(keyword.toLowerCase()))
        : tasks
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

export function getFileUrl(file) {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            // Closure to capture the file information.
            reader.onload = function (e) {
                resolve(e.target.result)
            };
            // Read in the image file as a data URL.
            reader.readAsDataURL(file);
        } catch (error) {
            reject(error)
        }
    })
}

export function isOneOf(value, list = []) {
    return list.indexOf(value) !== -1;
}

export function findTask(listTaskDetail, task_id) {
    let ret;
    listTaskDetail.forEach(group => {
        const { tasks } = group;
        tasks.forEach(task => {
            if (task.id === task_id) {
                ret = task
            }
        })
    })
    return ret
}

export const filterMembersByKey = (members, keyword) => {
    return keyword
        ? members.filter(member => member.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1)
        : members
}
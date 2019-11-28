const DEFAULT_MAX_LENGTH = 120
export const isLongerContent = str => str.length > DEFAULT_MAX_LENGTH
export const getCollapseText = str => isLongerContent(str) ? str.substring(0, DEFAULT_MAX_LENGTH - 3) + "..." : str

export const REMIND_TIME_TYPE = 0
export const REMIND_SCHEDULE_TYPE = 0
export const REMINDER_PROGRESS = []
export const DEFAULT_DATE_TEXT = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
export const DEFAULT_TIME_TEXT = `00:00`

export const convertDateToText = date => {
    try {
        let dateArr = date.split("-")
        return `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`
    } catch {
        let today = new Date()
        return `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`
    }
}

export const isValidDuration = durationText => {
    try {
        let number = parseInt(durationText)
        return number >= 0 && number <= 100
    } catch {
        return false
    }
}
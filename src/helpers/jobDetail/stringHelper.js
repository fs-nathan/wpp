import format from 'date-fns/format';

const DEFAULT_MAX_LENGTH = 120
export const isLongerContent = str => str.length > DEFAULT_MAX_LENGTH
export const getCollapseText = str => isLongerContent(str) ? str.substring(0, DEFAULT_MAX_LENGTH - 3) + "..." : str

export const REMIND_TIME_TYPE = 0
export const REMIND_SCHEDULE_TYPE = 0
export const REMINDER_PROGRESS = []
export const EMPTY_STRING = ''
export const DEFAULT_DATE_TEXT = 
    `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, "0")}-${(new Date().getDate()).toString().padStart(2, "0")}`
export const DEFAULT_TIME_TEXT = `00:00`
export const DEFAULT_START_TIME_TEXT = '08:00'
export const DEFAULT_END_TIME_TEXT = '17:00'
export const DEFAULT_GROUP_TASK_VALUE = "default"

export const convertDateToText = date => {
    try {
        let dateArr = date.split("-")
        return `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`
    } catch {
        let today = new Date()
        return `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`
    }
}

export const convertTime = inputFormat => {
    const d = new Date(inputFormat)
    return format(d, 'HH:mm');
  }

export const   convertDate= inputFormat => {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join('-')
  }

export const isValidDuration = durationText => {
    try {
        let number = parseInt(durationText)
        return number >= 0 && number <= 100
    } catch {
        return false
    }
}

export const convertDateToJSFormat = date => {
    try {
        let dateArr = date.split("/")
        return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`
    } catch {
        let today = new Date()
        return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    }
}

export const isExpiredDate = date => {
    return new Date(convertDateToJSFormat(date)) - new Date() > 0

}
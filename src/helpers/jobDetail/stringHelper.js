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

export const convertDate = inputFormat => {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-')
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

export function humanFileSize(bytes, si) {
    var thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    // : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
}

// const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
const urlRegex = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

export const replaceMultipleReg = (str = '', regex, replacer) => {
    let match;
    let lastEnd = 0, ret = '';
    while (match = regex.exec(str)) {
        // console.log(match.index + ':' + match[0] + '::' + urlRegex.lastIndex);
        ret += str.slice(lastEnd, match.index) + replacer(match[0])
        lastEnd = urlRegex.lastIndex;
    }
    return ret + str.slice(lastEnd);
}

export function replaceUrl(str) {
    const replacer = match => {
        const url = match.indexOf('http') !== -1 ? match : `http://${match}`
        return `<a href="${url}" target="_blank">${match}</a>`
    }
    return replaceMultipleReg(str, urlRegex, replacer)
}

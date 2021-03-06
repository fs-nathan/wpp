import format from 'date-fns/format';
import parse from 'date-fns/parse';
import differenceInMinutes from 'date-fns/differenceInMinutes'

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

function pad(s) { return (s < 10) ? '0' + s : s; }
export const convertDate = inputFormat => {
  var d = new Date(inputFormat)
  return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-')
}

export const convertDateByFormat = (inputFormat, formatDate) => {
  const fixedFormat = formatDate.replace('DD', 'dd').replace('YYYY', 'yyyy')
  var d = parse(inputFormat, fixedFormat, new Date())
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
  if (!bytes) return undefined;
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
const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;
const regex1 = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
const regex2 = new RegExp(/(http(s)?:\/\/.)?(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g)
// const urlRegex = new RegExp(regex1.source + "|" + regex2.source);
// const urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|(http(s)?:\/\/.)?(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export const replaceMultipleReg = (str = '', regex, replacer) => {
  let match;
  let lastEnd = 0, ret = '';
  while (match = regex.exec(str)) {
    // console.log(match.index + '_' + match[0] + '__' + urlRegex.lastIndex);
    ret += str.slice(lastEnd, match.index) + replacer(match[0])
    lastEnd = regex.lastIndex;
  }
  return ret + str.slice(lastEnd);
}

export function normalizeUrl(match) {
  const url = match.indexOf('http') !== -1 ? match : `http://${match}`
  return url
}

export function replaceUrl(str) {
  const replacer = match => {
    const url = match.indexOf('http') !== -1 ? match : `http://${match}`
    return `<a href="${url}" target="_blank">${match}</a>`
  }
  const withDomain = replaceMultipleReg(str, regex1, replacer)
  return replaceMultipleReg(withDomain, regex2, replacer)
}

export function getDialogDate(t, timeString, formatDate = '') {
  try {
    const date = new Date(timeString);
    const fixedFormat = formatDate.replace('DD', 'dd').replace('YYYY', 'yyyy')
    return t('LABEL_CHAT_TASK_LUC_TIME_NGAY_DATE', { time: format(date, 'HH:mm'), date: format(date, fixedFormat) });
  } catch (e) {
    return timeString;
  }
}

export function getUpdateProgressDate(timeString, formatDate = '') {
  try {
    const date = new Date(timeString);
    const fixedFormat = formatDate.replace('DD', 'dd').replace('YYYY', 'yyyy')
    return format(date, `HH:mm ${fixedFormat}`);
  } catch (e) {
    return timeString;
  }
}

export function getChatDate(timeString) {
  const date = timeString ? new Date(timeString) : new Date();
  return format(date, `dd/MM/yyyy`);
}

export function compareDateTime(timeStartString, timeEndString) {
  // console.log(timeStartString, timeEndString)
  const dateStart = parse(timeStartString, 'yyyy-MM-dd HH:mm', new Date());
  const dateEnd = parse(timeEndString, 'yyyy-MM-dd HH:mm', new Date());
  return differenceInMinutes(dateStart, dateEnd);
}

export function spliceSlice(str, index, count, add) {
  // We cannot pass negative indexes directly to the 2nd slicing operation.
  if (index < 0) {
    index = str.length + index;
    if (index < 0) {
      index = 0;
    }
  }

  return str.slice(0, index) + (add || "") + str.slice(index + count);
}

export const transformGoogleDriverData = item => {
  return {
    isGoogleDocument: true,
    id: item.id,
    name: item.name || '',
    webViewLink: item.webViewLink,
    webContentLink: item.webContentLink,
    url: item.webViewLink.split('?')[0].replace('view', 'preview'),
    type: (item.mimeType === 'application/vnd.google-apps.folder') ? 'folder' : item.fileExtension,
    size: humanFileSize(item.size),
    rawSize: item.size,
    updated_at: item.modifiedTime
      ? format(new Date(item.modifiedTime), 'yyyy-MM-dd')
      : '',
    date_create: item.createdTime
      ? format(new Date(item.createdTime), 'yyyy-MM-dd')
      : '',
    user_create: {
      name: item.owners[0].displayName || '',
      avatar: item.owners[0].photoLink || ''
    }
  };
};

export function transformToGoogleFormData(ggData) {
  const { id, name, rawSize, url, webContentLink, type } = ggData;
  return {
    file_id: id,
    name,
    size: rawSize,
    url,
    url_download: webContentLink,
    file_type: type,
  }
}

export function getRichContent(content = '', tags = [], color = 'inherit') {
  if (!content) return '';
  let ret = content;
  tags.forEach(({ id, name }) => {
    let reg = new RegExp(`@${id}`, 'g');
    ret = ret.replace(reg, `<span class="TextMessage--tag" style="color: ${color};">@${name}</span>`);
  })
  // console.log(matches)
  ret = ret.replace(/\n/g, '<br/>');
  return replaceUrl(ret);
}

export function getFileType(name = '') {
  const nameSplitted = name.split('.');
  const type = nameSplitted[nameSplitted.length - 1];
  return type.toLowerCase();
}

export const convertStringAlias = (alias) => {
  var str = alias;
  str = str.toLowerCase();
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "a");
  str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "e");
  str = str.replace(/??|??|???|???|??/g, "i");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "o");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "u");
  str = str.replace(/???|??|???|???|???/g, "y");
  str = str.replace(/??/g, "d");
  return str;
}
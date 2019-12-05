import * as file from '../../assets/fileType';

export const FileType = mimeType => {
  switch (mimeType) {
    case 'aac':
    case 'ai':
    case 'asp':
    case 'avi':
    case 'bmp':
    case 'css':
    case 'dat':
    case 'dll':
    case 'doc':
    case 'docx':
    case 'dot':
    case 'dotx':
    case 'dwg':
    case 'dxf':
    case 'eps':
    case 'exe':
    case 'flv':
    case 'gif':
    case 'html':
    case 'iso':
    case 'java':
    case 'jpg':
    case 'js':
    case 'key':
    case 'mov':
    case 'mp3':
    case 'mp4':
    case 'pdf':
    case 'php':
    case 'png':
    case 'ppt':
    case 'psd':
    case 'rar':
    case 'raw':
    case 'rtf':
    case 'sql':
    case 'tgz':
    case 'txt':
    case 'vob':
    case 'wav':
    case 'xls':
    case 'xlsx':
    case 'xml':
    case 'zip':
      return file[mimeType];
    default:
      return file.def;
  }
};

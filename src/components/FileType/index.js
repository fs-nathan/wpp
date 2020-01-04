import * as file from '../../assets/fileType';

export const FileType = mimeType => {
  if (!mimeType) return file.file;
  switch (mimeType.toLowerCase()) {
    case 'doc':
    case 'docx':
      return file.word;
    case 'xls':
    case 'xlsx':
      return file.excel;
    case 'ppt':
    case 'pptx':
      return file.pp;
    case 'pdf':
      return file.pdf;
    case 'rar':
    case 'zip':
      return file.zip;
    case 'txt':
      return file.txt;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'tiff':
    case 'bmp':
    case 'svg':
    case 'psd':
      return file.image;
    case 'avi':
    case 'mkv':
    case 'asf':
    case 'wmv':
    case 'mp4':
    case 'mov':
    case '3gp':
    case 'vro':
    case 'mpg':
    case 'mpeg':
    case 'ts':
    case 'tp':
    case 'trp':
    case 'flv':
    case 'vob':
    case 'svi':
    case 'm2ts':
    case 'mts':
    case 'divx':
    case 'webm':
    case 'rmvb':
      return file.video;
    case 'mp3':
    case 'wma':
    case 'wav':
    case 'flac':
    case 'aac':
    case 'ogg':
    case 'aiff':
    case 'alac':
    case 'arm':
    case 'midi':
    case 'wma9':
      return file.audio;
    case 'folder':
    case 'application/vnd.google-apps.folder':
      return file.folder;
    default:
      return file.file;
  }
};

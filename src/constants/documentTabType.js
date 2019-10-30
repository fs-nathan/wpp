// Import google material icon
import {
    mdiClockOutline,
    mdiFolder,
    mdiDelete
} from '@mdi/js';

// Define tab information. Each tab including: 
// + id: Identity of tab (using to change active tab in order to
// change the information of right panel)
// + name: Tab header
// + icon: Path of google material icon
// + columns: List of column name in table of tab
// + columnSize: Size of each column (follow by index of columns 
// variable) in table of tab
export const RECENT_TAB = {
    id: 0,
    name: 'Tài liệu gần đây',
    icon: mdiClockOutline,
    columns: [
        'Loại', 'Tên tài liệu', 'Nơi lưu trữ', 'Ngày tạo', 
        'Người tạo', 'Kích thước'
    ],
    columnSize: [
        ''
    ],
}

export const PROJECT_DOCUMENT_TAB = {
    id: 1,
    name: 'Tài liệu dự án',
    icon: mdiFolder,
    columns: [
        '', 'Tên', 'Chủ sở hữu', 'Chia sẻ', 'Sửa đổi lần cuối',
        'Số tài liệu',
    ],
    columnSize: [
        ''
    ],
}

export const MY_SHARING_TAB = {
    id: 2,
    name: 'Đã chia sẻ',
    icon: mdiFolder,
    columns: [
        'Loại', 'Tên tài liệu', 'Ngày chia sẻ', 'Người được chia sẻ',
        'Chủ sở hữu', 'Kích thước',
    ],
    columnSize: [
        ''
    ],
}

export const OTHER_SHARING_TAB = {
    id: 3,
    name: 'Được chia sẻ',
    icon: mdiFolder,
    columns: [
        'Loại', 'Tên tài liệu', 'Ngày chia sẻ', 'Người được chia sẻ',
        'Chủ sở hữu', 'Kích thước',
    ],
    columnSize: [
        ''
    ],
}

export const MY_DOCUMENT_TAB = {
    id: 4,
    name: 'Tài liệu của tôi',
    icon: mdiFolder,
    columns: [
        '', 'Tên', 'Chủ sở hữu', 'Chia sẻ',
        'Sửa đổi lần cuối', 'Kích cỡ tệp',
    ],
    columnSize: [
        ''
    ],
}

export const GOOGLE_DRIVE_TAB = {
    id: 5,
    name: 'Google Driver',
    icon: mdiFolder,
    columns: [
        'Loại', 'Tên', 'Thời gian', 'Kích thước'
    ],
    columnSize: [

    ],
}

export const BIN_TAB = {
    id: 6,
    name: 'Thùng rác',
    icon: mdiDelete,
    columns: [
        'Loại', 'Tên tài liệu', 'Chủ sở hữu', 'Người xoá',
        'Ngày xoá', 'Xoá vĩnh viễn', 'Kích thước'
    ],
    columnSize: [

    ],
}
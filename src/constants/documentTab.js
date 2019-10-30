// Import google material icon
import {
    mdiClockOutline,
    mdiFolder,
    mdiDelete
} from '@mdi/js';
import { VARIABLE_TYPE, FIELD_TYPE } from './documentCell'

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
        {
            name: 'Loại',
            additionStyle: {
                width: '5%',
            },
            align: 'center',
            type: [FIELD_TYPE.ICON, VARIABLE_TYPE.TYPE],
        },
        {
            name: 'Tên tài liệu',
            additionStyle: {
                width: '30%',
            },
            align: 'left',
            type: [FIELD_TYPE.CLICK_TEXT, VARIABLE_TYPE.NAME],
        },
        {
            name: 'Nơi lưu trữ',
            additionStyle: {
                width: '20%',
            },
            align: 'left',
            type: [FIELD_TYPE.CLICK_TEXT, VARIABLE_TYPE.LOCATION],
        },
        {
            name: 'Ngày tạo',
            additionStyle: {
                width: '15%',
            },
            align: 'center',
            type: [FIELD_TYPE.NORMAL_TEXT, VARIABLE_TYPE.DATE],
        },
        {
            name: 'Người tạo',
            additionStyle: {
                width: '15%',
            },
            align: 'center',
            type: [FIELD_TYPE.AVATAR, VARIABLE_TYPE.AVATAR],
        },
        {
            name: 'Kích thước',
            additionStyle: {
                width: '15%',
            },
            align: 'center',
            type: [FIELD_TYPE.NORMAL_TEXT, VARIABLE_TYPE.SIZE],
        },
    ],
}

export const PROJECT_DOCUMENT_TAB = {
    id: 1,
    name: 'Tài liệu dự án',
    icon: mdiFolder,
    columns: [
        {
            name: '',
            additionStyle: {
                width: '5%',
            },
            align: 'center',
            type: [FIELD_TYPE.ICON, VARIABLE_TYPE.TYPE],
        },
        {
            name: 'Tên',
            additionStyle: {
                width: '30%',
            },
            align: 'left',
            type: [FIELD_TYPE.CLICK_TEXT, VARIABLE_TYPE.NAME],
        },
        {
            name: 'Chủ sở hữu',
            additionStyle: {
                width: '20%',
            },
            align: 'left',
            type: [FIELD_TYPE.CLICK_TEXT, VARIABLE_TYPE.LOCATION],
        },
        {
            name: 'Chia sẻ',
            additionStyle: {
                width: '15%',
            },
            align: 'center',
            type: [FIELD_TYPE.NORMAL_TEXT, VARIABLE_TYPE.DATE],
        },
        {
            name: 'Sửa đổi lần cuối',
            additionStyle: {
                width: '15%',
            },
            align: 'center',
            type: [FIELD_TYPE.AVATAR, VARIABLE_TYPE.AVATAR],
        },
        {
            name: 'Sổ tài liệu',
            additionStyle: {
                width: '15%',
            },
            align: 'center',
            type: [FIELD_TYPE.NORMAL_TEXT, VARIABLE_TYPE.SIZE],
        },
    ],
}

export const MY_SHARING_TAB = {
    id: 2,
    name: 'Đã chia sẻ',
    icon: mdiFolder,
    columns: [
        {
            name: 'Loại',
            additionStyle: {
                width: '5%',
            },
            align: 'center',
            type: [FIELD_TYPE.ICON, VARIABLE_TYPE.TYPE],
        },
        {
            name: 'Tên tài liệu',
            additionStyle: {
                width: '30%',
            },
            align: 'left',
            type: [FIELD_TYPE.CLICK_TEXT, VARIABLE_TYPE.NAME],
        },
        {
            name: 'Ngày chia sẻ',
            additionStyle: {
                width: '20%',
            },
            align: 'left',
            type: [FIELD_TYPE.CLICK_TEXT, VARIABLE_TYPE.LOCATION],
        },
        {
            name: 'Người được chia sẻ',
            additionStyle: {
                width: '15%',
            },
            align: 'center',
            type: [FIELD_TYPE.NORMAL_TEXT, VARIABLE_TYPE.DATE],
        },
        {
            name: 'Chủ sở hữu',
            additionStyle: {
                width: '15%',
            },
            align: 'center',
            type: [FIELD_TYPE.AVATAR, VARIABLE_TYPE.AVATAR],
        },
        {
            name: 'Kích thước',
            additionStyle: {
                width: '15%',
            },
            align: 'center',
            type: [FIELD_TYPE.NORMAL_TEXT, VARIABLE_TYPE.SIZE],
        },
    ],
}

export const OTHER_SHARING_TAB = {
    id: 3,
    name: 'Được chia sẻ',
    icon: mdiFolder,
    columns: [
        {
            name: 'Loại',
            additionStyle: {
                width: '5%',
            },
            align: 'center',
            type: [FIELD_TYPE.ICON, VARIABLE_TYPE.TYPE],
        },
        {
            name: 'Tên tài liệu',
            additionStyle: {
                width: '30%',
            },
            align: 'left',
            type: [FIELD_TYPE.CLICK_TEXT, VARIABLE_TYPE.NAME],
        },
        {
            name: 'Ngày chia sẻ',
            additionStyle: {
                width: '20%',
            },
            align: 'left',
            type: [FIELD_TYPE.CLICK_TEXT, VARIABLE_TYPE.LOCATION],
        },
        {
            name: 'Người được chia sẻ',
            additionStyle: {
                width: '15%',
            },
            align: 'center',
            type: [FIELD_TYPE.NORMAL_TEXT, VARIABLE_TYPE.DATE],
        },
        {
            name: 'Chủ sở hữu',
            additionStyle: {
                width: '15%',
            },
            align: 'center',
            type: [FIELD_TYPE.AVATAR, VARIABLE_TYPE.AVATAR],
        },
        {
            name: 'Kích thước',
            additionStyle: {
                width: '15%',
            },
            align: 'center',
            type: [FIELD_TYPE.NORMAL_TEXT, VARIABLE_TYPE.SIZE],
        },
    ],
}

export const MY_DOCUMENT_TAB = {
    id: 4,
    name: 'Tài liệu của tôi',
    icon: mdiFolder,
    columns: [
        {
            name: '',
            additionStyle: {
                width: '5%',
            },
            align: 'center',
            type: [FIELD_TYPE.ICON, VARIABLE_TYPE.TYPE],
        },
        {
            name: 'Tên',
            additionStyle: {
                width: '30%',
            },
            align: 'left',
            type: [FIELD_TYPE.CLICK_TEXT, VARIABLE_TYPE.NAME],
        },
        {
            name: 'Chủ sở hữu',
            additionStyle: {
                width: '20%',
            },
            align: 'left',
            type: [FIELD_TYPE.CLICK_TEXT, VARIABLE_TYPE.LOCATION],
        },
        {
            name: 'Chia sẻ',
            additionStyle: {
                width: '15%',
            },
            align: 'center',
            type: [FIELD_TYPE.NORMAL_TEXT, VARIABLE_TYPE.DATE],
        },
        {
            name: 'Sửa đổi lần cuối',
            additionStyle: {
                width: '15%',
            },
            align: 'center',
            type: [FIELD_TYPE.AVATAR, VARIABLE_TYPE.AVATAR],
        },
        {
            name: 'Kích cỡ tệp',
            additionStyle: {
                width: '15%',
            },
            align: 'center',
            type: [FIELD_TYPE.NORMAL_TEXT, VARIABLE_TYPE.SIZE],
        },
    ],
}

export const GOOGLE_DRIVE_TAB = {
    id: 5,
    name: 'Google Driver',
    icon: mdiFolder,
    columns: [
        {
            name: 'Loại',
            additionStyle: {
                width: '5%',
            },
            align: 'center',
            type: [FIELD_TYPE.ICON, VARIABLE_TYPE.TYPE],
        },
        {
            name: 'Tên',
            additionStyle: {
                width: '30%',
            },
            align: 'left',
            type: [FIELD_TYPE.CLICK_TEXT, VARIABLE_TYPE.NAME],
        },
        {
            name: 'Thời gian',
            additionStyle: {
                width: '20%',
            },
            align: 'left',
            type: [FIELD_TYPE.CLICK_TEXT, VARIABLE_TYPE.LOCATION],
        },
        {
            name: 'Kích thước',
            additionStyle: {
                width: '15%',
            },
            align: 'center',
            type: [FIELD_TYPE.NORMAL_TEXT, VARIABLE_TYPE.DATE],
        }
    ]
}

export const BIN_TAB = {
    id: 6,
    name: 'Thùng rác',
    icon: mdiDelete,
    columns: [
        {
            name: 'Loại',
            additionStyle: {
                width: '5%',
            },
            align: 'center',
            type: [FIELD_TYPE.ICON, VARIABLE_TYPE.TYPE],
        },
        {
            name: 'Tên tài liệu',
            additionStyle: {
                width: '20%',
            },
            align: 'left',
            type: [FIELD_TYPE.CLICK_TEXT, VARIABLE_TYPE.NAME],
        },
        {
            name: 'Chủ sở hữu',
            additionStyle: {
                width: '15%',
            },
            align: 'center',
            type: [FIELD_TYPE.CLICK_TEXT, VARIABLE_TYPE.LOCATION],
        },
        {
            name: 'Người xoá',
            additionStyle: {
                width: '15%',
            },
            align: 'center',
            type: [FIELD_TYPE.NORMAL_TEXT, VARIABLE_TYPE.DATE],
        },
        {
            name: 'Ngày xoá',
            additionStyle: {
                width: '15%',
            },
            align: 'center',
            type: [FIELD_TYPE.NORMAL_TEXT, VARIABLE_TYPE.DATE],
        },
        {
            name: 'Xoá vĩnh viễn',
            additionStyle: {
                width: '15%',
            },
            align: 'center',
            type: [FIELD_TYPE.NORMAL_TEXT, VARIABLE_TYPE.DATE],
        },
        {
            name: 'Kích thước',
            additionStyle: {
                width: '15%',
            },
            align: 'center',
            type: [FIELD_TYPE.NORMAL_TEXT, VARIABLE_TYPE.DATE],
        }
    ]
}
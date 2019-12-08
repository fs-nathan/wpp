// Import actions
import {
  CHANGE_TAB,
  FILTER_DOCUMENTS,
  SET_ALL_DATA_DOCUMENTS,
  SELECT_DOCUMENT_ITEM,
  RESET_LIST_SELECT_DOCUMENT
} from '../../constants/actions/documents';
// Import all the tabs in document page
import * as TABS from '../../constants/documentTab';

// Initial state for store
const initialState = {
  activeTabId: TABS.RECENT_TAB.id,
  docs: {
    'task-1': {
      id: 'task-1',
      content: 20,
      name: 'Dự án thiết kế website Phúc An',
      type: 'folder',
      location: 'Văn Thư',
      size: '10.3 Kb',
      date: '02/02/2019'
    },
    'task-2': {
      id: 'task-2',
      content: 40,
      name: 'Ảnh mẫu gửi khách hàng.jpg',
      type: 'jpg',
      location: 'Marketing',
      size: '30 Mb',
      date: '01/03/2019'
    },
    'task-3': {
      id: 'task-3',
      content: 60,
      name: 'Ảnh mẫu gửi khách hàng 2.jpg',
      type: 'jpg',
      location: 'Văn Thư',
      size: '20.5 Mb',
      date: '05/02/2019'
    },
    'task-4': {
      id: 'task-4',
      content: 80,
      name: 'Ảnh mẫu gửi khách hàng 3.jpg',
      type: 'jpg',
      location: 'Thiết kế',
      size: '5 Gb',
      date: '28/12/2018'
    }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      tasksId: ['task-1', 'task-2', 'task-3', 'task-4']
    }
  },
  columnOrder: ['column-1'],
  selectedDocument: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FILTER_DOCUMENTS:
      return {
        ...state,
        docs: action.payload
      };
    case CHANGE_TAB:
      return {
        ...state,
        activeTabId: action.payload
      };
    case SET_ALL_DATA_DOCUMENTS:
      return action.payload;
    case SELECT_DOCUMENT_ITEM:
      return {
        ...state,
        selectedDocument: action.payload
      };
    case RESET_LIST_SELECT_DOCUMENT:
      return {
        ...state,
        selectedDocument: []
      };
    default:
      return state;
  }
}

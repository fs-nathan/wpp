// Import actions
import {
  CHANGE_TAB,
  FILTER_DOCUMENTS,
  SET_ALL_DATA_DOCUMENTS,
  SELECT_DOCUMENT_ITEM,
  RESET_LIST_SELECT_DOCUMENT,
  LIST_COMMENT,
  LIST_COMMENT_SUCCESS,
  DOCUMENT_HIDE_LOADING,
  LIST_TRASH,
  LIST_TRASH_SUCCESS,
  LIST_MY_DOCUMENT,
  LIST_MY_DOCUMENT_SUCCESS,
  ACTION_SELECTED_FOLDER,
  LIST_RECENT,
  LIST_RECENT_SUCCESS,
  LIST_PROJECT_DOCUMENT,
  LIST_PROJECT_DOCUMENT_SUCCESS,
  LIST_PROJECT_DOCUMENT_OF_FOLDER,
  LIST_PROJECT_DOCUMENT_OF_FOLDER_SUCCESS,
  LIST_DOCUMENT_FROM_ME,
  LIST_DOCUMENT_FROM_ME_SUCCESS,
  CHANGE_SEARCH_TEXT,
  LIST_DOCUMENT_SHARE,
  LIST_DOCUMENT_SHARE_SUCCESS,
  TOGGLE_BUTTON_SIGNOUT_GOOGLE,
  LIST_GOOGLE_DOCUMENT,
  LIST_GOOGLE_DOCUMENT_SUCCESS,
  LIST_TASK_DOCUMENT_OF_PROJECT,
  LIST_TASK_DOCUMENT_OF_PROJECT_SUCCESS
} from '../../constants/actions/documents';
// Import all the tabs in document page
import * as TABS from '../../constants/documentTab';

// Initial state for store
const initialState = {
  isLoading: false,
  listRecent: [],
  listProject: [],
  listComment: [],
  pagingComment: {},
  listDocumentFromMe: [],
  listDocumentShareToMe: [],
  listTrash: [],
  listMyDocument: [],
  listGoogleDocument: [],
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
  selectedDocument: [],
  currentFolder: {},
  searchText: '',
  isShowBtnSignoutGoogle: false,
  isFetching: false
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
    case TOGGLE_BUTTON_SIGNOUT_GOOGLE:
      return {
        ...state,
        isShowBtnSignoutGoogle: action.payload
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
    case DOCUMENT_HIDE_LOADING:
      return {
        ...state,
        isFetching: false,
        isLoading: false
      };
    case LIST_COMMENT:
      return {
        ...state,
        isLoading: !action.quite
      };
    case LIST_COMMENT_SUCCESS:
      let listCommentTemp = action.isLoadMore
        ? state.listComment.concat(action.payload || [])
        : action.payload;
      return {
        ...state,
        listComment: listCommentTemp,
        pagingComment: action.paging || {},
        isLoading: false
      };
    case LIST_TRASH:
      return {
        ...state,
        isFetching: true,
        isLoading: !action.quite
      };
    case LIST_TRASH_SUCCESS:
      return {
        ...state,
        listTrash: action.payload,
        isFetching: false,
        isLoading: false
      };
    case LIST_MY_DOCUMENT:
      return {
        ...state,
        isFetching: true,
        isLoading: !action.quite
      };
    case LIST_MY_DOCUMENT_SUCCESS:
      return {
        ...state,
        listMyDocument: action.payload,
        isFetching: false,
        isLoading: false
      };
    case ACTION_SELECTED_FOLDER:
      return {
        ...state,
        currentFolder: action.payload
      };
    case LIST_RECENT:
      return {
        ...state,
        isLoading: !action.quite
      };
    case LIST_RECENT_SUCCESS:
      return {
        ...state,
        listRecent: action.payload,
        isLoading: false
      };
    case LIST_PROJECT_DOCUMENT:
      return {
        ...state,
        isFetching: true,
        isLoading: !action.quite
      };
    case LIST_PROJECT_DOCUMENT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        listProject: action.payload,
        isLoading: false
      };
    case LIST_TASK_DOCUMENT_OF_PROJECT:
      return {
        ...state,
        isFetching: true,
        isLoading: !action.quite
      };
    case LIST_TASK_DOCUMENT_OF_PROJECT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        listProject: action.payload,
        isLoading: false
      };
    case LIST_PROJECT_DOCUMENT_OF_FOLDER:
      return {
        ...state,
        isFetching: true,
        isLoading: !action.quite
      };
    case LIST_PROJECT_DOCUMENT_OF_FOLDER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        listProject: action.payload,
        isLoading: false
      };
    case LIST_DOCUMENT_FROM_ME:
      return {
        ...state,
        isFetching: true,
        isLoading: !action.quite
      };
    case LIST_DOCUMENT_FROM_ME_SUCCESS:
      return {
        ...state,
        isFetching: false,
        listDocumentFromMe: action.payload,
        isLoading: false
      };
    case LIST_DOCUMENT_SHARE:
      return {
        ...state,
        isFetching: true,
        isLoading: !action.quite
      };
    case LIST_DOCUMENT_SHARE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        listDocumentShareToMe: action.payload,
        isLoading: false
      };
    case CHANGE_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload
      };
    case LIST_GOOGLE_DOCUMENT:
      return {
        ...state,
        isFetching: true,
        isLoading: !action.quite
      };
    case LIST_GOOGLE_DOCUMENT_SUCCESS:
      return {
        ...state,
        listGoogleDocument: action.payload,
        isFetching: false,
        isLoading: false
      };
    default:
      return state;
  }
}

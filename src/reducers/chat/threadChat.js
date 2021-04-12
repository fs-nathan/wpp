import produce from "immer";
import findIndex from 'lodash/findIndex';
import uniq from 'lodash/uniq';
import * as actionTypes from '../../constants/actions/chat/threadChat';

export const initialState = {
  membersToCreateGroupChat: [],
  membersNotCreatePrivateChat: [],
  createPrivateResponse: false,
  createGroupChatResponse: false,
  viewAllMessageResponse: false,
  numberChatNotView: 0
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_LIST_MEMBER_NOT_CREATE_PRIVATE_CHAT_SUCCESS:
      return {
        ...state,
        membersNotCreatePrivateChat: action.payload
      };
    case actionTypes.CREATE_PRIVATE_CHAT_SUCCESS:
      return {
        ...state,
        createPrivateResponse: action.payload
      };
    case actionTypes.CREATE_PRIVATE_CHAT_FAILD:
      return {
        ...state,
        createPrivateResponse: {
          state: false
        }
      };
    case actionTypes.GET_MEMBER_TO_CREATE_GROUP_CHAT_SUCCESS:
      return {
        ...state,
        membersToCreateGroupChat: action.payload
      };
    case actionTypes.CREATE_GROUP_CHAT_SUCCESS:
      return {
        ...state,
        createGroupChatResponse: action.payload
      };
    case actionTypes.CREATE_GROUP_CHAT_FAILD:
      return {
        ...state,
        createGroupChatResponse: {
          state: false
        }
      };
    case actionTypes.VIEW_ALL_MESSAGE_SUCCESS:
      return {
        ...state,
        viewAllMessageResponse: action.payload
      };
    case actionTypes.VIEW_ALL_MESSAGE_FAILD:
      return {
        ...state,
        viewAllMessageResponse: {
          state: false
        }
      };
    case actionTypes.GET_NUMBER_MESSAGE_NOT_VIEW_SUCCESS:
      return {
        ...state,
        numberChatNotView: action.payload
      };
    case actionTypes.SET_NUMBER_MESSAGE_NOT_VIEW:
      console.log(action)
      let newMessage = 0;
      if (action.payload.type === "Assign") {
        newMessage = action.payload.message;
      } else if (action.payload.type === "Plus") {
        newMessage = state.numberChatNotView + action.payload.message;
      } else if (action.payload.type === "Subtract") {
        newMessage = state.numberChatNotView - action.payload.message;
      }
      return {
        ...state,
        numberChatNotView: newMessage
      };
    default:
      return state;
  }
}

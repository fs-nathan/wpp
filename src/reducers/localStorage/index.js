import { RESET, SET_PROJECT, SET_PROJECT_GROUP } from 'constants/actions/localStorage';
import { PROJECT, PROJECT_GROUP } from 'constants/localStorageKey';

function getData(key, initialValue) {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    window.localStorage.setItem(key, JSON.stringify(initialValue));
    return initialValue;
  }
}

function resetData() {
  try {
    localStorage.removeItem(PROJECT);
    localStorage.removeItem(PROJECT_GROUP);
  } catch (error) {
  }
}

export const initialState = {
  project: getData(PROJECT, {
    filterType: 1,
    timeType: 5,
  }),
  projectGroup: getData(PROJECT_GROUP, {
    filterType: 1,
    timeType: 5,
    workType: -1,
  }),
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROJECT:
      return {
        ...state,
        project: action.value,
      };
    case SET_PROJECT_GROUP:
      return {
        ...state,
        projectGroup: action.value,
      };
    case RESET:
      resetData();
      return {
        project: {
          filterType: 0,
          timeType: 5,
        },
        projectGroup: {
          filterType: 0,
          timeType: 5,
          workType: -1,
        }
      }
    default:
      return state;
  }
}

export default reducer;
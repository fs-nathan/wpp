import { PROJECT, PROJECT_GROUP } from 'constants/localStorageKey';

function setProject(action) {
  try {
    window.localStorage.setItem(PROJECT, JSON.stringify(action.value));
  } catch (error) {
    return;
  }
}

function setProjectGroup(action) {
  try {
    window.localStorage.setItem(PROJECT_GROUP, JSON.stringify(action.value));
  } catch (error) {
    return;
  }
}

export { setProject, setProjectGroup, };

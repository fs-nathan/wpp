import { createSelector } from 'reselect';

const colors = state => state.setting.colors;
export const bgColorSelector = createSelector(
  [colors],
  (colors) => {
    const bgColor = colors.find(item => item.selected === true);
    return bgColor
  }
);

const personalRemindCategories = state => state.calendar.listPersonalRemindCategory;
export const personalRemindCategoriesSelector = createSelector(
  [personalRemindCategories],
  (personalRemindCategories) => {
    return ({
      data: personalRemindCategories.data.categories,
      error: personalRemindCategories.error,
      loading: personalRemindCategories.loading
    });
  }
);

const remindRecently = state => state.calendar.listRemindRecently;
export const remindRecentlySelector = createSelector(
  [remindRecently],
  (remindRecently) => {
    return ({
      data: remindRecently.data.reminds,
      error: remindRecently.error,
      loading: remindRecently.loading
    })
  }
);

const personalReminds = state => state.calendar.listPersonalRemind;
export const personalRemindSelector = createSelector(
  [personalReminds],
  (personalReminds) => {
    return ({
      data: personalReminds.data.reminds,
      error: personalReminds.error,
      loading: personalReminds.loading
    })
  }
);

const remindProject = state => state.calendar.listRemindProject;
export const remindProjectSelector = createSelector(
  [remindProject],
  (remindProject) => {
    return ({
      data: remindProject.data.reminds,
      error: remindProject.error,
      loading: remindProject.loading
    });
  }
);

const listProjectBasic = state => state.project.listProjectBasicInfo;
export const listProjectBasicInfoSelector = createSelector(
  [listProjectBasic],
  (listProjectBasic) => {
    return ({
      data: listProjectBasic.data.projects,
      error: listProjectBasic.error,
      loading: listProjectBasic.loading
    });
  }
);
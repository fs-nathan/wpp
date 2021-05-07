import { call, put } from 'redux-saga/effects';
import * as actionTypes from '../../constants/actions/setting/setting';
import { apiService } from '../../constants/axiosInstance';

async function doGetGroupDetail() {
  try {
    const config = {
      url: '/get-group-detail',
      method: 'get'
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getGroupDetail() {
  try {
    const { profile } = yield call(doGetGroupDetail);
    yield put({
      type: actionTypes.FETCH_GROUP_DETAIL_SUCCESS,
      payload: profile || {}
    });
  } catch (error) {
    yield put({ type: actionTypes.SETTING_HIDE_LOADING });
  }
}

async function doGetListColor() {
  try {
    const config = {
      url: '/get-list-color-group',
      method: 'get'
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getListColor() {
  try {
    const { colors } = yield call(doGetListColor);
    const checkSelected = colors.find(item => item.selected === true);
    if (!checkSelected && colors.length > 0) {
      colors[0].selected = true;
    }
    yield put({
      type: actionTypes.FETCH_LIST_COLOR_GROUP_SUCCESS,
      payload: colors || [{ value: '#01b374', selected: true }]
    });
  } catch (error) {
    yield put({type: actionTypes.FETCH_LIST_COLOR_GROUP_ERROR})
  }
}

async function doGetSettingDate() {
  try {
    const config = {
      url: '/users/get-list-format-date',
      method: 'get'
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getSettingDate() {
  try {
    const { data } = yield call(doGetSettingDate);
    const checkSelected = data.find(item => item.selected === true);
    if (!checkSelected && data.length > 0) {
      data[0].selected = true;
    }
    yield put({
      type: actionTypes.GET_SETTING_DATE_SUCCESS,
      payload: data || [{ date_format: 'DD/MM/YYYY', selected: true }]
    });
  } catch (error) {}
}

export { getGroupDetail, getListColor, getSettingDate };

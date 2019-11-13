import { call, put } from 'redux-saga/effects';
import * as actions from '../../actions/taskDetail/taskDetailActions';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, DELETE_ROOM } from '../../constants/events';

//Offer::
async function doGetOffer({ taskId }) {
    try {
        const config = {
            url: '/task/get-offer?task_id=' + taskId,
            method: 'get'
        }
        const result = await apiService(config);
        return result.data;
    } catch (error) {
        throw error;
    }
}

function* getOffer(action) {
    try {
        const res = yield call(doGetOffer, action.options)
        yield put(actions.getOfferSuccess(res))
        // CustomEventEmitter(DELETE_ROOM);
    } catch (error) {
        yield put(actions.getOfferFail(error))
    }
}

async function doCreateOffer({ createId, content }) {
    try {
        const config = {
            url: '/task/create-offer',
            method: 'post',
            data: {
                task_id: createId,
                content
            }
        }
        const result = await apiService(config);
        return result.data;
    } catch (error) {
        throw error;
    }
}

function* createOffer(action) {
    try {
        const res = yield call(doCreateOffer, action.options)
        console.log("GOI API NE", res)
        yield put(actions.createOfferSuccess(res))
        yield put(actions.getOffer({ taskId: "5da18ce8aa75001b8060eb12" }))

        // CustomEventEmitter(DELETE_ROOM);
    } catch (error) {
        yield put(actions.getOfferFail(error))
    }
}

export {
    getOffer,
    createOffer
}

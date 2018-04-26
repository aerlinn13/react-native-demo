import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from './constants';
import { put, call, takeEvery } from 'redux-saga/effects';
import getPeople from './api';

function* fetchData (action) {
	try {
		const data = yield getPeople();
		console.log(data);
		yield put({ type: FETCHING_DATA_SUCCESS, data });
	} catch (e) {
		yield call({ type: FETCHING_DATA_FAILURE });
	}
}

function* dataSaga () {
	yield takeEvery(FETCHING_DATA, fetchData);
}

export default dataSaga;

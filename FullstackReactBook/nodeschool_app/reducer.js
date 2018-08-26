import {
  FETCH_PEOPLE_REQUEST, FETCH_PEOPLE_SUCCESS,
  SAVE_PEOPLE_REQUEST, SAVE_PEOPLE_SUCCESS, SAVE_PEOPLE_FAILURE } from './actions';

const initialState = {
  people: [],
  isLoading: false,
  saveStatus: 'READY',
  fields: { name: '', email: '', course: null, department: null }
}

export default function (state = initialState, action) {
  switch(action.type) {
    case FETCH_PEOPLE_REQUEST:
      return Object.assign({}, state, { isLoading: true });
    case FETCH_PEOPLE_SUCCESS:
      return Object.assign({}, state, { people: action.people, isLoading: false });
    case SAVE_PEOPLE_REQUEST:
      return Object.assign({}, state, { savestatus: 'SAVING' });
    case SAVE_PEOPLE_SUCCESS:
      return Object.assign({}, state, {
        people: action.people, fields: {
          name: '', email: '', course: null, department: null
        }, savestatus: 'SUCCESS' });
    case SAVE_PEOPLE_FAILURE:
      return Object.assign({}, state, { savestatus: 'ERROR' });
    default:
      return state;
  }
}
import { combineReducers } from 'redux';
import chat from '../actions/chatActions';

// Object.keys(state.rooms) is the list of chats since the beginning of time.
// you gotta ask for it on loading.
// active means it's being rendered, loaded means it loaded previous messages
// so you don't need to ask for them
// if active or loaded are undefined, that means they are false.
// unread is the ammount of msgs not read. zero on close

function mergeMessages(messages, newMessages) { // merges two arrays by date
  const merged = [];
  if (messages === undefined) {
    return newMessages.slice(0);
  }
  let i;
  let j;
  for (i = 0, j = 0; i < messages.length && j < newMessages.length;) {
    while (i < messages.length && j < newMessages.length &&
    messages[i].date <= newMessages[j].date) {
      if (messages[i].date === newMessages[j].date) {
        j += 1;
      }
      merged.push(messages[i]);
      i += 1;
    }
    while (j < newMessages.length && i < messages.length &&
    newMessages[j].date <= messages[i].date) {
      if (messages[i].date === newMessages[j].date) {
        i += 1;
      }
      merged.push(newMessages[j]);
      j += 1;
    }
  }
  while (i < messages.length) { merged.push(messages[i]); i += 1; }
  while (j < newMessages.length) { merged.push(newMessages[j]); j += 1; }
  return merged;
}

const loadingRooms = (state = false, action) => {
  switch (action.type) {
    case chat.LOADING_ROOMS:
      return true;
    case chat.RECEIVE_ROOMS:
      return false;
    default:
      return state;
  }
};

const rooms = (state = {}, action) => { // state: state.rooms
  let newState;
  let room;
  let unread;
  switch (action.type) {
    case chat.RECEIVE_MESSAGE:
      newState = Object.assign({}, state);
      if (!newState[action.msg.room]) {
        newState[action.msg.room] = {};
        newState[action.msg.room].messages = [];
        newState[action.msg.room].active = true;
        newState[action.msg.room].unread = 0;
      }
      newState[action.msg.room].messages.push(action.msg);
      if (newState[action.msg.room].active !== true) {
        newState[action.msg.room].unread += 1;
      }
      return newState;
    case chat.RECEIVE_MESSAGES: // only one room, it must exist beforehand
      if (action.msgs.length === 0) {
        return state;
      }
      newState = Object.assign({}, state);
      room = action.msgs[0].room;
      newState[room].messages = mergeMessages(newState[room].messages, action.msgs);
      newState[room].loading = false;
      newState[room].active = true;
      newState[room].loaded = true;
      return newState;
    case chat.ADD_ROOM:
      newState = Object.assign({}, state);
      if (!newState[action.room]) {
        newState[action.room] = {};
        newState[action.room].messages = [];
        newState[action.room].unread = action.unread;
      }
      newState[action.room].active = true;
      newState[action.room].unread = action.unread;
      return newState;
    case chat.OPEN_ROOM:
      newState = Object.assign({}, state);
      if (!newState[action.room]) {
        newState[action.room] = { loading: true };
      }
      newState[action.room].active = true;
      newState[action.room].unread = 0;
      return newState;
    case chat.CLOSE_ROOM:
      newState = Object.assign({}, state);
      newState[action.room].active = false;
      return newState;
    case chat.RECEIVE_ROOMS:
      newState = {}; // Object.assign({}, state);
      for (let i = 0; i < action.rooms.length; i += 1) {
        room = action.rooms[i].room;
        unread = action.rooms[i].unread;
        newState[room] = { unread, active: false, loading: false, loaded: false, messages: [] };
      }
      return newState;
    case chat.LOADING_MESSAGES:
      newState = Object.assign({}, state);
      if (!newState[action.room]) {
        newState[action.room] = {};
      }
      newState[action.room].loading = true;
      return newState;
    default:
      return state;
  }
};

const socket = (state = null, action) => {
  switch (action.type) {
    case chat.SET_SOCKET:
      return action.socket;
    default:
      return state;
  }
};

const chatReducer = combineReducers({ rooms, loadingRooms, socket }); // instead of username, rooms


export default chatReducer;

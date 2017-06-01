const RECEIVE_ROOMS = 'RECEIVE_ROOMS';
const OPEN_ROOM = 'OPEN_ROOM';
const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
const CLOSE_ROOM = 'CLOSE_ROOM';
const ADD_ROOM = 'ADD_ROOM';
const LOADING_ROOMS = 'LOADING_ROOMS';
const SET_SOCKET = 'SET_SOCKET';
const LOADING_MESSAGES = 'LOADING_MESSAGES';

const receiveRooms = rooms => ({ type: RECEIVE_ROOMS, rooms }); // erases previous rooms
const receiveMessage = msg => ({ type: RECEIVE_MESSAGE, msg }); // msg has a lot of info
const receiveMessages = msgs => ({ type: RECEIVE_MESSAGES, msgs }); // msgs is an array of msg
const closeRoom = room => ({ type: CLOSE_ROOM, room });
const addRoom = (room, unread = 0) => ({ type: ADD_ROOM, room, unread });
const openRoom = room => ({ type: OPEN_ROOM, room });
const loadingRooms = username => ({ type: LOADING_ROOMS, username });
const setSocket = socket => ({ type: SET_SOCKET, socket });
const loadingMessages = room => ({ type: LOADING_MESSAGES, room });


const closeRoomAsync = (room, socket, username) => (dispatch) => {
  socket.emit('closeRoom', { username, room });
  dispatch(closeRoom(room));
};
const openRoomAsync = (room, socket, username) => (dispatch, getState) => {
  // TODO: substitute username by token
  const state = getState();
  if (state.chat.rooms[room].loaded !== true && state.chat.rooms[room].loading !== true) {
    dispatch(loadingMessages(room));
    socket.emit('messages', { room });
  }
  socket.emit('openRoom', { username, room });
  dispatch(openRoom(room));
};
const addRoomAsync = (room, socket, username) => (dispatch, getState) => {
  const state = getState();
  if (state.chat.rooms[room] !== undefined) { // if the room already exists
    return;
  }
  dispatch(openRoomAsync(room, socket, username));
};
const loadRoomsAsync = (socket, username) => (dispatch) => {
  socket.emit('rooms', { username });
  dispatch(loadingRooms());
};
const sendMessageAsync = (socket, message) => () => {
  console.log('send message ', message);
  if (message.message.trim() === '') {
    return;
  }
  socket.emit('message', message);
};

const receiveMessageAsync = (msg, socket, username) => (dispatch, getState) => {
  console.log('inside receiveMessageAsync');
  const state = getState();
  if (!state.chat.rooms[msg.room]) {
    console.log('opening room');
    dispatch(openRoomAsync(msg.room, socket, username));
  } else {
    dispatch(receiveMessage(msg));
    console.log('receiving message normally, without opening the room');
  }
};

export default {
  RECEIVE_ROOMS,
  OPEN_ROOM,
  RECEIVE_MESSAGE,
  RECEIVE_MESSAGES,
  CLOSE_ROOM,
  ADD_ROOM,
  LOADING_ROOMS,
  SET_SOCKET,
  LOADING_MESSAGES,

  receiveRooms,
  receiveMessage,
  receiveMessages,
  closeRoom,
  addRoom,
  openRoom,
  loadingRooms,
  loadRoomsAsync,
  closeRoomAsync,
  openRoomAsync,
  addRoomAsync,
  sendMessageAsync,
  setSocket,
  receiveMessageAsync,
  loadingMessages,
};

/* global describe it jest expect beforeEach*/

import chat from '../chatActions';

describe('closeRoomAsync', () => {
  let dispatch;
  let socket;
  beforeEach(() => {
    dispatch = jest.fn();
    socket = { emit: jest.fn() };
  });

  it('should dispatch OPEN_ROOM action', () => {
    chat.closeRoomAsync('room', socket, 'username')(dispatch);
    expect(dispatch).toBeCalledWith({ room: 'room', type: 'CLOSE_ROOM' });
  });

  it('should emit closeRoom to the server', () => {
    chat.closeRoomAsync('room', socket, 'username')(dispatch);
    expect(socket.emit).toBeCalledWith('closeRoom', { username: 'username', room: 'room' });
  });
});

describe('openRoomAsync', () => {
  let room;
  let socket;
  let username;
  let getState;

  beforeAll(() => {
    room = 'room';
    socket = { emit: jest.fn() };
    username = 'user';
    getState = jest.fn();
    const roomNoData = { chat: { rooms: { room: {} } } };
    getState.mockReturnValueOnce(roomNoData);
    const stateNoRoom = { chat: { rooms: {} } };
    getState.mockReturnValueOnce(stateNoRoom);
    const stateRoomEmptyButLoaded = { chat: { rooms: { room: { loaded: true } } } };
    getState.mockReturnValueOnce(stateRoomEmptyButLoaded);
  });
  beforeEach(() => {
    socket = { emit: jest.fn() };
  });

  it('should ask the server for messages if it has none and its not loading or hasnt loaded yet', () => {
    chat.openRoomAsync(room, socket, username)(jest.fn(), getState);
    expect(socket.emit).toBeCalledWith('messages', { room: 'room' });
  });

  it('should ask for the server for msgs even if there is no room under that name', () => {
    chat.openRoomAsync(room, socket, username)(jest.fn(), getState);
    expect(socket.emit).toBeCalledWith('messages', { room: 'room' });
  });

  it('should not ask the server for msgs if it has loaded before', () => {
    chat.openRoomAsync(room, socket, username)(jest.fn(), getState);
    expect(socket.emit.mock.calls.length).toBe(1);// not 2 (each time it calls emit openRoom)
  });
});

/* global describe it jest expect beforeEach*/

import chat from '../../redux/actions/chatActions';

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

// describe('openRoomAsync', () => {

//   beforeEach();

// });

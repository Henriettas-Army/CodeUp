/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import ChatList from '../components/ChatList';
import Chat from '../components/Chat';
import chat from '../../redux/actions/chatActions';

class Chats extends React.Component {
  constructor(props) {
    console.log('constructing chat...');
    super(props);
    console.log('PROPS; ', props);
    window.socket = window.socket || io('/chat');
    this.state = { socket: window.socket, completedRooms: {} };
    this.state.socket.emit('authenticate', { username: this.props.username });
    console.log('username from chats:::::::::::::::::::::::', this.props.username);
  }

  componentWillMount() {
    const socket = this.state.socket;
    socket.on('authenticationSuccess', (data) => {
      console.log('authenticated ', data.username);
      this.props.loadRooms(socket, data.username);

      socket.on('rooms', (data) => {
        console.log('rooms result: ', data);
        this.props.receiveRooms(data.rooms);
      });

      socket.on('message', (msg) => {
        console.log('message received!!', msg);
        this.props.addMessage(msg, socket, this.props.username);
      });
      socket.on('messages', (msgs) => {
        console.log('received messages', msgs);
        this.props.addMessages(msgs);
      });
    });
  }

  render() {
    if (!this.props.username) {
      return (<div />);
    }
    const chatRoomNames = Object.keys(this.props.rooms);

    return (
      <div>
        <ChatList
          rooms={chatRoomNames.map(room => ({ room, unread: this.props.rooms[room].unread }))}
          showChat={room => this.props.showChat(room, this.state.socket, this.props.username)}
        />
        {console.log('rooms chats: ', this.props.rooms, chatRoomNames)}
        {/* {console.log('rooms from gs: ', this.props.rooms)}*/}
        {/* messages={[{message: '1', from: 'someone1'}, {message: 2, from: this.props.username}]}
            */}
        {chatRoomNames
          .filter(room => this.props.rooms[room].active)
          .map((room, i) => (
            <Chat
              loading={this.props.rooms[room].loading}
              right={(200 * i) + 210}
              chatName={room}
              onCloseChat={() => {
                this.props.hideChat(room, this.state.socket, this.props.username);
              }}
              messages={this.props.rooms[room].messages}
              username={this.props.username}
              sendMessage={(text) => {
                this.props.sendMessage(
                  this.state.socket,
                  {
                    room,
                    from: this.props.username,
                    message: text
                  }
                );
              }}
            />
        ))}
      </div>);
  }
}

Chats.propTypes = {
  addMessage: PropTypes.func.isRequired,
  addMessages: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  // addChatRoom: PropTypes.func.isRequired,
  showChat: PropTypes.func.isRequired,
  // chatRooms: PropTypes.object,
  sendMessage: PropTypes.func.isRequired,
  hideChat: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  username: state.auth.isAuthenticated,
  rooms: state.chat.rooms,
  socket: state.socket,
});

const mapDispatchToProps = dispatch => ({
  loadRooms: (socket, username) => {
    dispatch(chat.loadRoomsAsync(socket, username));
  },
  receiveRooms: (rooms) => {
    dispatch(chat.receiveRooms(rooms));
  },
  showChat: (room, socket, username) => {
    dispatch(chat.openRoomAsync(room, socket, username));
  },
  hideChat: (room, socket, username) => {
    dispatch(chat.closeRoomAsync(room, socket, username));
  },
  addMessage: (msg, socket, username) => dispatch(chat.receiveMessageAsync(msg, socket, username)),
  addMessages: msgs => dispatch(chat.receiveMessages(msgs)),
  sendMessage: (socket, msg) => dispatch(chat.sendMessageAsync(socket, msg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chats);

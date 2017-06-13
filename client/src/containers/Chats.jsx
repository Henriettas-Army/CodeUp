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
    super(props);
    window.socket = window.socket || io('/chat');
    this.state = { socket: window.socket, completedRooms: {} };
    this.state.socket.emit('authenticate', { username: this.props.username });
  }

  componentWillMount() {
    const socket = this.state.socket;
    socket.on('authenticationSuccess', (data) => {
      this.props.loadRooms(socket, data.username);
      socket.on('rooms', (data2) => {
        this.props.receiveRooms(data2.rooms);
      });
      socket.on('message', (msg) => {
        this.props.addMessage(msg, socket, this.props.username);
      });
      socket.on('messages', (msgs, room) => {
        this.props.addMessages(msgs, room);
      });
    });
  }

  render() {
    if (!this.props.username) {
      return (<div />);
    }
    const chatRoomNames = Object.keys(this.props.rooms);

    const chatListWidth = 350;
    const chatWidth = 300;

    return (
      <div>
        <ChatList
          width={chatListWidth}
          rooms={chatRoomNames.map(room => ({ room, unread: this.props.rooms[room].unread }))}
          showChat={room => this.props.showChat(room, this.state.socket, this.props.username)}
          username={this.props.username}
        />
        {chatRoomNames
          .filter(room => this.props.rooms[room].active)
          .map((room, i) => (
            <Chat
              key={+i + 1}
              loading={this.props.rooms[room].loading}
              width={chatWidth}
              right={((chatWidth + 10) * i) + chatListWidth + 10}
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
  loadRooms: PropTypes.func.isRequired,
  receiveRooms: PropTypes.func.isRequired,
  // chatRooms: PropTypes.object,
  sendMessage: PropTypes.func.isRequired,
  hideChat: PropTypes.func.isRequired,
  rooms: PropTypes.objectOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  username: state.auth.isAuthenticated,
  rooms: state.chat.rooms,
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
  addMessages: (msgs, room) => dispatch(chat.receiveMessages(msgs, room)),
  sendMessage: (socket, msg) => dispatch(chat.sendMessageAsync(socket, msg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chats);

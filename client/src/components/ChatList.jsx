import React from 'react';
import CaretUp from 'grommet/components/icons/base/CaretUp';
import CaretDown from 'grommet/components/icons/base/CaretDown';
import SearchInput from 'grommet/components/SearchInput';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import PropTypes from 'prop-types';
import colors from '../colorScheme';


class ChatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, searchValue: '' };
  }

  render() {
    if (!this.state.visible) {
      return (
        <div
          id="chatList"
          role="presentation"
          onClick={() => this.setState({ visible: true })}
          style={{
            width: this.props.width,
            height: '40px',
            position: 'fixed',
            bottom: 0,
            right: 0,
            border: `3px solid ${colors.secondary}`,
            backgroundColor: colors.base,
            zIndex: '1007'
          }}
        >
          <span
            role="presentation"
            onClick={() => this.setState({ visible: true })}
            style={{ display: 'flex', justifyContent: 'center', position: 'relative', cursor: 'pointer' }}
          >
            <CaretUp />
          </span>
        </div>
      );
    }
    const parseRoomName = (mixedName) => {
      let chatArray = mixedName.split('#');
      const index = chatArray.indexOf(this.props.username);
      chatArray.splice(index, 1);
      if (chatArray.length !== 1) {
        chatArray.unshift('You');
        chatArray = chatArray.join(', ');
      }
      return chatArray;
    };
    return (
      <div
        role="presentation"
        style={{
          width: this.props.width,
          height: '400px',
          position: 'fixed',
          bottom: 0,
          right: 0,
          border: `3px solid ${colors.secondary}`,
          overflow: 'auto',
          backgroundColor: colors.base,
          zIndex: 300
        }}
      >
        <span
          role="presentation"
          onClick={() => this.setState({ visible: false })}
          style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', position: 'relative', cursor: 'pointer' }}
        >
          <CaretDown />
        </span>
        <List>
          {this.props.rooms.filter(room => room.room.includes(this.state.searchValue)).map((room, k) => (
            <ListItem
              key={+k + 1}
              justify="between"
              separator="horizontal"
              onClick={() => this.props.showChat(room.room)}
              className="list-item"
            >
              <span>
                {parseRoomName(room.room)}
              </span>
              {room.unread === 0 ? null
                : <span className="secondary" style={{ borderRadius: '50%', color: 'white', backgroundColor: 'steelblue', width: 23, height: 23, textAlign: 'center', lineHeight: 1.5 }}>
                  {room.unread}
                </span>

              }
            </ListItem>
            ))}
        </List>
        <SearchInput
          style={{ width: `${this.props.width - 10}px`, boxSizing: 'border-box' }}
          placeHolder="Search"
          value={this.state.searchValue}
          onDOMChange={(e) => { this.setState({ searchValue: e.target.value }); }}
        />
      </div>
    );
  }
}

ChatList.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
  showChat: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default ChatList;

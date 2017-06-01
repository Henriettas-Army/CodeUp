import React from 'react';
import CaretUp from 'grommet/components/icons/base/CaretUp';
import CaretDown from 'grommet/components/icons/base/CaretDown';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import PropTypes from 'prop-types';


class ChatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  render() {
    if (!this.state.visible) {
      return (
        <div
          role="presentation"
          onClick={() => this.setState({ visible: true })}
          style={{
            width: '200px',
            height: '40px',
            position: 'fixed',
            bottom: 0,
            right: 0,
            border: '3px solid #ddd',
            backgroundColor: 'white',
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
    return (
      <div
        role="presentation"

        style={{
          width: '200px',
          height: '400px',
          position: 'fixed',
          bottom: 0,
          right: 0,
          border: '3px solid #ddd',
          overflow: 'auto',
          backgroundColor: 'white',
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
        <List selectable>
          {this.props.rooms.map((room) => (
            <ListItem
              justify="between"
              separator="horizontal"
              onClick={() => this.props.showChat(room.room)}
            >
              <span>
                {room.room}
              </span>
              <span className="secondary" style={{ borderRadius: '50%', color: 'white', backgroundColor: 'steelblue', width: 23, height: 23, textAlign: 'center', lineHeight: 1.5 }}>
                {room.unread}
              </span>
            </ListItem>
            ))}
        </List>
      </div>
    );
  }
}

ChatList.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
  showChat: PropTypes.func.isRequired,
};

export default ChatList;

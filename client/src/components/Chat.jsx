import React from 'react';
import CloseIcon from 'grommet/components/icons/base/Close';
import Button from 'grommet/components/Button';
import TextInput from 'grommet/components/TextInput';
import SendIcon from 'grommet/components/icons/base/Send';
import PropTypes from 'prop-types';
import colors from '../colorScheme';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textMessage: '',
    };
  }

  render() {
    let chatArray = this.props.chatName.split('#');
    const index = chatArray.indexOf(this.props.username);
    chatArray.splice(index, 1);
    chatArray = chatArray.join(', ');
    return (
      <div
        style={{
          width: `${this.props.width}px`,
          height: '300px',
          position: 'fixed',
          bottom: 0,
          right: this.props.right, // this should be dynamic
          // border: '3px solid #ddd',
          border: `3px solid ${colors.primary}`,
          //borderTop: 0,
          //borderLeft: 0,
          borderStyle: 'outset',
          borderRadius: '3px',
          overflow: 'auto',
          //backgroundColor: colors.base,
          backgroundColor: 'white',
          zIndex: 999999999,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '10%',
            backgroundColor: colors.base,
          }}
        >
          <span
            style={{
              color: '#555',
              fontWeight: 'bold',
              padding: '15px',
            }}
          >{chatArray}</span>
          <CloseIcon style={{ cursor: 'pointer', position: 'absolute', right: 0 }} onClick={() => { this.props.onCloseChat(); }} />
        </div>
        <div
          className="conversationDiv"
          ref={(div) => { if (div !== null) div.scrollTop = div.scrollHeight; }}
          style={{
            position: 'absolute',
            top: '10%',
            left: 0,
            width: '100%',
            height: '69%',
            overflow: 'auto',
          }}
        >
          {this.props.loading && 'loading...'}
          {
            this.props.messages.map((message, k) => {
              const style = {
                marginTop: '5px',
                display: 'inline-block',
                maxWidth: `${this.props.width * 0.8}px`,
                borderRadius: '10px',
                padding: '10px',
                boxSizing: 'border-box',
                marginLeft: 0,
                // border: '2px solid #eee',
                backgroundColor: colors.primary,
                color: 'white',
              };
              if (message.from === this.props.username) {
                Object.assign(style, {
                  // border: '2px solid #ddd',
                  marginRight: 0,
                  marginLeft: undefined,
                  float: 'right',
                  backgroundColor: colors.secondary,
                  color: 'black',
                  borderTopRightRadius: 0,
                });
              } else {
                Object.assign(style, { borderTopLeftRadius: 0 });
              }
              return (<div
                className={`messageBubble${(message.from === this.props.username ? ' mine' : ' other')}`}
                key={+k + message.message}
                style={{ display: 'block', width: '100%', overflow: 'auto' }}
              >
                <div style={style}>
                  {message.message}
                </div>
              </div>);
            })
          }
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '20%',
            backgroundColor: colors.base,
          }}
        >
          <TextInput
            style={{
              width: `${this.props.width * 0.8}px`,
              boxSizing: 'border-box',
            }}
            id="chatTextInput"
            name="chatTextInput"
            value={this.state.textMessage}
            onDOMChange={(e) => { this.setState({ textMessage: e.target.value }); }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                this.props.sendMessage(this.state.textMessage, this.props.chatName);
                this.setState({ textMessage: '' });
              }
            }}
          />
          <Button
            style={{
              boxSizing: 'border-box',
              width: `${this.props.width * 0.18}`,
              height: `${this.props.width * 0.18}`,
            }}
            icon={<SendIcon />}
            onClick={() => {
              this.props.sendMessage(this.state.textMessage, this.props.chatName);
              this.setState({ textMessage: '' });
            }}
          />
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  right: PropTypes.number.isRequired,
  chatName: PropTypes.string.isRequired,
  onCloseChat: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  username: PropTypes.string.isRequired,
  sendMessage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
};

Chat.defaultProps = {
  isAuthenticated: '',
};

export default Chat;

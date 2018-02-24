import React, {Component} from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  //Detemines message placement (left or right) in the messageList
  separate(message) {
    if (message.userId === this.props.currentUser.userId) {
      return 'message message-right';
    } else {
      return 'message message-left';
    }
  }

  messages() {
    let messages = this.props.messages.map((message) => {
      if (message.type === 'user') {
        let fontColor = {color: message.color};
        return (
          <div key={message.id} className={this.separate(message)}>
            <span className="message-username" style={fontColor}>{message.user}</span>
            <span className="message-content">{message.text}</span>
          </div>
        );
      } else if (message.type === 'system') {
        return (
          <div key={message.id} className='message system'>
            {message.text}
          </div>
        );
      }
    })
    return messages;
  }

  render() {
    return (
      <div className="messages">
        {this.messages()}
      </div>
    );
  }
}

export default MessageList;
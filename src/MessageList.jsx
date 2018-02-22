import React, {Component} from 'react';

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map((message) => {
      if (message.type === 'user') {
        return (
          <div key={message.id} className="message">
            <span className="message-username">{message.user}</span>
            <span className="message-content">{message.text}</span>
          </div>
        );
      } else if (message.type === 'system') {
        return (
          <div key={message.id} className='message system'>
            {message.text}
          </div>);
      }
    });

    return (
      <div className="messages">
        {messages}
      </div>
    );
  }
}

export default MessageList;
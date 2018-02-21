import React, {Component} from 'react';

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map((message) => {
      return (
        <div key={message.id} className="message">
          <span className="message-username">{message.user}</span>
          <span className="message-content">{message.text}</span>
        </div>
      );
    });

    return (
      <div className="messages">
        {messages}
      </div>
    );
  }
}

export default MessageList;
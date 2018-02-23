import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageText: '',
      userText: this.props.currentUser
    };
  }

  onMessageTextChange(event) {
    this.setState({messageText: event.target.value});
  }

  onUserTextChg(event) {
    this.setState({userText: event.target.value});
  }

  onUserNameKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.newMessage(null, this.state.userText);
    }
  }

  onMessageKeyPress(event) {
    //Adds "Anonymous" user to message if no User is submitted
    let userTxt = () => {
      if (this.state.userText === '') {
        return "Anonumouse";
      }
      return this.state.userText;
    }

    //Message is submitted
    if (event.key === 'Enter') {
      this.props.newMessage(this.state.messageText, userTxt());
      this.setState({
        messageText: ''
      });
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input
          value={this.state.userText}
          onChange={this.onUserTextChg.bind(this)}
          className="chatbar-username"
          placeholder="Name (Optional)"
          onKeyPress={this.onUserNameKeyPress.bind(this)}/>
        <input
          value={this.state.messageText}
          onChange={this.onMessageTextChange.bind(this)}
          className="chatbar-message"
          placeholder="Type a message and press ENTER"
          onKeyPress={this.onMessageKeyPress.bind(this)} />
      </footer>
    );
  }
}

export default Chatbar;

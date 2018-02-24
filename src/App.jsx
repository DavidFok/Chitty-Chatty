import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Anonumouse'},
      messages: [{
        id: 1,
        type: 'system',
        text: "someone's in trouble!"
      }],
      userCount: 0
    };
    this.colors = ['#9BA2FF', '#2A3D45', '#FFD447', '#EF959D', '#550C18'];
  }

  newMessage(messageText, user) {
    const newMsgObj = {
      user: user,
      text: messageText,
      type: 'postMessage'
    };

    //send an extra message to the server if the user changes their username
    if (user !== this.state.currentUser.name) {
      let newPostNote = {
        type:'postNotification',
        text: `${this.state.currentUser.name} has changed their name to ${user}`
      }
      let currentUserId = this.state.currentUser.userId;
      this.setState({ currentUser: {name: user, userId: currentUserId} });
      this.socket.send(JSON.stringify(newPostNote));
    }

    if (newMsgObj.text) {
      this.socket.send(JSON.stringify(newMsgObj));
    }
  }


  assignColor(msg) {
    const messages = this.state.messages;

    // check if there are user messages in state.messages
    let haveUserMsgs = (() => {
      for(let message of messages) {
        if (message.type === 'user') {
          return true;
        }
      }
      return false;
    })();

    // check if this client has received a message from this particular user before
    let haveUser = (() => {
      for (let message of messages) {
        if (msg.userId === message.userId) {
          return true;
        }
      }
      return false;
    })();


    //If we don't have this particular user before
    if (!haveUser) {

      //Return a new color different from the last recorded user
      if (haveUserMsgs) {
        let newMsgColor = (() => {
          for (let i = messages.length - 1; i >= 0; i--) {
            if (messages[i].type === 'user') {
              let idx = this.colors.indexOf(messages[i].color);
              return  this.colors[idx + 1];
            }
          }
        })();
        if (newMsgColor === undefined) {
          newMsgColor = '#9BA2FF';
        }
        return newMsgColor;
      }

      //Return a random color if we don't have any previous user messages
      else {
        return this.colors[Math.round(4 * Math.random())];
      }
    }

    //If this user has posted a message before
    else {
      for (let message of messages) {
        if (message.userId === msg.userId) {
          return message.color;
        }
      }
    }
  }


  componentDidMount() {
    this.socket = new WebSocket('ws://0.0.0.0:3001');
    this.socket.onopen = function () {
      console.log('Connected to server');
    };

    this.socket.onmessage = (event) => {
      let msg = JSON.parse(event.data);
      let messages = this.state.messages;

      //process messages from the server
      switch(msg.type) {
        // receives server allocated user is # for permanent storage
        case 'userid':
          let currentUser = this.state.currentUser.name;
          let newCurrentUser = {name: currentUser, userId: msg.userId};
          this.setState( {currentUser: newCurrentUser});
          break;
        case 'usercount':
          this.setState( {userCount: msg.userCount} );
          break;
        case 'incomingMessage':
          msg.color = this.assignColor(msg);
          msg.type = 'user';
          break;
        case 'incomingNotification':
          msg.type = 'system';
          break;
        }
      messages.push(msg);
      this.setState({ messages: messages });
    }
  }

  render() {
    return (
      <div>
        <Navbar userCount={this.state.userCount}/>
        <MessageList messages={this.state.messages} currentUser={this.state.currentUser}/>
        <Chatbar newMessage={this.newMessage.bind(this)} currentUser={this.state.currentUser.name}/>
      </div>
    );
  }
}

export default App;

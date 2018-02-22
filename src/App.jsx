import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Octocat'},
      messages: [{
        id: 1,
        type: 'system',
        text: `someone's in trouble!!!`
      }],
      userCount: 0
    };
  }

  newMessage(messageText, user) {
    const newMsgObj = {
      user: user,
      text: messageText,
      type: 'postMessage'
    };
    if (user !== this.state.currentUser.name) {
      let newPostNote = {
        type:'postNotification',
        text: `${this.state.currentUser.name} has changed their name to ${user}`
      }
      this.setState({ currentUser: {name: user} });
      this.socket.send(JSON.stringify(newPostNote));
    }
    this.socket.send(JSON.stringify(newMsgObj));
  }

  componentDidMount() {
    console.log("componentDidMount \<App />");
    this.socket = new WebSocket(`ws:\//0.0.0.0:3001`);
    this.socket.onopen = function (event) {
      console.log('Connected to server');
    };

    this.socket.onmessage = (event) => {
      let msg = JSON.parse(event.data);
      let messages = this.state.messages;
      if (msg.type === "usercount") {
        this.setState( {userCount: msg.userCount} );
        console.log("More users!!!");
      } else {
        switch(msg.type) {
          case "incomingMessage":
            msg.type = 'user'
            break;
          case "incomingNotification":
            msg.type = 'system';
            break;
        }
        messages.push(msg);
        this.setState({ messages: messages });
        console.log(this.state.messages);
      }
    }

    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, type: 'user', user: "Michelle", text: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
  }

  render() {
    return (
      <div>
        <Navbar userCount={this.state.userCount}/>
        <MessageList messages={this.state.messages}/>
        <Chatbar newMessage={this.newMessage.bind(this)} currentUser={this.state.currentUser.name}/>
      </div>
    );
  }
}

export default App;

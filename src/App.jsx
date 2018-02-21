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
        text: 'hi',
        user: 'Octocat'
      }],
      socket: null
    };
  }

  newMessage(messageText, user) {
    const newMsgObj = {
      id: Math.random(),
      user: user,
      text: messageText
    };
    const newMessages = this.state.messages.concat(newMsgObj);
    this.setState({
      currentUser: {name: user},
      messages: newMessages
    });
  }

  componentDidMount() {
    console.log("componentDidMount \<App />");
    const ws= new WebSocket(`ws:\//0.0.0.0:3001`);
    var component = this;
    ws.onopen = function (event) {
      console.log('Connected to server');
      component.setState({ socket: ws });
    };

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
        <Navbar/>
        <MessageList messages={this.state.messages}/>
        <Chatbar newMessage={this.newMessage.bind(this)} currentUser={this.state.currentUser.name}/>
      </div>
    );
  }
}

export default App;

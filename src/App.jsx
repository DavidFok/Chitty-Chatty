import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Octocat'},
      messages: []/*[{
        id: 1,
        text: 'hi',
        user: 'Octocat'
      }]*/
    };
  }

  newMessage(messageText, user) {
    const newMsgObj = {
      user: user,
      text: messageText
    };
    // const newMessages = this.state.messages.concat(newMsgObj);
    // this.setState({
    //   currentUser: {name: user},
    //   messages: newMessages
    // });
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
      messages.push(msg);
      this.setState({ messages: messages });
      console.log(this.state.messages);
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
        <Navbar/>
        <MessageList messages={this.state.messages}/>
        <Chatbar newMessage={this.newMessage.bind(this)} currentUser={this.state.currentUser.name}/>
      </div>
    );
  }
}

export default App;

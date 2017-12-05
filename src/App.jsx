import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: 'Anonymous' },
      messages: [],
      usersOnline: 0,
    };

  }


  newMessage = (message) => {
    this.socket.send(JSON.stringify({
      username: this.state.currentUser.name,
      content: message,
      type: "newMessage"


    }));
  }

  nameChange = (current) => {
    let oldName = this.state.currentUser;
    const newName = { oldUsername: this.state.currentUser.name, username: current, type: "postNotification", content: `${oldName.name} changed their username to ${current}`, }
    this.socket.send(JSON.stringify(newName));
    this.setState({
      currentUser: { name: current }
    })
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.addEventListener('open', function (event) {
      console.log("Connected to Server")
    });

    this.socket.addEventListener('message', (msg) => {
      console.log("Received msg from server:", msg.data);

      const newestMessage = JSON.parse(msg.data);

      if (newestMessage.type === 'incomingMessage' || newestMessage.type === 'incomingNotification') {
        const messages = this.state.messages;
        messages.push(newestMessage);
        this.setState({ messages });
        } else { (newestMessage.type === 'countUpdate')
        this.setState({usersOnline: newestMessage.number});
      } 
    });
  }


  render() {
    return (
      <div>
        <NavBar
          connected={this.state.connected}
          usersOnline={this.state.usersOnline} />
        <MessageList
          messages={this.state.messages}
          currentUser={this.state.currentUser} />
        <ChatBar
          currentUser={this.state.currentUser.name}
          newMessage={this.newMessage}
          nameChange={this.nameChange} />

      </div>
    );
  }
}
export default App;

import React, {Component} from 'react';

class ChatBar extends Component {
    constructor(props){
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress = function(event) {
        if(event.key === 'Enter'){
            console.log(event.target.value) 
            this.props.newChat(event.target.value);  
            event.target.value="" 
        }
    }



    render() {
    console.log('Rendering <ChatBar/>');
      return (
        <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.username} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleKeyPress} />
        </footer>
      );
    }
    
  }
  export default ChatBar;
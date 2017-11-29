import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    render() {
    console.log('Rendering <MessageList/>');

    
    const message = this.props.messages.map((messageDataObject, index)=> {
        return <Message 
        message={messageDataObject}
        key={index}/>;
    });
      return (
        <div>
        {message}
        </div>
      );
    }
  }

  export default MessageList;
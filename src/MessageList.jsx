import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }
    render() {
    
    const message = this.props.messages.map((messageData, index)=> {
        return <Message 
        message={messageData}
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
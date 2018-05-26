import React from 'react';
import Flash from '../../lib/Flash';

class FlashMessage extends React.Component {

  state = {
    messages: null
  }

  componentWillUpdate() {
    const messages = Flash.getMessages();

    if(!messages) return false;

    this.setState({ messages });
    Flash.clearMessages();

    setTimeout(() => this.setState({ messages: null }), 3000);
  }

  render() {
    return (
      <div>
        {this.state.messages && Object.keys(this.state.messages).map(type =>
          <div key={type} className={`notification is-${type}`}>{this.state.messages[type]}</div>
        )}
      </div>
    );
  }
}

export default FlashMessage;

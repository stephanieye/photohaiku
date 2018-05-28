import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';
import Form from './Form';

class AuthLogin extends React.Component {
  state ={};

  handleChange = ({target: {name, value}}) => {
    this.setState({[name]: value});
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/login', this.state)
      .then(res => {
        Auth.setToken(res.data.token);
        Flash.setMessage('welcome', res.data.message);
      })
      .then(()=>
        this.props.history.push('/createpoem'))
      .catch(()=> {
        Flash.setMessage('denied', 'sorry, either your email address or password is wrong, or you are not registered.');
        this.props.history.replace('/login');
      });
  }


  render() {
    return (

    <Form
      handleSubmit={this.handleSubmit}
      handChange={this.handleChange}
    />
    );
  }
}

export default AuthLogin;

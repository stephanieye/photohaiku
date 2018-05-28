import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';
import Form from '../users/Form';

class AuthRegister extends React.Component {
  state ={
    errors: {}
  };

  handleChange = ({target: {name, value}}) => {
    this.setState({[name]: value});
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [name]: ''
      }
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/register', this.state)
      .then(res => {
        Auth.setToken(res.data.token);
        Flash.setMessage('welcome', res.data.message);
      })
      .then(()=>
        this.props.history.push('/createpoem'))
      .catch((err)=> {
        console.log(err.response.data.errors);
        this.setState({errors: err.response.data.errors});
        this.props.history.replace('/register');
      });
  }


  render() {
    return (
      <Form
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        errors={this.state.errors}
        user={this.state}
      />
    );
  }
}

export default AuthRegister;

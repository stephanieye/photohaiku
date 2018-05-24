import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

class AuthRegister extends React.Component {
  state ={};

  handleChange = ({target: {name, value}}) => {
    this.setState({[name]: value});
  }

  handleRegister = (e) => {
    e.preventDefault();

    axios.post('/api/register', this.state)
      .then(res => {
        Auth.setToken(res.data.token);
        Flash.setMessage('info', res.data.message);
      })
      .then(()=>
        this.props.history.push('/poems'))
      .catch(()=> {
        Flash.setMessage('danger', 'Invalid credentials...');
        this.props.history.replace('/login');
      });
  }


  render() {
    return (
      <form onSubmit={this.handleRegister}>
        <div className="field">
          <input
            className="input"
            name="username"
            placeholder="username"
            onChange={this.handleChange}/>
        </div>
        <div className="field">
          <input
            className="input"
            name="email"
            placeholder="email"
            onChange={this.handleChange}/>
        </div>
        <div className="field">
          <input
            type="password"
            className="input"
            name="password"
            placeholder="password"
            onChange={this.handleChange}/>
        </div>
        <div className="field">
          <input
            type="password"
            className="input"
            name="passwordConfirmation"
            placeholder="passwordConfirmation"
            onChange={this.handleChange}/>
        </div>
        <button className ="button is-primary">Submit</button>
      </form>
    );
  }
}

export default AuthRegister;

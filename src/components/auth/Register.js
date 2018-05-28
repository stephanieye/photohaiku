import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

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

  handleRegister = (e) => {
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
      <form onSubmit={this.handleRegister}>
        <div className="field">
          <input
            className="input"
            name="username"
            placeholder="username"
            onChange={this.handleChange}/>
          {this.state.errors.username && <p className= 'subtitle is-5'>{this.state.errors.username}</p>}
        </div>
        <div className="field">
          <input
            className="input"
            name="email"
            placeholder="email"
            onChange={this.handleChange}/>
          {this.state.errors.email && <p className= 'subtitle is-5'>{this.state.errors.email}</p>}
        </div>
        <div className="field">
          <input
            type="password"
            className="input"
            name="password"
            placeholder="password"
            onChange={this.handleChange}/>
          {this.state.errors.password && <p className= 'subtitle is-5'>{this.state.errors.password}</p>}
        </div>
        <div className="field">
          <input
            type="password"
            className="input"
            name="passwordConfirmation"
            placeholder="password"
            onChange={this.handleChange}/>
          {this.state.errors.passwordConfirmation && <p className= 'subtitle is-5'>{this.state.errors.passwordConfirmation}</p>}
        </div>
        <button className ="button is-create">submit</button>
      </form>
    );
  }
}

export default AuthRegister;

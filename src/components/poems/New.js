import React from 'react';
import Form from './Form';
import axios from 'axios';
import Auth from '../../lib/Auth';


class PoemsNew extends React.Component {
  state = {
    errors: {}
  }

  handleChange = ({ target: { name, value } }) => {
    const errors = {...this.state.errors, [name]: ''};
    this.setState({ errors, [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/poems', this.state, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/poems'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    return <Form
      data={this.state}
      handleChange={this.handleChange}
      handleSubmit={this.handleSubmit}
      errors={this.state.errors}
    />;
  }
}

export default PoemsNew;

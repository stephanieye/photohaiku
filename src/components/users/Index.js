import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class UsersIndex extends React.Component {
  state = {
    users: []
  }

  componentDidMount() {
    axios.get('/api/users')
      .then(res => this.setState({users: res.data}));
  }



  render() {
    return (
      <section>
        <div className="columns is-multiline">
          {this.state.users.map(user =>
            <div className="column is-one-third-desktop is-half-tablet" key={user._id}>
              <Link to={`/users/${user._id}`}>
                <p className="title is-4">{user.username}</p>
              </Link>
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default UsersIndex;

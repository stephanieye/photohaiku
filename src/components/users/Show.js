import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';



class UsersShow extends React.Component {

  state = {
    user: null,
    errors: {},
    poem: {}
  }


  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({user: res.data}));
  }

  handlePoemDelete = (poem) => {
    axios.delete(`/api/users/${this.props.match.params.id}/poems/${poem._id}`
      , {
        headers: {Authorization: `Bearer ${Auth.getToken()}`
        }
      }
    )
      .then(res => this.setState({user: res.data}));
  }

  render() {
    const {user} = this.state;
    if(!user) return null;

    return (
      <section>
        <div className='box'>
          <h1 className='title is-1'>{user.username}</h1>
          { Auth.isAuthenticated() && (Auth.getPayload().sub === user._id) && <Link to={`/users/${user._id}/edit`} className="button">Edit</Link>}
        </div>

        <div className="columns is-multiline">

          {user.poems.map(poem =>
            <div className="column is-one-third-desktop is-half-tablet" key={poem._id}>

              <div className="card">
                <div
                  className="card-image"
                  style={{ backgroundImage: `url(${poem.image})` }}
                ></div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="subtitle is-7">Created {poem.createdAtRelative}</p>
                      <ul>
                        <li>{poem.haiku[0].line1}</li>
                        <li>{poem.haiku[0].line2}</li>
                        <li>{poem.haiku[0].line3}</li>
                      </ul>
                    </div>
                  </div>

                  { Auth.isAuthenticated() && (Auth.getPayload().sub === user._id) &&
                  <button className="button is-danger" onClick= {() => {
                    this.handlePoemDelete(poem);
                  }}>Delete this poem</button> }
                </div>
              </div>
            </div> )}

        </div>

      </section>);
  }
}

export default UsersShow;

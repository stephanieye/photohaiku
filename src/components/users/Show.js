import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import _ from 'lodash';



class UsersShow extends React.Component {

  state = {
    user: null,
    poems: [],
    userpoems: [],
    errors: {},
    poem: {}
  }


  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => {
        this.setState({user: res.data});
        return this.state.user;
      })
      .then(() => {
        axios.get('/api/poems')
          .then(res => {
            this.setState({poems: res.data});
            this.userpoems();
          });
      });
  }

  userpoems = () => {
    this.setState({userpoems: _.filter(this.state.poems, (poem) => poem.poet._id === this.state.user._id)});
    console.log(this.state.userpoems);
  }


  render() {
    const user = this.state.user;
    const userpoems = this.state.userpoems;
    if(!user) return null;

    return (
      <section>

        <div className='columns'>
          <div className='column'>
            <h2>{user.username}</h2>
          </div>
          { Auth.isAuthenticated() && (Auth.getPayload().sub === user._id) && <div className='column has-text-right-desktop has-text-right-tablet'><Link to={`/users/${user._id}/edit`} className="button is-create">edit your profile</Link></div>}
        </div>

        <div className="columns is-multiline">
          {userpoems.map(poem =>
            <div className="column is-one-third-desktop is-half-tablet" key={poem._id}>

              <div className="card">
                <Link to={`/poems/${poem._id}`}>
                  <div className="card-image"
                    style={{ backgroundImage: `url(${poem.image})` }}
                  ></div>
                </Link>
                <div className="card-content">
                  <Link to={`/users/${poem.poet._id}`}><h3>{poem.poet.username}</h3></Link>
                  <p className='subtitle is-6'>{poem.createdAtRelative}</p>
                  <div>
                    <p> {poem.haiku[0].line1} </p>
                    <p> {poem.haiku[0].line2} </p>
                    <p> {poem.haiku[0].line3} </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </section>);
  }
}

export default UsersShow;

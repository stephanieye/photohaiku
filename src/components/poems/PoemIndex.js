import React from 'react';
import axios from 'axios';
import Poem from './Poem.js';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';

class PoemIndex extends React.Component {
  state = {
    poems: [],
    poem: {}
  }

  componentDidMount() {
    axios.get('/api/poems')
      .then(res => this.setState({poems: res.data}));
  }

  starred = (poem) => {
    console.log(Auth.getPayload().sub);
    if (!poem.stars.includes(Auth.getPayload().sub)) {
      const newstar = poem.stars.push(Auth.getPayload().sub);
      this.setState({...poem, [poem.stars]: newstar});
      console.log(poem);
      axios.put(`/api/poems/${poem._id}`, poem, {
        headers: {Authorization: `Bearer ${Auth.getToken()}`}
      });
    } else {
      const index = poem.stars.indexOf(Auth.getPayload().sub);
      if (index > -1) {
        const newstar = poem.stars.splice(index, 1);
        this.setState({...poem, [poem.stars]: newstar});
        console.log(poem);
        axios.put(`/api/poems/${poem._id}`, poem, {
          headers: {Authorization: `Bearer ${Auth.getToken()}`}
        });
      }
    }
  }

  render() {
    return (
      <section>
        <div className="columns is-multiline">
          {this.state.poems.map(poem =>
            <div className="column is-one-third-desktop is-half-tablet" key={poem._id}>
              <p className='has-text-right dotdotdot'><Link to={`/poems/${poem._id}`}>&#8226;&#8226;&#8226;</Link></p>
              <Poem
                poem={poem}
                starred={() => this.starred(poem)}
              />

            </div>
          )}
        </div>
      </section>
    );
  }
}

export default PoemIndex;

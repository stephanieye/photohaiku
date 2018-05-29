import React from 'react';
import axios from 'axios';
import Poem from './Poem.js';
import Auth from '../../lib/Auth';

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
    }
  }

  render() {
    return (
      <section>
        <div className="columns is-multiline">
          {this.state.poems.map(poem =>
            <div className="column is-one-third-desktop is-half-tablet" key={poem._id}>

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

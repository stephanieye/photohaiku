import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Poem from './Poem.js';

class PoemIndex extends React.Component {
  state = {
    poems: []
  }

  componentDidMount() {
    axios.get('/api/poems')
      .then(res => this.setState({poems: res.data}));
  }



  render() {
    return (
      <section>
        <div className="columns is-multiline">
          {this.state.poems.map(poem =>
            <div className="column is-one-third-desktop is-half-tablet" key={poem._id}>
              <Link to={`/poems/${poem._id}`}>
                <Poem
                  poem={poem}
                />
              </Link>
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default PoemIndex;

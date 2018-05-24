import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class PoemsIndex extends React.Component {
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
                <div className="card">
                  <div
                    className="card-image"
                    style={{ backgroundImage: `url(${poem.image})` }}
                  ></div>
                  <div className="card-content">
                    <div className="media">
                      <div className="media-content">
                        <p className="title is-4">{poem.haiku}</p>
                        <p className="subtitle is-6">{poem.poet.username}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default PoemsIndex;

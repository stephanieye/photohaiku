import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
                <div className="card">
                  <div className="card-image"
                    style={{ backgroundImage: `url(${poem.image})` }}
                  ></div>
                  <div className="card-content">
                    <p className="subtitle is-6">by {poem.poet.username}</p>
                    <p className="subtitle is-6">{poem.createdAtRelative}</p>
                    <div>
                      <p> {poem.haiku[0].line1} </p>
                      <p> {poem.haiku[0].line2} </p>
                      <p> {poem.haiku[0].line3} </p>
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

export default PoemIndex;

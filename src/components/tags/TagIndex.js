import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class TagIndex extends React.Component {
  state = {
    tags: []
  }

  componentDidMount() {
    axios.get('/api/tags')
      .then(res => this.setState({tags: res.data}));
  }


  render() {
    return (
      <section>
        <p className='has-text-centered'>
          {this.state.tags.map(tag =>
            <span className="hashtag" key={tag._id}><Link to={`/tags/${tag.noun}`}>
              #{tag.noun}
            </Link></span>
          )}
        </p>
      </section>
    );
  }
}

export default TagIndex;

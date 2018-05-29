import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';
import Poem from './Poem';


class PoemShow extends React.Component {
  state = {
    poem: null,
    errors: {}
  }

  componentDidMount() {
    axios.get(`/api/poems/${this.props.match.params.id}`)
      .then(res => {
        this.setState({poem: res.data});
      });
  }


  handleDelete = () => {
    axios.delete(`/api/poems/${this.props.match.params.id}`, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push(`/users/${Auth.getPayload().sub}`));
  }



  render() {
    const {poem} = this.state;

    if(!poem) return null;
    return (
      <section>
        {poem.haiku &&
          <Poem
            poem={poem} />
        }
        <br />
        {Auth.getPayload().sub === poem.poet._id &&
          <div className='has-text-centered'>
            <button className='button is-destroy' onClick={this.handleDelete}>delete this photohaiku</button>
          </div>}

      </section>
    );
  }
}

export default PoemShow;

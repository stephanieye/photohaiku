import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';


class PoemShow extends React.Component {
  state = {
    poem: null,
    errors: {}
  }

  componentDidMount() {
    axios.get(`/api/poems/${this.props.match.params.id}`)
      .then(res => this.setState({poem: res.data}));
  }

  // arrow functions are the best in react as you can use them in callbacks
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

        <div className="card">
          <div className="card-image" style={{ backgroundImage: `url(${poem.image})` }}>
          </div>
          <div className="card-content">
            <div className="content">
              <p> {poem.haiku[0].line1} </p>
              <p> {poem.haiku[0].line2} </p>
              <p> {poem.haiku[0].line3} </p>
            </div>
            <button className= 'button is-danger' onClick={this.handleDelete}>Delete this photohaiku</button>
          </div>
        </div>

      </section>
    );
  }
}

export default PoemShow;

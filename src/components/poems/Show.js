import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import CommentForm from './CommentForm';


class PoemsShow extends React.Component {
  state = {
    poem: null,
    errors: {},
    comment: {}
  }

  handleChange = ({ target: { name, value } }) => {
    const comment = {...this.state.comment, [name]: value};
    this.setState({ comment, [name]: value });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    const {id} = this.props.match.params;
    axios.post(`/api/poems/${id}/comments`, this.state.comment, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({poem: res.data, comment: {} }))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  handleCommentDelete = (comment) => {
    axios.delete(`/api/poems/${this.props.match.params.id}/comments/${comment._id}`, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({poem: res.data}));
  }

  componentDidMount() {
    axios.get(`/api/poems/${this.props.match.params.id}`)
      .then(res => this.setState({poem: res.data}));
  }

  handleDelete = () => {
    axios.delete(`/api/poems/${this.props.match.params.id}`, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/poems'));
  }



  render() {
    const {poem} = this.state;

    if(!poem) return null;
    return (
      <section>
        <div className="columns">
          <div className="column">
            <div className="largeimage" style={{ backgroundImage: `url(${poem.image})` }} />
          </div>
          <div className='column'>
            <h1 className='title is-1'>{poem.haiku}</h1>
            <h2 className='subtitle is-2'>{poem.poet.username}</h2>
            <p>Rating: {'⭐️'.repeat(poem.avgRating)}</p>

            <Link to={`/poems/${poem._id}/edit`} className="button">Edit</Link>
            <button className="button is-danger" onClick= {this.handleDelete}>Delete</button>


          </div>
        </div>
        <div className= 'box'>
          <h1 className='title is-1'>Comments</h1>
          {poem.comments && <div>
            {poem.comments.map(comment =>
              <div key={comment._id}>
                <p className="title is-4">{comment.content}</p>
                <p className="title is-4">{'⭐️'.repeat(comment.rating)}</p>
                <p className="subtitle is-4">Posted by {comment.createdBy.username}, {comment.createdAtRelative}</p>

                { Auth.isAuthenticated() && (Auth.getPayload().sub === comment.createdBy._id) && <button className="button is-danger" onClick= {() => {
                  this.handleCommentDelete(comment);
                }}>Delete this comment</button>}
                <hr />

              </div>
            )}
          </div>}
        </div>
        {  Auth.isAuthenticated() && <CommentForm

          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errors={this.state.errors}
          comment={this.state.comment}

        /> }
      </section>
    );
  }
}

export default PoemsShow;

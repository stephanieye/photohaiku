import React from 'react';
import axios from 'axios';
import Form from './users/Form';
import Auth from '../lib/Auth';


class PoemNew extends React.Component {

  state = {
    user: null,
    errors: {},
    poem: {},
    blank: 0,
    nounscollection: [],
    adjectivescollection: [],
    noun1sarray: [],
    noun2sarray: [],
    noun3sarray: [],
    adj1sarray: [],
    adj2sarray: [],
    adj3sarray: []
  }

  componentDidMount() {
    axios.get(`/api/users/${Auth.getPayload().sub}`)
      .then(res => {
        this.setState({user: res.data});
      });
  }

  handleChange = ({ target: { name, value } }) => {
    const poem = {...this.state.poem, [name]: value};
    this.setState({ poem, [name]: value });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`/api/users/${Auth.getPayload().sub}/poems`, this.state.poem, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => {
        this.setState({user: res.data, poem: {} });
        const newku = this.state.user.poems[(this.state.user.poems.length)-1];
        // this.makenounsarrays(newku);
        this.makeadjectivesarrays(newku);
        if (this.state.blank === 0) {
          document.getElementsByClassName('kudisplay')[0].style.display = 'block';
          this.setState({blank: 1});
        }
      });
      // .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  makeadjectivesarrays = (newku) => {
    var string = newku.nouns[0];
    console.log(string);
    // var stringplus = string.replace(/\s+/g, '+');
    // axios.get(`http://api.datamuse.com/words?rel_jjb=${stringplus}&md=s&max=20`)
    //   .then(res => {
    //     this.setState({adjectivescollection: res.data});
    //     this.state.adjectivescollection.forEach((adj) => {
    //       if (adj.numSyllables === 1) {
    //         this.state.adj1sarray.push(adj.word);
    //       } else if (adj.numSyllables === 2) {
    //         this.state.adj2sarray.push(adj.word);
    //       } else if (adj.numSyllables === 3) {
    //         this.state.adj3sarray.push(adj.word);
    //       }
    //     }
    //     );
    //     console.log('adj1', this.state.adj1sarray);
    //     console.log('adj2', this.state.adj2sarray);
    //     console.log('adj3', this.state.adj3sarray);
    //   });
  }

  makenounsarrays = (newku) => {
    var string = newku.nouns[0];
    // var stringplus = string.replace(/\s+/g, '+');
    // console.log(stringplus);
    // axios.get(`http://api.datamuse.com/words?ml=${stringplus}&md=ps&max=30`)
    //   .then(res => {
    //     this.setState({nounscollection: res.data});
    //     this.state.nounscollection.forEach((noun) => {
    //       if ((noun.numSyllables === 1) && (noun.tags.includes('n'))) {
    //         this.state.noun1sarray.push(noun.word);
    //       } else if ((noun.numSyllables === 2) && (noun.tags.includes('n'))) {
    //         this.state.noun2sarray.push(noun.word);
    //       } else if ((noun.numSyllables === 3) && (noun.tags.includes('n'))) {
    //         this.state.noun3sarray.push(noun.word);
    //       }
    //     }
    //     );
    //     console.log('noun1', this.state.noun1sarray);
    //     console.log('noun2', this.state.noun2sarray);
    //     console.log('noun3', this.state.noun3sarray);
    //   });
  };




  render() {
    const {user} = this.state;
    if(!user) return null;
    const ku = this.state.user.poems[(this.state.user.poems.length)-1];

    return (
      <section>
        <h1>Create a haiku</h1>

        <div className='kudisplay'>
          <div className="card">
            <div className="card-image" style={{ backgroundImage: `url(${ku.image})` }}>
            </div>
            <div className="card-content">
              <div className="content">
                <p className="title is-4">{ku.haiku}</p>
                <p className="subtitle is-6">{ku.nouns[0]}</p>
                <p className="subtitle is-6">{ku.nouns[1]}</p>
                <p className="subtitle is-6">{ku.nouns[2]}</p>
                <button onClick={() => {
                  this.magic(ku);
                }}>magic</button>

              </div>
            </div>
          </div>
        </div>



        <Form
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errors={this.state.errors}
          poem={this.state.poem}
        />

      </section>
    );
  }
}

export default PoemNew;

import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';


const Poem = ({ poem, starred }) => {

  return (
    <div className="card">
      <div className="card-image"
        style={{ backgroundImage: `url(${poem.image})` }}
      ></div>
      <div className="card-content">
        <div className='columns is-mobile is-gapless'>
          <div className='column'>

            {Auth.isAuthenticated() && <h5><Link to={`/users/${poem.poet._id}`}>{poem.poet.username}</Link></h5>}
            {!Auth.isAuthenticated() && <h5>a photohaiku poet</h5>}

            <p className="subtitle is-6">{poem.createdAtRelative}</p>
          </div>
          {Auth.isAuthenticated() && <div className='column is-one-quarter has-text-right'>
            <p>

              {(!poem.stars.includes(Auth.getPayload().sub)) && <span onClick={starred}>&#9734;</span>}
              {(poem.stars.includes(Auth.getPayload().sub)) && <span onClick={starred}>&#9733;</span>}

            </p>

            <p className='subtitle is-6'>{poem.stars.length} stars</p>
          </div>}
        </div>
        <div>
          <p> {poem.haiku[0].line1} </p>
          <p> {poem.haiku[0].line2} </p>
          <p> {poem.haiku[0].line3} </p>
          <p className='subtitle is-6'> {poem.haiku[0].attr} </p>
        </div>
      </div>
    </div>
  );
};

export default Poem;

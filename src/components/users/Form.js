import React from 'react';
import Auth from '../../lib/Auth';

const Form = ({ handleChange, handleSubmit, user, errors }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="username">username</label>
        {errors.username && <p className= 'subtitle is-5 italics'>{errors.username}</p>}
        <input
          className="input"
          name="username"
          placeholder="username"
          value={user.username || ''}
          onChange={handleChange}/>

      </div>
      <div className="field">
        <label htmlFor="email">email</label>
        {errors.email && <p className= 'subtitle is-5 italics'>{errors.email}</p>}
        <input
          className="input"
          name="email"
          placeholder="email address"
          value={user.email || ''}
          onChange={handleChange}/>

      </div>
      <div className="field">
        <label htmlFor="password">password</label>
        {errors.password && <p className= 'subtitle is-5 italics'>{errors.password}</p>}
        <input
          type="password"
          className="input"
          name="password"
          placeholder="password"
          onChange={handleChange}/>

      </div>
      <div className="field">
        <label htmlFor="passwordConfirmation">password confirmation</label>
        {errors.password && <p className= 'subtitle is-5 italics'>{errors.password}</p>}
        {errors.passwordConfirmation && <p className= 'subtitle is-5 italics'>{errors.passwordConfirmation}</p>}
        <input
          type="password"
          className="input"
          name="passwordConfirmation"
          placeholder="password confirmation"
          onChange={handleChange}/>

      </div>
      <div className='has-text-centered-mobile'>
        {!Auth.isAuthenticated() && <button className ="button is-create">register</button>}
        {Auth.isAuthenticated() && <button className ="button is-create">update</button>}
      </div>
    </form>
  );
};

export default Form;

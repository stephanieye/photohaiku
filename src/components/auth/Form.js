import React from 'react';

const Form = ({ handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="email">email address</label>
        <input
          className="input"
          name="email"
          placeholder="please enter your email address"
          onChange={handleChange}/>
      </div>
      <div className="field">
        <label htmlFor="password">password</label>
        <input
          type="password"
          className="input"
          name="password"
          placeholder="please enter your password"
          onChange={handleChange}/>
      </div>
      <div className='has-text-centered-mobile'>
        <button className ="button is-create">log in</button>
      </div>
    </form>
  );
};

export default Form;

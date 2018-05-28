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
      <button className ="button is-create">submit</button>
    </form>
  );
};

export default Form;

import React from 'react';

const Form = ({ handleChange, handleSubmit, user, errors }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="username">username</label>
        <input
          className="input"
          name="username"
          placeholder="username"
          value={user.username || ''}
          onChange={handleChange}/>
        {errors.username && <p className= 'subtitle is-5'>{errors.username}</p>}
      </div>
      <div className="field">
        <label htmlFor="email">email</label>
        <input
          className="input"
          name="email"
          placeholder="email address"
          value={user.email || ''}
          onChange={handleChange}/>
        {errors.email && <p className= 'subtitle is-5'>{errors.email}</p>}
      </div>
      <div className="field">
        <label htmlFor="password">password</label>
        <input
          type="password"
          className="input"
          name="password"
          placeholder="password"
          onChange={handleChange}/>
        {errors.password && <p className= 'subtitle is-5'>{errors.password}</p>}
      </div>
      <div className="field">
        <label htmlFor="passwordConfirmation">password confirmation</label>
        <input
          type="password"
          className="input"
          name="passwordConfirmation"
          placeholder="password confirmation"
          onChange={handleChange}/>
        {errors.passwordConfirmation && <p className= 'subtitle is-5'>{errors.passwordConfirmation}</p>}
      </div>
      <button className ="button is-create">submit</button>
    </form>
  );
};

export default Form;

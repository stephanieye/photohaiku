import React from 'react';

const Form = ({ handleChange, handleSubmit, user, errors }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="username">username</label>
        {errors.username && <p className= 'subtitle is-5'>{errors.username}</p>}
        <input
          className="input"
          name="username"
          placeholder="username"
          value={user.username || ''}
          onChange={handleChange}/>

      </div>
      <div className="field">
        <label htmlFor="email">email</label>
        {errors.email && <p className= 'subtitle is-5'>{errors.email}</p>}
        <input
          className="input"
          name="email"
          placeholder="email address"
          value={user.email || ''}
          onChange={handleChange}/>

      </div>
      <div className="field">
        <label htmlFor="password">password</label>
        {errors.password && <p className= 'subtitle is-5'>{errors.password}</p>}
        <input
          type="password"
          className="input"
          name="password"
          placeholder="password"
          onChange={handleChange}/>

      </div>
      <div className="field">
        <label htmlFor="passwordConfirmation">password confirmation</label>
        {errors.password && <p className= 'subtitle is-5'>{errors.password}</p>}
        {errors.passwordConfirmation && <p className= 'subtitle is-5'>{errors.passwordConfirmation}</p>}
        <input
          type="password"
          className="input"
          name="passwordConfirmation"
          placeholder="password confirmation"
          onChange={handleChange}/>

      </div>
      <button className ="button is-create">submit</button>
    </form>
  );
};

export default Form;

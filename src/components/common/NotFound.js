import React from 'react';

const NotFound = () => {
  return(
    <div className='instructions'>
      <p>alas! what you seek</p>
      <p>does not appear to exist:</p>
      <p>my apologies.</p>
      <p className='subtitle is-6'>&hearts; <span className='italics'>the photohaiku robot</span></p>

      <h3><a href='/'>return home</a></h3>
    </div>
  );
};

export default NotFound;

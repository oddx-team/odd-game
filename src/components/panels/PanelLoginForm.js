import React from 'react';
import './PanelLoginForm.scss';

const PanelLoginForm = (props) => {
  const switchToRegister = (e) => {
    e.preventDefault();
    props.switchForm();
  };

  return (
    <form className='form-login'>
      <div className='title'>Sign in</div>
      <div className='username'>
        <input type='text' placeholder='Nickname' />
      </div>
      <div className='password'>
        <input type='password' placeholder='Password' />
      </div>

      <button className='btn-signin' type='submit'>
        <span>Sign in</span>
      </button>
      <button className='btn-register' onClick={switchToRegister}>
        <span>Sign up?</span>
      </button>
    </form>
  );
};

export default PanelLoginForm;
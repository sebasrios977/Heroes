import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../';

export const LoginPages = () => {

  const navigate = useNavigate();
  const {onLoginUser} = useContext(AuthContext);

  const onLogin = () => {

    const lastPath = localStorage.getItem('lastPath') || '/';

    onLoginUser('Sebastian Rios');

    navigate(lastPath, {
      replace: true,
    });
  }


  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <hr />

      <button
        className='btn btn-primary'
        onClick={onLogin}
      >
        Login
      </button>
    </div>
  )
}

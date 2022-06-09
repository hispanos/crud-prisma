import React, { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../routes/Routes';

const Login = () => {
  const { session, setSession } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!session) {
    return (
      <div>Login</div>
    )
  }else {
    return <Navigate to={'/'} />
  }

}

export default Login
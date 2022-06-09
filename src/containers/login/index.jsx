import React, { useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../routes/Routes';
import * as yup from 'yup';
import es from 'yup-es'

import './style.scss';
import Header from '../../components/header';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { login } from '../../services';

yup.setLocale(es)

const schema = yup.object({
  user: yup.string().required(),
  password: yup.string().min(5).required()
}).required()

const Login = () => {
  const { session, setSession } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const response = await login(data.user, data.password);
      if (response.login) {
        setSession(response);
        sessionStorage.setItem('session', JSON.stringify(response))
        navigate('/');
      }else {
        setError({message: response.mensaje})
      }
    } catch (error) {
      setError({message: "Hubo un problema al ingresar"})
    }
  }

  if (!session) {
    return (
      <div className="login">
        <Header />
        <main className='login__main'>
          <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <label>
              User
              <input
                type="text"
                placeholder='User'
                {...register('user', { required: true })}
              />
              {errors.user &&
                <span className='form__error'>{errors.user?.message}</span>
              }
            </label>
            <label>
              Password
              <input
                type="password"
                placeholder='Password'
                {...register('password', { required: true })}
              />
              {errors.password &&
                <span className='form__error'>{errors.password?.message}</span>
              }
            </label>
            {error &&
                <span className='form__error'>{error.message}</span>
            }
            <button type='submit'>Login</button>
          </form>
        </main>
      </div>
    )
  } else {
    return <Navigate to={'/'} />
  }

}

export default Login
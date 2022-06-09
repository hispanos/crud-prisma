import React, { useContext, useEffect, useState } from 'react';
import Move from '../../components/card';
import Header from '../../components/header';
import { AuthContext } from '../../routes/Routes';
import { getMoves } from '../../services';

import './style.scss';

const Home = () => {

  const [loading, setLoading] = useState(true);
  const [dataMoves, setDataMoves] = useState(null);
  const { session: { username }, setSession } = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getMoves(username);
        console.log(data)
        setDataMoves(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    getData();
  }, [])

  const handleLogout = () => {
    sessionStorage.clear();
    setSession(null);
  }


  return (
    <div className='home'>
      <Header />
      <main className='main'>
        <section className='head'>
          <h1>Movimientos</h1>
          <button className='button__logout' onClick={handleLogout}>Cerrar Sesión</button>
        </section>
        {
          !loading &&
          <section className='moves'>
            {dataMoves.map((move, index) => (
              <Move key={index} move={move} />
            ))}
          </section>
        }

      </main>
      <footer className='footer'>
        <button className='button__add'>+</button>
      </footer>
    </div>
  )
}

export default Home
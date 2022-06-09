import React, { useContext, useEffect, useState } from 'react';
import Move from '../../components/card';
import Header from '../../components/header';
import { AuthContext } from '../../routes/Routes';
import { getMoves } from '../../services';
import Form from './form';

import './style.scss';

const Home = () => {

  const [loading, setLoading] = useState(true);
  const [dataMoves, setDataMoves] = useState([]);
  const { session: { username }, setSession, setShowModal } = useContext(AuthContext);
  const [isEdit, setIsEdit] = useState(false);
  const [dataModal, setDataModal] = useState({})

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getMoves(username);
        setDataMoves(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    getData();
  }, [loading, username])

  const handleLogout = () => {
    sessionStorage.clear();
    setSession(null);
  }

  const handleAdd = () => {
    setIsEdit(false);
    setDataModal({});
    setShowModal(true);
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
              <Move key={index} move={move} username={username} setIsEdit={setIsEdit} setDataModal={setDataModal} setShowModal={setShowModal} />
            ))}
          </section>
        }

      </main>
      <footer className='footer'>
        <button className='button__add' onClick={handleAdd}>+</button>
      </footer>
      <Form username={username} setLoading={setLoading} loading={loading} isEdit={isEdit} dataModal={dataModal} />
    </div>
  )
}

export default Home
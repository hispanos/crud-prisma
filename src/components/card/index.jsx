import React from 'react';
import { formatDate } from '../../helpers/date';
import { currency } from '../../helpers/numbers';
import { getMove } from '../../services';

import './style.scss';

const Move = ({ move, username, setIsEdit, setDataModal, setShowModal }) => {

  const handleClick = async () => {
    setIsEdit(true);
    setDataModal(move);
    try {
      const response = await getMove(move.id, username);
      setDataModal(response);
      setShowModal(true);
    } catch (error) {
      
    }
  }

  return (
    <article className='move' onClick={handleClick}>
      <div className='move__description'>
        <span>{formatDate(move.date_bill)}</span>
        <span>{move.observation}</span>
      </div>
      <span>{currency(move.value, move.type)}</span>
    </article>
  )
}

export default Move
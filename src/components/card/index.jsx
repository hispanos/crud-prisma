import React from 'react';
import { formatDate } from '../../helpers/date';
import { currency } from '../../helpers/numbers';

import './style.scss';

const Move = ({move}) => {
  return (
    <article className='move'>
      <div className='move__description'>
        <span>{formatDate(move.date_bill)}</span>
        <span>{move.observation}</span>
      </div>
      <span>{currency(move.value)}</span>
    </article>
  )
}

export default Move
import React from 'react';

import logo from '../../assets/images/prisma_digital_logo.png';
import './style.scss'

const Header = () => {
    return (
        <header className='header'>
            <picture>
                <img src={logo} alt="Prisma Digital" className='header__image' />
            </picture>
        </header>
    )
}

export default Header
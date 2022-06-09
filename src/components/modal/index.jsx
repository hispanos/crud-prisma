import React, { useContext, useRef } from 'react';
import { AuthContext } from '../../routes/Routes';

import './style.scss';

const Modal = ({ children, dataModal }) => {

    const { showModal, setShowModal } = useContext(AuthContext);
    const modal = useRef(null);

    const handleClick = ({target}) => {
        if (target === modal.current) {
            setShowModal(false);
        }
    }

    return (
        <div className={`modal ${!showModal ? 'modal-hide' : ''}`} onClick={handleClick} ref={modal}>
            <div className="modal__content">
                <span className="modal__close" onClick={() => {setShowModal(false)}}>&times;</span>
                {children}
            </div>
        </div>
    )
}

export default Modal
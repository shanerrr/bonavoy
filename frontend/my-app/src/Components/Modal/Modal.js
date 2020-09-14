import React from 'react';
import './style.css';

const Modal = ({
  handleClose, 
  show, 
  children,
  className
}) => {
  const showHideClassName = show ? "modal-background display-block" : "modal-background display-none";

  return ( 
    <div className={showHideClassName}>
      <section className={`modal-menu ${className}`}>
        {children}
        <button onClick={handleClose}>TODO close in the top right</button>
      </section>
    </div>
  )
}

export default Modal;
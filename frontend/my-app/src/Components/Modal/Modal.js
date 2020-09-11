import React from 'react';
import ReactDom from 'react-dom';
import './style.css';

const Modal = ({
  handleClose, 
  show, 
  children,
  className
}) => {
  const showHideClassName = show ? "modal-background display-block" : "modal-background display-none";
  return ReactDom.createPortal(
    <>
      <div className={showHideClassName}>
        <section className={`modal-menu ${className}`}>
          {children}
          <button onClick={handleClose}>close in the top right</button>
        </section>
      </div>
    </>, document.getElementById('portal')
  )
}

export default Modal;
import React from 'react';
import ReactDom from 'react-dom';
import './Modal.css';

// instead of setting the class name as a div, just make a new component. Will make this more feasible

const Modal = ({
  handleClose, 
  show, 
  children,
  className
}) => {
  if (show) document.body.style.overflow = 'hidden';
  else{
    document.body.style.overflow = 'unset';
  }

  const showHideClassName = show ? "modal-background display-block" : "modal-background display-none";
  return ReactDom.createPortal(
    <>
      <div className={`${showHideClassName}`}>
        <div className={`${className} active`}>
          {children}
        </div>
        {/* <i className='modal-main-x fas fa-times' onClick={handleClose}/> */}
        {/* might use this later for like a global close for modal, maybe... */}

      </div>
    </>, document.getElementById('portal')
  )
}

export default Modal;
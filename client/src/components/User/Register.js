import React, { useRef } from "react";
import "./Registration.scss";
import { MdClose } from 'react-icons/md';

export default function Register({showRegister, setShowRegister}) {
  const registerRef = useRef();

  const closeRegister = (event) => {
    if(registerRef.current === event.target) {
      setShowRegister(false);
    }
  };

  return (
    <>
    {showRegister ? (
        <div className="background" ref={registerRef} onClick={closeRegister}>
          <div className="registerWrapper" showRegister={showRegister}>
            <MdClose className="closeRegisterButton" aria-label="Close register" onClick={() => setShowRegister(prev => !prev)}/>
          </div>
        </div>
      ) : null
    }
    </>
  );
}
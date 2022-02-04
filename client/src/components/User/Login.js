import React, { useRef } from "react";
import "./Login.scss";
import { MdClose } from 'react-icons/md';

export default function Login({showLogin, setShowLogin}) {
  const loginRef = useRef();

  const closeLogin = (event) => {
    if(loginRef.current === event.target) {
      setShowLogin(false);
    }
  };

  return (
    <>
    {showLogin ? (
        <div className="background" ref={loginRef} onClick={closeLogin}>
          <div className="loginWrapper" showRegister={showLogin}>
            <MdClose className="closeLoginButton" aria-label="Close login" onClick={() => setShowLogin(prev => !prev)}/>
          </div>
        </div>
      ) : null
    }
    </>
  );
}
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
            <form className="form">
              <h1 className="form--title">Register an Account</h1>
              <div className="form--info">
              <div className="form--name">
                <div>
                  <label>First Name   </label>
                  <input name="firstName" type="text" maxlength="40" />
                </div>
                <div>
                  <label>Last Name   </label>
                  <input name="lastName" type="text" maxlength="40" />
                </div>
              </div>
              <div className="form--email">
                <label>Email   </label>
                <input name="email" type="text" maxlength="40" />
              </div>
              <div className="form--password">
                <div>
                <label>Password   </label>
                <input name="password" type="text" maxlength="40" />
                </div>
                <div>
                <label>Password Confirmation   </label>
                <input name="passwordConfirmation" type="text" maxlength="40" />
                </div>
              </div>
              </div>
            </form>
            <MdClose className="closeRegisterButton" aria-label="Close register" onClick={() => setShowRegister(prev => !prev)}/>
          </div>
        </div>
      ) : null
    }
    </>
  );
}
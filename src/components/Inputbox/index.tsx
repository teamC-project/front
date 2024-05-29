import React, { ChangeEvent, KeyboardEvent } from 'react';
import './style.css';
import '../../App.css'

export interface InputBoxProps {
  label?: string;
  type: 'text' | 'password' | 'radio' | 'file';
  value: string;
  name? : string;
  placeholder?: string;
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  buttonTitle?: string;
  buttonStatus?: boolean;
  onButtonClickHandler?: () => void;
  message?: string;
  error? : boolean;
  onKeydownHandler?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export default function InputBox({ label, type, value, name, placeholder, onChangeHandler, buttonTitle, buttonStatus, onButtonClickHandler, message, error, onKeydownHandler }: InputBoxProps) {

  const buttonClass = buttonStatus ? 'input-primary-button' : 'input-disable-button'
  const messageClass = 'input-message ' + (error ? 'error' : 'primary');

  return (
    <div className="input-box">
      <div className="input-label label">{label}</div>
      <div className="input-content-box">
        <input className="input" type={type} value={value} name={name} placeholder={placeholder} onChange={onChangeHandler} onKeyDown={onKeydownHandler} />
        { buttonTitle && 
        <div className={buttonClass} onClick={onButtonClickHandler}>
          {buttonTitle}
        </div> 
        }
      </div>
      <div className={messageClass}>
        {message}
      </div>
    </div>
  );
}
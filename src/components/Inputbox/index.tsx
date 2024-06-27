import { ChangeEvent, KeyboardEvent } from 'react';

import '../../App.css';
import './style.css';

export interface InputBoxProps {
    label?: string;
    value: string;
    name?: string;
    message?: string;
    placeholder?: string;
    buttonTitle?: string;

    error?: boolean;
    checked?: boolean;
    buttonStatus?: boolean;

    type: 'text' | 'password' | 'radio' | 'file';

    onButtonClickHandler?: () => void;
    onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeydownHandler?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export default function InputBox({
    name,
    type,
    label,
    value,
    error,
    message,
    checked,
    placeholder,
    buttonTitle,
    buttonStatus,
    onChangeHandler,
    onKeydownHandler,
    onButtonClickHandler,
}: InputBoxProps) {

    const messageClass = 'input-message ' + (error ? 'error' : 'primary');
    const buttonClass = buttonStatus ? 'input-primary-button' : 'input-disable-button';

    return (
        <div className="input-box">
        {label && <div className="input-label label">{label}</div>}
        <div className="input-content-box">
            <input
            type={type}
            name={name}
            value={value}
            className="input"
            checked={checked}
            placeholder={placeholder}
            onChange={onChangeHandler}
            onKeyDown={onKeydownHandler}
            />
            {buttonTitle && 
            <div className={buttonClass} onClick={onButtonClickHandler}>
                {buttonTitle}
            </div>
            }
        </div>
        {message && <div className={messageClass}>{message}</div>}
        </div>
    );
}
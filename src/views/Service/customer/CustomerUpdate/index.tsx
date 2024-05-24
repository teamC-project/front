import React, { useRef } from 'react';
import "./style.css";

export default function CustomerUpdate() {

    //              state               //
    const contentsRef = useRef<HTMLTextAreaElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    //              event handler               //
    const onUploadFileClickHandler = () => {

    };

    //                    render                    //
    return (
        <div id='customer-write-wrapper'>
            <div className='customer-write-top'>
                <div className='customer-write-title-box'>
                    <div className='customer-write-title'>제목</div>
                    <input className='customer-write-title-input' placeholder='제목을 입력해주세요.'></input>
                </div>
            </div>
            <div className='customer-write-contents-box'>
                <textarea className='customer-write-contents-textarea' placeholder='내용을 입력해주세요.'></textarea>
            </div>
            <div className='write-button'>
                <button className='click-button'>
                    <span className="button_top"> 수정 </span>
                </button>
            </div>
        </div>
    );
}

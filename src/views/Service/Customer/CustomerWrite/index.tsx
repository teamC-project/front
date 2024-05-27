import React, { useRef } from 'react';
import "./style.css";

export default function CustomerWrite() {

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
            <div className='upload-file'>첨부 파일
                <div className='upload-file-button' onClick={onUploadFileClickHandler}>파일 첨부하기</div>
            </div>
            <div className='write-button'>
                <button className='click-button'>
                    <span className="button_top"> 올리기 </span>
                </button>
            </div>
        </div>
    );
}
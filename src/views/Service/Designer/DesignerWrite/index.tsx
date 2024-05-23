import React, { useRef } from 'react';
import "./style.css";

export default function DesignerWrite() {

    //              state               //
    const contentsRef = useRef<HTMLTextAreaElement | null>(null);

    //                    render                    //
    return (
        <div id='designer-write-wrapper'>
            <div className='designer-write-top'>
                <div className='designer-write-title-box'>
                    <div className='designer-write-title'>제목</div>
                    <input className='designer-write-title-input' placeholder='제목을 입력해주세요.'></input>
                </div>
            </div>
            <div className='designer-write-contents-box'>
                <textarea className='designer-write-contents-textarea' placeholder='내용을 입력해주세요.'></textarea>
            </div>
            <div className='write-button'>
                <div className='button'>올리기</div>
            </div>
        </div>
    );
}

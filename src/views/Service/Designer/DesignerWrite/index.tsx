import React, { useRef } from 'react';
import "./style.css";

export default function DesignerWrite() {

    //              state               //
    const contentsRef = useRef<HTMLTextAreaElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    //              event handler               //
    const onUploadFileClickHandler = () => {

    };

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
            <div className='upload-file'>첨부 파일
                <div className='upload-file-button' onClick={onUploadFileClickHandler}>파일 첨부하기</div>
                <input type="file" ref={fileInputRef}
                    style={{ display: 'none' }}
                        // 파일 들어가야됨
                    />
            </div>
            <div className='write-button'>
                <div className='button'>올리기</div>
            </div>
        </div>
    );
}
